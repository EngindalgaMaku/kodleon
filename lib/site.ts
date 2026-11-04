export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kodleon.com";

// Free click-to-chat: no WhatsApp account setup or API on our side
const WHATSAPP_NUMBER = "905465867927";

export const whatsappLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
