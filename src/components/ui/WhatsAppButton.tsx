"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, User, Factory, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  generateWhatsAppUrl, 
  generateWhatsAppUrlForContact, 
  messageTemplates,
  whatsappNumbers 
} from "@/config/whatsapp.config";

// ═══════════════════════════════════════════════════════════════════════
// FLOATING WHATSAPP BUTTON
// ═══════════════════════════════════════════════════════════════════════

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"contacts" | "quick">("contacts");

  // Show button after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    // Show after 3 seconds anyway
    const timer = setTimeout(() => setIsVisible(true), 3000);
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Contact options
  const contacts = [
    {
      id: "primary",
      name: "A. N. Bakshi",
      role: "Sales & Business Inquiries",
      icon: <User className="w-5 h-5" />,
      message: messageTemplates.general,
    },
    {
      id: "factory",
      name: "Jagannath",
      role: "Factory - Production & Dispatch",
      icon: <Factory className="w-5 h-5" />,
      message: `Hi, I need help with production/dispatch.

Please assist me with my order.`,
    },
  ];

  const quickMessages = [
    { label: "General Inquiry", message: messageTemplates.general },
    { label: "Request Catalog", message: "Hi, please share your granite catalog and price list." },
    { label: "Schedule Visit", message: "Hi, I'd like to schedule a visit to your factory/quarry. Please share available dates." },
  ];

  const handleContactClick = (contactId: string, message: string) => {
    const url = generateWhatsAppUrlForContact(contactId, message);
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const handleQuickMessage = (message: string) => {
    window.open(generateWhatsAppUrl(message), "_blank");
    setIsOpen(false);
  };

  // Get phone number for display
  const getPhoneDisplay = (contactId: string) => {
    const contact = whatsappNumbers.find(n => n.id === contactId);
    if (!contact) return "";
    return contact.number.replace(/(\+91)(\d{5})(\d{5})/, '$1 $2 $3');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Popup */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-20 right-0 w-80 rounded-2xl overflow-hidden shadow-2xl"
                style={{ 
                  backgroundColor: '#141414',
                  border: '1px solid rgba(201, 169, 98, 0.2)'
                }}
              >
                {/* Header */}
                <div 
                  className="p-4"
                  style={{ 
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">A B Minerals</h4>
                        <p className="text-xs text-white/80">Choose who to contact</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b" style={{ borderColor: 'rgba(201, 169, 98, 0.1)' }}>
                  <button
                    onClick={() => setActiveTab("contacts")}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${
                      activeTab === "contacts" ? "border-b-2" : ""
                    }`}
                    style={{ 
                      color: activeTab === "contacts" ? '#C9A962' : 'rgba(245, 245, 240, 0.5)',
                      borderColor: activeTab === "contacts" ? '#C9A962' : 'transparent'
                    }}
                  >
                    Contacts
                  </button>
                  <button
                    onClick={() => setActiveTab("quick")}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${
                      activeTab === "quick" ? "border-b-2" : ""
                    }`}
                    style={{ 
                      color: activeTab === "quick" ? '#C9A962' : 'rgba(245, 245, 240, 0.5)',
                      borderColor: activeTab === "quick" ? '#C9A962' : 'transparent'
                    }}
                  >
                    Quick Messages
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  {activeTab === "contacts" ? (
                    <div className="space-y-3">
                      <p className="text-xs mb-2" style={{ color: '#A0A0A0' }}>
                        Select a contact:
                      </p>
                      {contacts.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => handleContactClick(contact.id, contact.message)}
                          className="w-full text-left p-4 rounded-xl transition-all hover:scale-[1.02] group"
                          style={{ 
                            backgroundColor: 'rgba(201, 169, 98, 0.05)',
                            border: '1px solid rgba(201, 169, 98, 0.15)'
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ 
                                backgroundColor: 'rgba(37, 211, 102, 0.15)',
                                color: '#25D366'
                              }}
                            >
                              {contact.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 
                                className="font-medium text-sm"
                                style={{ color: '#F5F5F0' }}
                              >
                                {contact.name}
                              </h5>
                              <p 
                                className="text-xs mt-0.5"
                                style={{ color: '#C9A962' }}
                              >
                                {contact.role}
                              </p>
                              <p 
                                className="text-xs mt-1 flex items-center gap-1"
                                style={{ color: 'rgba(245, 245, 240, 0.5)' }}
                              >
                                <Phone className="w-3 h-3" />
                                {getPhoneDisplay(contact.id)}
                              </p>
                            </div>
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ backgroundColor: '#25D366' }}
                            >
                              <MessageCircle className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </button>
                      ))}
                      
                      {/* Help text */}
                      <p 
                        className="text-xs text-center pt-2"
                        style={{ color: 'rgba(245, 245, 240, 0.4)' }}
                      >
                        For orders & dispatch, contact Factory directly
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs mb-3" style={{ color: '#A0A0A0' }}>
                        Quick messages to Sales:
                      </p>
                      {quickMessages.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickMessage(item.message)}
                          className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
                          style={{ 
                            backgroundColor: 'rgba(37, 211, 102, 0.1)',
                            color: '#F5F5F0',
                            border: '1px solid rgba(37, 211, 102, 0.2)'
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                      
                      {/* Custom message link */}
                      <button
                        onClick={() => handleQuickMessage("")}
                        className="w-full text-center py-2 text-xs transition-colors hover:opacity-80"
                        style={{ color: '#C9A962' }}
                      >
                        Or start a custom chat →
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-shadow hover:shadow-xl"
            style={{ 
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
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
                  key="whatsapp"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Pulse animation */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'rgba(37, 211, 102, 0.4)' }}
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

export default FloatingWhatsApp;
