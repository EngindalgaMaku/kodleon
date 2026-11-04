export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kodleon.com";

// Free click-to-chat: no WhatsApp account setup or API on our side
const WHATSAPP_NUMBER = "905465867927";

export const whatsappLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** The free month is asked for on WhatsApp, for one app or in general */
export const trialLink = (appName?: string) =>
  whatsappLink(appName ? `Merhaba, ${appName} programını bir ay ücretsiz denemek istiyorum. İşletmem: ` : "Merhaba, işletmem için bir ay ücretsiz denemek istiyorum. İşim: ");
