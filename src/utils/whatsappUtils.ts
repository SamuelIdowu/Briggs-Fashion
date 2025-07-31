import { WhatsAppService, WhatsAppMessage } from '@/services/whatsappService';
import { WHATSAPP_NUMBERS } from '@/utils/constants';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
  }
}

// Initialize WhatsApp service with default numbers
WhatsAppService.setConfig(WHATSAPP_NUMBERS);

// Pre-defined message templates
export const WHATSAPP_TEMPLATES = {
  GENERAL_INQUIRY: 'Hello! I have a general inquiry about your products and services. Can you help me?',
  SIZING_HELP: 'Hello! I need help with sizing for your products. Can you assist me?',
  CUSTOM_CONSULTATION: 'Hello! I\'d like to schedule a consultation for made-to-order pieces. When are you available?',
  PRODUCT_AVAILABILITY: 'Hello! I\'m interested in a product from your website. Is it currently available?',
  PRICING_INQUIRY: 'Hello! I\'d like to know more about your pricing for made-to-order pieces. Can you provide details?',
  ALTERATION_SERVICE: 'Hello! Do you offer alteration services? I have some pieces that need adjustments.',
} as const;

// Create WhatsApp message for product inquiry
export function createProductInquiry(
  productName: string,
  type: 'ready-made' | 'made-to-order',
  size?: string,
  color?: string
): WhatsAppMessage {
  return {
    productName,
    type: type === 'made-to-order' ? 'custom' : 'ready-made', // Convert to service expected type
    size,
    color,
  };
}

// Create WhatsApp message for general inquiry
export function createGeneralInquiry(message?: string): WhatsAppMessage {
  return {
    type: 'general',
    customMessage: message || WHATSAPP_TEMPLATES.GENERAL_INQUIRY,
  };
}

// Create WhatsApp message for made-to-order pieces
export function createCustomInquiry(productName?: string): WhatsAppMessage {
  return {
    productName,
    type: 'custom', // Use 'custom' type for made-to-order
    customMessage: productName 
      ? `Hello! I'd like to discuss made-to-order pieces for ${productName}. Can we schedule a consultation?`
      : WHATSAPP_TEMPLATES.CUSTOM_CONSULTATION,
  };
}

// Create WhatsApp message for sizing help
export function createSizingInquiry(): WhatsAppMessage {
  return {
    type: 'general',
    customMessage: WHATSAPP_TEMPLATES.SIZING_HELP,
  };
}

// Send WhatsApp message and track analytics
export async function sendWhatsAppMessage(message: WhatsAppMessage): Promise<void> {
  try {
    await WhatsAppService.sendInquiry(message);
    
    // Track successful WhatsApp interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_message_sent', {
        event_category: 'engagement',
        event_label: message.type,
        value: 1,
      });
    }
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    
    // Track failed WhatsApp interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_message_failed', {
        event_category: 'engagement',
        event_label: message.type,
        value: 1,
      });
    }
    
    throw error;
  }
}

// Get appropriate WhatsApp number based on inquiry type
export function getWhatsAppNumber(type: 'sales' | 'custom' | 'support'): string {
  return WhatsAppService.getNumber(type);
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Nigerian phone numbers
  if (cleaned.startsWith('234')) {
    return `+234 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  
  if (cleaned.startsWith('0')) {
    return `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
}

// Check if WhatsApp is available on the device
export function isWhatsAppAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if it's a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  return isMobile;
}

// Create WhatsApp share URL for products
export function createProductShareUrl(
  productName: string,
  productUrl: string
): string {
  const message = `Check out this amazing product from Brigg's Fashion and Store: ${productName}\n\n${productUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const number = WhatsAppService.getNumber('sales');
  
  // Ensure number is not undefined
  if (!number) {
    console.error('WhatsApp number not found, using default');
    return `https://wa.me/2348012345678?text=${encodedMessage}`;
  }
  
  const cleanNumber = number.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

// Track WhatsApp button clicks
export function trackWhatsAppClick(type: 'sales' | 'custom' | 'support', context?: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_button_click', {
      event_category: 'engagement',
      event_label: `${type}_${context || 'general'}`,
      value: 1,
    });
  }
}

// Get business hours status
export function getBusinessHoursStatus(): {
  isOpen: boolean;
  nextOpenTime?: string;
  message: string;
} {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Business hours: Monday-Saturday 9AM-6PM, Sunday 12PM-4PM
  const isWeekday = currentDay >= 1 && currentDay <= 6;
  const isSunday = currentDay === 0;
  
  let isOpen = false;
  let message = '';
  let nextOpenTime = '';
  
  if (isWeekday) {
    isOpen = currentHour >= 9 && currentHour < 18;
    if (!isOpen) {
      if (currentHour < 9) {
        message = 'We open at 9:00 AM today';
        nextOpenTime = '9:00 AM';
      } else {
        message = 'We close at 6:00 PM today';
        nextOpenTime = '9:00 AM tomorrow';
      }
    }
  } else if (isSunday) {
    isOpen = currentHour >= 12 && currentHour < 16;
    if (!isOpen) {
      if (currentHour < 12) {
        message = 'We open at 12:00 PM today';
        nextOpenTime = '12:00 PM';
      } else {
        message = 'We close at 4:00 PM today';
        nextOpenTime = '9:00 AM Monday';
      }
    }
  } else {
    message = 'We are closed today';
    nextOpenTime = '9:00 AM Monday';
  }
  
  return { isOpen, nextOpenTime, message };
} 