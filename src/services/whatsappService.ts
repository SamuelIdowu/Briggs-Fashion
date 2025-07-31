export interface WhatsAppMessage {
  productName?: string;
  size?: string;
  color?: string;
  type: 'ready-made' | 'custom' | 'general';
  customMessage?: string;
}

export interface WhatsAppConfig {
  sales: string;
  custom: string;
  support: string;
}

export class WhatsAppService {
  private static config: WhatsAppConfig = {
    sales: '+234 801 234 5678',
    custom: '+234 802 345 6789',
    support: '+234 803 456 7890',
  };

  static setConfig(config: WhatsAppConfig) {
    this.config = config;
  }

  static getConfig(): WhatsAppConfig {
    return this.config;
  }

  static generateMessage(message: WhatsAppMessage): string {
    const { productName, size, color, type, customMessage } = message;

    if (customMessage) {
      return customMessage;
    }

    switch (type) {
      case 'ready-made':
        return `Hello! I'm interested in ${productName || 'this product'}. Is this available in ${size || 'any size'}${color ? ` and ${color}` : ''}?`;
      
      case 'custom':
        return `Hello! I'd like to discuss custom tailoring for ${productName || 'a custom piece'}. Can we schedule a consultation?`;
      
      case 'general':
        return 'Hello! I have a general inquiry about your products and services. Can you help me?';
      
      default:
        return 'Hello! I have an inquiry about your products.';
    }
  }

  static getNumber(type: 'sales' | 'custom' | 'support'): string {
    return this.config[type] || this.config.sales; // Fallback to sales number
  }

  static createWhatsAppUrl(message: WhatsAppMessage): string {
    const number = this.getNumber(message.type === 'custom' ? 'custom' : 'sales');
    
    // Ensure number is not undefined
    if (!number) {
      console.error('WhatsApp number not found, using default');
      return `https://wa.me/2348012345678?text=${encodeURIComponent('Hello! I have an inquiry about your products.')}`;
    }
    
    const text = this.generateMessage(message);
    const encodedMessage = encodeURIComponent(text);
    const cleanNumber = number.replace(/\D/g, '');
    
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }

  static openWhatsApp(message: WhatsAppMessage): void {
    const url = this.createWhatsAppUrl(message);
    window.open(url, '_blank');
  }

  static trackInquiry(message: WhatsAppMessage): void {
    // Analytics tracking for WhatsApp inquiries
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_inquiry', {
        event_category: 'engagement',
        event_label: message.type,
        value: 1,
      });
    }
    
    // Log to console for development
    console.log('WhatsApp inquiry tracked:', message);
  }

  static async sendInquiry(message: WhatsAppMessage): Promise<void> {
    // Track the inquiry
    this.trackInquiry(message);
    
    // Open WhatsApp
    this.openWhatsApp(message);
  }
} 