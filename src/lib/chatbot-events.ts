/**
 * ═══════════════════════════════════════════════════════════════════════
 * CHATBOT EVENT SYSTEM
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Allows any component on any page to open the chatbot.
 * Usage: import { openChatBot } from "@/lib/chatbot-events"; openChatBot();
 */

const CHATBOT_OPEN_EVENT = "chatbot:open";

/**
 * Open the chatbot from anywhere in the app.
 * Optionally navigate to a specific step (e.g., "quote_start", "pricing_lavender").
 */
export function openChatBot(startStep?: string) {
  window.dispatchEvent(
    new CustomEvent(CHATBOT_OPEN_EVENT, { detail: { startStep } })
  );
}

/**
 * Listen for chatbot open events. Used internally by the ChatBot component.
 */
export function onChatBotOpen(callback: (startStep?: string) => void): () => void {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    callback(detail?.startStep);
  };
  window.addEventListener(CHATBOT_OPEN_EVENT, handler);
  return () => window.removeEventListener(CHATBOT_OPEN_EVENT, handler);
}
