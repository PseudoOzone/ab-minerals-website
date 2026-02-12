/**
 * ═══════════════════════════════════════════════════════════════════════
 * WHATSAPP CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Edit this file to update WhatsApp numbers and message templates.
 * Changes here will reflect across the entire website.
 * 
 * PLACEHOLDER MARKERS: Search for "PLACEHOLDER" to find values to update
 */

export interface WhatsAppNumber {
  id: string;
  name: string;
  number: string;
  isPrimary: boolean;
  description?: string;
}

// ═══════════════════════════════════════════════════════════════════════
// WHATSAPP NUMBERS
// ═══════════════════════════════════════════════════════════════════════
// All leads go to all these numbers. Primary number opens in WhatsApp.

export const whatsappNumbers: WhatsAppNumber[] = [
  {
    id: "primary",
    name: "A. N. Bakshi",
    number: "+919811808716", // A. N. Bakshi - Founder
    isPrimary: true,
    description: "Founder - Senior Operations & Business Development",
  },
  {
    id: "operations",
    name: "Anant Bakshi",
    number: "+919777718672", // Anant Bakshi
    isPrimary: false,
    description: "Operations & Business Development",
  },
  {
    id: "factory",
    name: "Jagannath",
    number: "+917008898009", // Factory Manager
    isPrimary: false,
    description: "Factory Manager - Production & Dispatch",
  },
];

// Get the primary number for WhatsApp links
export const getPrimaryNumber = (): string => {
  const primary = whatsappNumbers.find((n) => n.isPrimary);
  return primary?.number || whatsappNumbers[0].number;
};

// Get all numbers for backend notification
export const getAllNumbers = (): string[] => {
  return whatsappNumbers.map((n) => n.number);
};

// ═══════════════════════════════════════════════════════════════════════
// MESSAGE TEMPLATES
// ═══════════════════════════════════════════════════════════════════════

export const messageTemplates = {
  // General inquiry
  general: `Hi, I'm interested in A B Minerals granite.

Please share your catalog and pricing.

Thank you.`,

  // Stone-specific inquiry
  stoneInquiry: (stoneName: string) => `Hi, I'm interested in *${stoneName}* granite.

Please share:
• Available finishes
• Slab sizes in stock
• Pricing per sqft
• Delivery timeline

Thank you.`,

  // Quote request with details
  quoteRequest: (data: {
    name?: string;
    company?: string;
    stone?: string;
    quantity?: string;
    finish?: string;
    thickness?: string;
    projectType?: string;
    deliveryCity?: string;
    timeline?: string;
    notes?: string;
  }) => {
    const lines = [
      `Hi, I'd like to request a quote.`,
      ``,
      data.name && `*Name:* ${data.name}`,
      data.company && `*Company:* ${data.company}`,
      data.stone && `*Stone:* ${data.stone}`,
      data.quantity && `*Quantity:* ${data.quantity}`,
      data.finish && `*Finish:* ${data.finish}`,
      data.thickness && `*Thickness:* ${data.thickness}`,
      data.projectType && `*Project Type:* ${data.projectType}`,
      data.deliveryCity && `*Delivery City:* ${data.deliveryCity}`,
      data.timeline && `*Timeline:* ${data.timeline}`,
      data.notes && `*Notes:* ${data.notes}`,
      ``,
      `Please share rates and availability.`,
      `Thank you.`,
    ];
    return lines.filter(Boolean).join("\n");
  },
};

// ═══════════════════════════════════════════════════════════════════════
// GOOGLE SHEETS INTEGRATION
// ═══════════════════════════════════════════════════════════════════════

export const googleSheetsConfig = {
  // ← PLACEHOLDER: Replace with your Google Apps Script Web App URL
  // To set this up:
  // 1. Create a Google Sheet
  // 2. Go to Extensions > Apps Script
  // 3. Deploy as Web App (see PLACEHOLDERS.md for full instructions)
  webhookUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", // ← PLACEHOLDER
  
  // Enable/disable Google Sheets logging
  enabled: false, // ← Set to true once webhookUrl is configured
};

// ═══════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Generate WhatsApp URL for the primary number
 */
export const generateWhatsAppUrl = (message: string): string => {
  const number = getPrimaryNumber().replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

/**
 * Generate WhatsApp URL for a specific contact
 */
export const generateWhatsAppUrlForContact = (contactId: string, message: string): string => {
  const contact = whatsappNumbers.find((n) => n.id === contactId);
  const number = (contact?.number || getPrimaryNumber()).replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

/**
 * Get Factory Manager contact
 */
export const getFactoryManager = () => {
  return whatsappNumbers.find((n) => n.id === "factory");
};

/**
 * Generate a forwarding link to Factory Manager
 * A N Bakshi or Anant can share this with clients
 */
export const generateFactoryForwardUrl = (clientName?: string): string => {
  const factoryManager = getFactoryManager();
  if (!factoryManager) return "";
  
  const message = clientName 
    ? `Hi Jagannath, I was referred by A B Minerals management.

My name is ${clientName}.

Please help me with my order/inquiry.`
    : `Hi Jagannath, I was referred by A B Minerals management.

Please help me with my order/inquiry.`;
  
  const number = factoryManager.number.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

/**
 * Message template for forwarding client to factory
 * A N Bakshi or Anant can copy-paste this to send to clients
 */
export const forwardToFactoryMessage = (clientName?: string) => {
  const factoryManager = getFactoryManager();
  if (!factoryManager) return "";
  
  return `Dear ${clientName || "Sir/Madam"},

For production updates and dispatch coordination, please contact our Factory Manager directly:

*${factoryManager.name}*
📞 ${factoryManager.number}

Or click here to message him directly:
https://abminerals.in/factory

He will assist you with all factory-related queries.

Best regards,
A B Minerals`;
};

/**
 * Open WhatsApp with a prefilled message
 */
export const openWhatsApp = (message: string): void => {
  const url = generateWhatsAppUrl(message);
  window.open(url, "_blank");
};

/**
 * Log lead to Google Sheets (if enabled)
 */
export const logLeadToSheets = async (data: Record<string, unknown>): Promise<void> => {
  if (!googleSheetsConfig.enabled) {
    console.log("Google Sheets logging disabled. Lead data:", data);
    return;
  }

  try {
    await fetch(googleSheetsConfig.webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });
  } catch (error) {
    console.error("Failed to log lead to Google Sheets:", error);
  }
};
