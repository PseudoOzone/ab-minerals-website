/**
 * ═══════════════════════════════════════════════════════════════════════
 * CHATBOT CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Smart decision-tree chatbot that qualifies leads before 
 * transferring to WhatsApp. Shows pricing, stone details, 
 * and collects requirements.
 */

// ═══════════════════════════════════════════════════════════════════════
// LAVENDER BLUE PRICING (₹/sqft, Negotiable)
// ═══════════════════════════════════════════════════════════════════════

export interface PriceEntry {
  finish: string;
  "18mm": number;
  "20mm": number;
  "25mm": number;
  "30mm": number;
}

export const lavenderBluePricing: PriceEntry[] = [
  { finish: "Polished",     "18mm": 115, "20mm": 120, "25mm": 135, "30mm": 150 },
  { finish: "Non-Polished", "18mm": 105, "20mm": 110, "25mm": 120, "30mm": 140 },
  { finish: "Lapatoro",     "18mm": 125, "20mm": 125, "25mm": 140, "30mm": 160 },
  { finish: "Honed",        "18mm": 120, "20mm": 120, "25mm": 135, "30mm": 150 },
  { finish: "Flamed",       "18mm": 115, "20mm": 120, "25mm": 135, "30mm": 150 },
];

export const thicknesses = ["18mm", "20mm", "25mm", "30mm"] as const;
export const finishes = ["Polished", "Non-Polished", "Lapatoro", "Honed", "Flamed"] as const;

export type Thickness = typeof thicknesses[number];
export type Finish = typeof finishes[number];

export function getLavenderBluePrice(finish: Finish, thickness: Thickness): number {
  const entry = lavenderBluePricing.find(p => p.finish === finish);
  return entry ? entry[thickness] : 0;
}

// ═══════════════════════════════════════════════════════════════════════
// CHATBOT FLOW DEFINITION
// ═══════════════════════════════════════════════════════════════════════

export interface ChatOption {
  label: string;
  value: string;
  emoji?: string;
}

export interface ChatStep {
  id: string;
  message: string | ((context: ChatContext) => string);
  options?: ChatOption[];
  input?: {
    type: "text" | "number" | "phone";
    placeholder: string;
    key: string;
  };
  next?: string | ((value: string, context: ChatContext) => string);
  action?: "transfer" | "show-pricing" | "end";
}

export interface ChatContext {
  name?: string;
  phone?: string;
  company?: string;
  stone?: string;
  finish?: string;
  thickness?: string;
  quantity?: string;
  projectType?: string;
  deliveryCity?: string;
  [key: string]: string | undefined;
}

export const chatSteps: Record<string, ChatStep> = {
  // ─── WELCOME ───
  welcome: {
    id: "welcome",
    message: "👋 Hello! Welcome to **A B Minerals**.\n\nI'm here to help you with granite inquiries. How can I assist you today?",
    options: [
      { label: "View Stone Collection", value: "stones", emoji: "🪨" },
      { label: "Get a Quote", value: "quote_start", emoji: "💰" },
      { label: "Check Pricing", value: "pricing_stone", emoji: "📋" },
      { label: "Visit Quarry/Factory", value: "visit", emoji: "🏭" },
      { label: "Track My Order", value: "track_order", emoji: "📦" },
      { label: "Talk to Sales Team", value: "direct_transfer", emoji: "👤" },
    ],
  },

  // ─── STONE COLLECTION ───
  stones: {
    id: "stones",
    message: "We have **4 premium granite varieties**. Which one interests you?",
    options: [
      { label: "Lavender Blue", value: "stone_lavender", emoji: "💜" },
      { label: "Vizag/SK Blue", value: "stone_skblue", emoji: "💙" },
      { label: "Ikon Brown", value: "stone_ikon", emoji: "🤎" },
      { label: "Star White", value: "stone_star", emoji: "🤍" },
      { label: "Not sure — help me choose", value: "help_choose", emoji: "🤔" },
    ],
  },

  stone_lavender: {
    id: "stone_lavender",
    message: "**Lavender Blue** — Our Signature Stone 💜\n\n• Quarried from our **own 100-acre quarry** in Odisha\n• Elegant blue-grey waves with flowing patterns\n• Used in **Sharjah Airport, Surat Bullet Train, Pune Metro**\n• Finishes: Polished, Honed, Lapatoro, Flamed\n• Thickness: 18mm, 20mm, 25mm, 30mm\n\nPricing starts at **₹105/sqft** (negotiable)\n\nWhat would you like to do?",
    options: [
      { label: "See Full Price List", value: "pricing_lavender", emoji: "💰" },
      { label: "Get a Quote", value: "quote_stone_lavender", emoji: "📋" },
      { label: "View Other Stones", value: "stones", emoji: "↩️" },
    ],
  },

  stone_skblue: {
    id: "stone_skblue",
    message: "**Vizag/SK Blue** — Bold & Dramatic 💙\n\n• Deep grey-white tones with dramatic swirling patterns\n• Factory-processed at our Chamakhandi facility\n• Used in **IGI Delhi Airport** international terminal\n• Finishes: Polished, Honed, Lapatoro, Flamed\n• Thickness: 18mm to 30mm\n\nFor pricing, please contact our sales team.\n\nWhat would you like to do?",
    options: [
      { label: "Get a Quote", value: "quote_stone_skblue", emoji: "📋" },
      { label: "Talk to Sales", value: "direct_transfer", emoji: "👤" },
      { label: "View Other Stones", value: "stones", emoji: "↩️" },
    ],
  },

  stone_ikon: {
    id: "stone_ikon",
    message: "**Ikon Brown** — Warm & Elegant 🤎\n\n• Rich brown tones with distinctive linear grain patterns\n• Factory-processed at our Chamakhandi facility\n• Used in **IGI Delhi Airport**\n• Finishes: Polished, Honed, Lapatoro, Flamed\n• Thickness: 18mm to 30mm\n\nFor pricing, please contact our sales team.\n\nWhat would you like to do?",
    options: [
      { label: "Get a Quote", value: "quote_stone_ikon", emoji: "📋" },
      { label: "Talk to Sales", value: "direct_transfer", emoji: "👤" },
      { label: "View Other Stones", value: "stones", emoji: "↩️" },
    ],
  },

  stone_star: {
    id: "stone_star",
    message: "**Star White** — Bright & Unique 🤍\n\n• White-grey base with sparkling garnet crystal inclusions\n• Factory-processed with 12-head polishing line\n• Used in **Old Bangalore Airport**\n• Finishes: Polished, Honed, Lapatoro, Flamed\n• Thickness: 18mm to 30mm\n\nFor pricing, please contact our sales team.\n\nWhat would you like to do?",
    options: [
      { label: "Get a Quote", value: "quote_stone_star", emoji: "📋" },
      { label: "Talk to Sales", value: "direct_transfer", emoji: "👤" },
      { label: "View Other Stones", value: "stones", emoji: "↩️" },
    ],
  },

  help_choose: {
    id: "help_choose",
    message: "Let me help! What's the **primary use** for the granite?",
    options: [
      { label: "Flooring", value: "rec_flooring", emoji: "🏠" },
      { label: "Building Facade / Exterior", value: "rec_facade", emoji: "🏢" },
      { label: "Countertops / Interiors", value: "rec_interior", emoji: "✨" },
      { label: "Large Project (Airport, Metro, etc.)", value: "rec_project", emoji: "🏗️" },
    ],
  },

  rec_flooring: {
    id: "rec_flooring",
    message: "For **flooring**, we recommend:\n\n1. **Lavender Blue** (Polished/Honed) — from ₹115/sqft\n2. **Star White** (Polished) — elegant, bright look\n3. **Ikon Brown** (Polished) — warm, classic appeal\n\n20mm thickness is ideal for flooring.",
    options: [
      { label: "View Lavender Blue", value: "stone_lavender", emoji: "💜" },
      { label: "Get a Quote", value: "quote_start", emoji: "📋" },
      { label: "Talk to Sales", value: "direct_transfer", emoji: "👤" },
    ],
  },

  rec_facade: {
    id: "rec_facade",
    message: "For **facades & exteriors**, we recommend:\n\n1. **Lavender Blue** (Flamed/Lapatoro) — weather-resistant, premium look\n2. **Vizag/SK Blue** (Flamed) — bold, dramatic exterior\n\n25-30mm thickness recommended for cladding.",
    options: [
      { label: "View Lavender Blue", value: "stone_lavender", emoji: "💜" },
      { label: "Get a Quote", value: "quote_start", emoji: "📋" },
      { label: "Talk to Sales", value: "direct_transfer", emoji: "👤" },
    ],
  },

  rec_interior: {
    id: "rec_interior",
    message: "For **countertops & interiors**:\n\n1. **Star White** (Polished) — clean, bright, elegant\n2. **Lavender Blue** (Polished) — premium bluish appeal\n3. **Ikon Brown** (Polished/Honed) — warm, sophisticated\n\n18-20mm thickness works well for countertops.",
    options: [
      { label: "View Star White", value: "stone_star", emoji: "🤍" },
      { label: "Get a Quote", value: "quote_start", emoji: "📋" },
      { label: "Talk to Sales", value: "direct_transfer", emoji: "👤" },
    ],
  },

  rec_project: {
    id: "rec_project",
    message: "For **large-scale projects**, we're the right partner!\n\n• Own quarry = **consistent supply & shade matching**\n• Monthly capacity: **250,000+ sqft**\n• Past projects: Sharjah Airport, Surat Bullet Train, SCB Medical, Pune Metro\n\nLet's discuss your project requirements.",
    options: [
      { label: "Get a Project Quote", value: "quote_start", emoji: "📋" },
      { label: "Talk to Sales Directly", value: "direct_transfer", emoji: "👤" },
    ],
  },

  // ─── PRICING ───
  pricing_stone: {
    id: "pricing_stone",
    message: "We have detailed pricing for **Lavender Blue** (our own quarry stone). For other stones, our sales team will share rates.\n\nWhich stone?",
    options: [
      { label: "Lavender Blue Pricing", value: "pricing_lavender", emoji: "💜" },
      { label: "Other Stone — Talk to Sales", value: "direct_transfer", emoji: "👤" },
    ],
  },

  pricing_lavender: {
    id: "pricing_lavender",
    message: "**Lavender Blue Granite — Price List (₹/sqft)**\n_All prices negotiable for bulk orders_\n\n**18mm**\nPolished ₹115 • Non-Polished ₹105 • Lapatoro ₹125 • Honed ₹120 • Flamed ₹115\n\n**20mm**\nPolished ₹120 • Non-Polished ₹110 • Lapatoro ₹125 • Honed ₹120 • Flamed ₹120\n\n**25mm**\nPolished ₹135 • Non-Polished ₹120 • Lapatoro ₹140 • Honed ₹135 • Flamed ₹135\n\n**30mm**\nPolished ₹150 • Non-Polished ₹140 • Lapatoro ₹160 • Honed ₹150 • Flamed ₹150\n\n💡 *Bulk orders get special rates. GST extra.*",
    options: [
      { label: "Get a Quote", value: "quote_stone_lavender", emoji: "📋" },
      { label: "Talk to Sales", value: "direct_transfer", emoji: "👤" },
      { label: "Back to Main Menu", value: "welcome", emoji: "↩️" },
    ],
  },

  // ─── QUOTE FLOW ───
  quote_start: {
    id: "quote_start",
    message: "Great! Let me collect a few details for your quote.\n\nWhich **stone** are you interested in?",
    options: [
      { label: "Lavender Blue", value: "quote_stone_lavender", emoji: "💜" },
      { label: "Vizag/SK Blue", value: "quote_stone_skblue", emoji: "💙" },
      { label: "Ikon Brown", value: "quote_stone_ikon", emoji: "🤎" },
      { label: "Star White", value: "quote_stone_star", emoji: "🤍" },
      { label: "Multiple / Not sure", value: "quote_stone_multiple", emoji: "🪨" },
    ],
  },

  quote_stone_lavender: { id: "quote_stone_lavender", message: "You selected **Lavender Blue**. What **finish** do you need?",
    options: finishes.map(f => ({ label: f, value: `quote_finish_${f.toLowerCase().replace(/[^a-z]/g, '')}`, emoji: "✅" })),
    next: "quote_thickness",
  },
  quote_stone_skblue: { id: "quote_stone_skblue", message: "You selected **Vizag/SK Blue**. What **finish** do you need?",
    options: finishes.map(f => ({ label: f, value: `quote_finish_${f.toLowerCase().replace(/[^a-z]/g, '')}`, emoji: "✅" })),
    next: "quote_thickness",
  },
  quote_stone_ikon: { id: "quote_stone_ikon", message: "You selected **Ikon Brown**. What **finish** do you need?",
    options: finishes.map(f => ({ label: f, value: `quote_finish_${f.toLowerCase().replace(/[^a-z]/g, '')}`, emoji: "✅" })),
    next: "quote_thickness",
  },
  quote_stone_star: { id: "quote_stone_star", message: "You selected **Star White**. What **finish** do you need?",
    options: finishes.map(f => ({ label: f, value: `quote_finish_${f.toLowerCase().replace(/[^a-z]/g, '')}`, emoji: "✅" })),
    next: "quote_thickness",
  },
  quote_stone_multiple: { id: "quote_stone_multiple", message: "No problem! Our sales team can help you pick the right stones.\n\nWhat **finish** are you looking for?",
    options: [
      ...finishes.map(f => ({ label: f, value: `quote_finish_${f.toLowerCase().replace(/[^a-z]/g, '')}`, emoji: "✅" })),
      { label: "Not sure yet", value: "quote_finish_unsure", emoji: "🤔" },
    ],
    next: "quote_thickness",
  },

  quote_thickness: {
    id: "quote_thickness",
    message: "What **thickness** do you need?",
    options: [
      { label: "18mm", value: "18mm", emoji: "📏" },
      { label: "20mm", value: "20mm", emoji: "📏" },
      { label: "25mm", value: "25mm", emoji: "📏" },
      { label: "30mm", value: "30mm", emoji: "📏" },
      { label: "Custom / Not sure", value: "custom", emoji: "🤔" },
    ],
    next: "quote_quantity",
  },

  quote_quantity: {
    id: "quote_quantity",
    message: "Approximately how much area do you need? (in sqft)",
    input: {
      type: "text",
      placeholder: "e.g. 5000 sqft",
      key: "quantity",
    },
    next: "quote_project",
  },

  quote_project: {
    id: "quote_project",
    message: "What is this for?",
    options: [
      { label: "Residential", value: "Residential", emoji: "🏠" },
      { label: "Commercial", value: "Commercial", emoji: "🏢" },
      { label: "Government Project", value: "Government", emoji: "🏛️" },
      { label: "Infrastructure (Airport, Metro)", value: "Infrastructure", emoji: "✈️" },
      { label: "Export", value: "Export", emoji: "🌍" },
    ],
    next: "quote_city",
  },

  quote_city: {
    id: "quote_city",
    message: "Which **city/state** should we deliver to?",
    input: {
      type: "text",
      placeholder: "e.g. Mumbai, Delhi, Hyderabad",
      key: "deliveryCity",
    },
    next: "quote_name",
  },

  quote_name: {
    id: "quote_name",
    message: "Almost done! What's your **name**?",
    input: {
      type: "text",
      placeholder: "Your name",
      key: "name",
    },
    next: "quote_summary",
  },

  quote_summary: {
    id: "quote_summary",
    message: (ctx: ChatContext) => {
      const lines = [
        "Here's your requirement summary:\n",
        ctx.stone && `🪨 **Stone:** ${ctx.stone}`,
        ctx.finish && `✨ **Finish:** ${ctx.finish}`,
        ctx.thickness && `📏 **Thickness:** ${ctx.thickness}`,
        ctx.quantity && `📐 **Quantity:** ${ctx.quantity}`,
        ctx.projectType && `🏗️ **Project:** ${ctx.projectType}`,
        ctx.deliveryCity && `📍 **Delivery:** ${ctx.deliveryCity}`,
        ctx.name && `👤 **Name:** ${ctx.name}`,
        "",
        "I'll now connect you with our sales team on **WhatsApp** with all these details. They'll share the best rates! 🤝",
      ];
      return lines.filter(Boolean).join("\n");
    },
    options: [
      { label: "Send to WhatsApp →", value: "transfer", emoji: "📱" },
      { label: "Edit Details", value: "quote_start", emoji: "✏️" },
      { label: "Back to Main Menu", value: "welcome", emoji: "↩️" },
    ],
    action: "transfer",
  },

  // ─── VISIT ───
  visit: {
    id: "visit",
    message: "We'd love to welcome you! 🏭\n\n**Quarry:** 100-acre Lavender Blue quarry, Berhampur, Odisha\n**Factory:** Chamakhandi, Berhampur — gang saws, block cutters, polishing lines\n\nVisits are by appointment. Let me connect you with our team to schedule.",
    options: [
      { label: "Schedule via WhatsApp", value: "visit_transfer", emoji: "📱" },
      { label: "Back to Main Menu", value: "welcome", emoji: "↩️" },
    ],
  },

  visit_transfer: {
    id: "visit_transfer",
    message: "Connecting you to schedule a visit...",
    action: "transfer",
  },

  // ─── ORDER TRACKING ───
  track_order: {
    id: "track_order",
    message: "For order tracking, our **factory manager Jagannath** can help.\n\nI'll connect you directly.",
    options: [
      { label: "Connect on WhatsApp", value: "track_transfer", emoji: "📱" },
      { label: "Back to Main Menu", value: "welcome", emoji: "↩️" },
    ],
  },

  track_transfer: {
    id: "track_transfer",
    message: "Connecting you to Jagannath (Factory Manager)...",
    action: "transfer",
  },

  // ─── DIRECT TRANSFER ───
  direct_transfer: {
    id: "direct_transfer",
    message: "I'll connect you with our sales team right away! 🤝\n\nYou'll be redirected to WhatsApp with all the context from our conversation.",
    options: [
      { label: "Open WhatsApp →", value: "transfer", emoji: "📱" },
      { label: "Back to Main Menu", value: "welcome", emoji: "↩️" },
    ],
    action: "transfer",
  },
};

// ═══════════════════════════════════════════════════════════════════════
// HELPER: Build WhatsApp message from chat context
// ═══════════════════════════════════════════════════════════════════════

export function buildWhatsAppMessage(context: ChatContext, type: "quote" | "visit" | "track" | "general" = "general"): string {
  if (type === "visit") {
    return `Hi, I'd like to schedule a visit to the A B Minerals quarry/factory.

Please share available dates and details.

Thank you.`;
  }

  if (type === "track") {
    return `Hi Jagannath, I'd like to check on my order status.

Please help me track my order.

Thank you.`;
  }

  if (type === "quote" || context.stone) {
    const lines = [
      `Hi, I'd like a quote from A B Minerals.`,
      ``,
      context.name && `*Name:* ${context.name}`,
      context.stone && `*Stone:* ${context.stone}`,
      context.finish && `*Finish:* ${context.finish}`,
      context.thickness && `*Thickness:* ${context.thickness}`,
      context.quantity && `*Quantity:* ${context.quantity}`,
      context.projectType && `*Project Type:* ${context.projectType}`,
      context.deliveryCity && `*Delivery City:* ${context.deliveryCity}`,
      ``,
      `Please share rates and availability.`,
      `Thank you.`,
    ];
    return lines.filter(Boolean).join("\n");
  }

  return `Hi, I'm interested in A B Minerals granite.

Please share your catalog and pricing.

Thank you.`;
}
