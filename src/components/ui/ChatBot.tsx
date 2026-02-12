"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowLeft, RotateCcw } from "lucide-react";
import { chatSteps, ChatContext, buildWhatsAppMessage } from "@/config/chatbot.config";
import { generateWhatsAppUrl, generateWhatsAppUrlForContact, whatsappNumbers } from "@/config/whatsapp.config";
import { onChatBotOpen } from "@/lib/chatbot-events";

// ═══════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: { label: string; value: string; emoji?: string }[];
  input?: { type: string; placeholder: string; key: string };
  timestamp: Date;
}

// ═══════════════════════════════════════════════════════════════════════
// MARKDOWN-LITE RENDERER
// ═══════════════════════════════════════════════════════════════════════

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    processed = processed.replace(/_(.*?)_/g, '<em>$1</em>');
    
    if (processed.trim() === "") {
      return <br key={i} />;
    }
    return (
      <span key={i} className="block" dangerouslySetInnerHTML={{ __html: processed }} />
    );
  });
}

// ═══════════════════════════════════════════════════════════════════════
// TYPING INDICATOR
// ═══════════════════════════════════════════════════════════════════════

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#C9A962' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <span className="text-xs ml-2" style={{ color: 'rgba(245, 245, 240, 0.4)' }}>
        typing...
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CHATBOT COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export function SmartChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ChatContext>({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentInput, setCurrentInput] = useState<ChatMessage["input"] | null>(null);
  const [pendingStep, setPendingStep] = useState<string | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show button after delay/scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setIsVisible(true);
    };
    const timer = setTimeout(() => setIsVisible(true), 2000);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Add bot message with typing delay (must be defined before useEffects that reference it)
  const addBotMessage = useCallback((stepId: string) => {
    const step = chatSteps[stepId];
    if (!step) return;

    setIsTyping(true);
    setCurrentInput(null);
    setCurrentStepId(stepId);

    setTimeout(() => {
      const messageText = typeof step.message === "function" 
        ? step.message(context) 
        : step.message;

      const newMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: messageText,
        options: step.options,
        input: step.input,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);

      if (step.input) {
        setCurrentInput(step.input);
        setPendingStep(typeof step.next === "string" ? step.next : null);
      }
    }, 600 + Math.random() * 400); // Natural typing delay
  }, [context]);

  // Listen for external "open chatbot" events from other components
  useEffect(() => {
    const unsubscribe = onChatBotOpen((startStep?: string) => {
      setIsVisible(true);
      setIsOpen(true);
      setHasNewMessage(false);
      // Reset and start at specific step or welcome
      setMessages([]);
      setContext({});
      setCurrentInput(null);
      setPendingStep(null);
      addBotMessage(startStep || "welcome");
    });
    return unsubscribe;
  }, [addBotMessage]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input
  useEffect(() => {
    if (currentInput) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentInput]);

  // Notify badge
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  // Initialize chat
  const startChat = useCallback(() => {
    setMessages([]);
    setContext({});
    setCurrentInput(null);
    setPendingStep(null);
    addBotMessage("welcome");
  }, [addBotMessage]);

  // Open chat
  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
    if (messages.length === 0) {
      startChat();
    }
  };

  // Handle option selection
  const handleOptionClick = (value: string, label: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: "user",
      text: label,
      timestamp: new Date(),
    }]);

    // Update context based on current step
    const updatedContext = { ...context };
    
    // Stone selection
    if (value.includes("lavender")) updatedContext.stone = "Lavender Blue";
    else if (value.includes("skblue")) updatedContext.stone = "Vizag/SK Blue";
    else if (value.includes("ikon")) updatedContext.stone = "Ikon Brown";
    else if (value.includes("star") && !value.includes("quote_start")) updatedContext.stone = "Star White";
    else if (value.includes("multiple")) updatedContext.stone = "Multiple / Not sure";
    
    // Finish selection
    if (value.startsWith("quote_finish_")) {
      updatedContext.finish = label;
      setContext(updatedContext);
      addBotMessage("quote_thickness");
      return;
    }

    // Thickness selection (from quote_thickness step)
    if (["18mm", "20mm", "25mm", "30mm", "custom"].includes(value)) {
      updatedContext.thickness = label;
      setContext(updatedContext);
      addBotMessage("quote_quantity");
      return;
    }

    // Project type
    if (["Residential", "Commercial", "Government", "Infrastructure", "Export"].includes(value)) {
      updatedContext.projectType = value;
      setContext(updatedContext);
      addBotMessage("quote_city");
      return;
    }

    // Transfer action
    if (value === "transfer") {
      setContext(updatedContext);
      handleTransfer(updatedContext, currentStepId);
      return;
    }

    setContext(updatedContext);

    // Navigate to next step
    if (chatSteps[value]) {
      addBotMessage(value);
    }
  };

  // Handle text input submission
  const handleInputSubmit = () => {
    if (!inputValue.trim() || !currentInput) return;

    const value = inputValue.trim();
    
    // Add user message
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: "user",
      text: value,
      timestamp: new Date(),
    }]);

    // Update context
    const updatedContext = { ...context, [currentInput.key]: value };
    setContext(updatedContext);
    setInputValue("");
    setCurrentInput(null);

    // Navigate to next step
    if (pendingStep) {
      setTimeout(() => addBotMessage(pendingStep), 300);
      setPendingStep(null);
    }
  };

  // Handle WhatsApp transfer
  const handleTransfer = (ctx: ChatContext, stepId?: string | null) => {
    let message: string;
    
    if (stepId === "track_transfer") {
      // Order tracking → factory manager only
      message = buildWhatsAppMessage(ctx, "track");
      const url = generateWhatsAppUrlForContact("factory", message);
      window.open(url, "_blank");
    } else if (stepId === "visit_transfer") {
      // Visit → all numbers
      message = buildWhatsAppMessage(ctx, "visit");
      whatsappNumbers.forEach((contact, i) => {
        const num = contact.number.replace(/[^0-9]/g, "");
        const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
        setTimeout(() => window.open(url, "_blank"), i * 500);
      });
    } else if (ctx.stone || ctx.quantity) {
      // Quote → all numbers
      message = buildWhatsAppMessage(ctx, "quote");
      whatsappNumbers.forEach((contact, i) => {
        const num = contact.number.replace(/[^0-9]/g, "");
        const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
        setTimeout(() => window.open(url, "_blank"), i * 500);
      });
    } else {
      // General → all numbers
      message = buildWhatsAppMessage(ctx, "general");
      whatsappNumbers.forEach((contact, i) => {
        const num = contact.number.replace(/[^0-9]/g, "");
        const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
        setTimeout(() => window.open(url, "_blank"), i * 500);
      });
    }

    // Add transfer message
    setMessages(prev => [...prev, {
      id: `bot-${Date.now()}`,
      type: "bot",
      text: "Opening WhatsApp... 📱\nYour quote has been sent to our team (A.N. Bakshi, Jagannath & Operations). Expect a response within **30 minutes** during business hours (Mon-Sat, 9 AM - 6 PM).",
      timestamp: new Date(),
    }]);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Chat Window */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                style={{
                  backgroundColor: '#0F0F0F',
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                  height: 'min(520px, calc(100vh - 120px))',
                }}
              >
                {/* Header */}
                <div 
                  className="flex-shrink-0 px-4 py-3 flex items-center justify-between"
                  style={{ 
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #0F0F0F 100%)',
                    borderBottom: '1px solid rgba(201, 169, 98, 0.15)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(201, 169, 98, 0.15)' }}
                    >
                      <span className="text-sm">🪨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm" style={{ color: '#F5F5F0' }}>
                        A B Minerals
                      </h4>
                      <p className="text-[10px]" style={{ color: '#25D366' }}>
                        ● Online — typically replies in 30 min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={startChat}
                      className="p-2 rounded-full transition-colors hover:bg-white/10"
                      title="Restart chat"
                    >
                      <RotateCcw className="w-4 h-4" style={{ color: 'rgba(245, 245, 240, 0.5)' }} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full transition-colors hover:bg-white/10"
                    >
                      <X className="w-4 h-4" style={{ color: 'rgba(245, 245, 240, 0.5)' }} />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div 
                  className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(201, 169, 98, 0.2) transparent',
                  }}
                >
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      {/* Message Bubble */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                            msg.type === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                          }`}
                          style={{
                            backgroundColor: msg.type === 'user' ? '#C9A962' : '#1A1A1A',
                            color: msg.type === 'user' ? '#0A0A0A' : '#F5F5F0',
                            border: msg.type === 'bot' ? '1px solid rgba(201, 169, 98, 0.08)' : 'none',
                          }}
                        >
                          {renderMarkdown(msg.text)}
                        </div>
                      </motion.div>

                      {/* Options (only for last bot message) */}
                      {msg.type === 'bot' && msg.options && msg.id === messages[messages.length - 1]?.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="flex flex-wrap gap-1.5 mt-2 ml-1"
                        >
                          {msg.options.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => handleOptionClick(opt.value, opt.label)}
                              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-[1.03] active:scale-95"
                              style={{
                                backgroundColor: 'rgba(201, 169, 98, 0.1)',
                                color: '#C9A962',
                                border: '1px solid rgba(201, 169, 98, 0.25)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(201, 169, 98, 0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(201, 169, 98, 0.1)';
                              }}
                            >
                              {opt.emoji && <span className="mr-1">{opt.emoji}</span>}
                              {opt.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}

                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                {currentInput && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-shrink-0 px-3 py-3"
                    style={{ borderTop: '1px solid rgba(201, 169, 98, 0.1)' }}
                  >
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleInputSubmit(); }}
                      className="flex gap-2"
                    >
                      <input
                        ref={inputRef}
                        type={currentInput.type === "phone" ? "tel" : "text"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={currentInput.placeholder}
                        className="flex-1 px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors"
                        style={{
                          backgroundColor: '#1A1A1A',
                          color: '#F5F5F0',
                          border: '1px solid rgba(201, 169, 98, 0.15)',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.4)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.15)';
                        }}
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="p-2.5 rounded-xl transition-all disabled:opacity-30"
                        style={{
                          backgroundColor: '#C9A962',
                          color: '#0A0A0A',
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Footer */}
                {!currentInput && (
                  <div 
                    className="flex-shrink-0 px-4 py-2 text-center"
                    style={{ borderTop: '1px solid rgba(201, 169, 98, 0.05)' }}
                  >
                    <p className="text-[10px]" style={{ color: 'rgba(245, 245, 240, 0.25)' }}>
                      A B Minerals Pvt Ltd • Quarry-Owner • Factory-Finished
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center relative"
            style={{
              background: isOpen 
                ? 'linear-gradient(135deg, #333 0%, #1a1a1a 100%)'
                : 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification Badge */}
            {hasNewMessage && !isOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: '#EF4444', color: 'white' }}
              >
                1
              </motion.div>
            )}
          </motion.button>

          {/* Welcome tooltip (shown once) */}
          {!isOpen && isVisible && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3, duration: 0.3 }}
              className="absolute bottom-20 right-0 px-4 py-2.5 rounded-xl shadow-lg max-w-[220px] cursor-pointer"
              style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid rgba(201, 169, 98, 0.2)',
                color: '#F5F5F0',
              }}
              onClick={handleOpen}
            >
              <p className="text-xs leading-relaxed">
                👋 Need help choosing granite or want a quote? Chat with us!
              </p>
              <div 
                className="absolute right-4 -bottom-1.5 w-3 h-3 rotate-45"
                style={{ backgroundColor: '#1A1A1A', borderRight: '1px solid rgba(201, 169, 98, 0.2)', borderBottom: '1px solid rgba(201, 169, 98, 0.2)' }}
              />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
