'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { WhatsAppMessage } from '../services/whatsappService';
import { trackWhatsAppClick } from '@/utils/whatsappUtils';

interface WhatsAppButtonProps {
  message: WhatsAppMessage;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  trackEvent?: boolean;
}

export function WhatsAppButton({
  message,
  variant = 'default',
  size = 'default',
  className = '',
  children,
  showIcon = true,
  trackEvent = true,
}: WhatsAppButtonProps) {
  const { sendInquiry } = useWhatsApp();

  const handleClick = async () => {
    try {
      if (trackEvent) {
        trackWhatsAppClick(message.type === 'custom' ? 'custom' : 'sales', 'button');
      }
      
      await sendInquiry(message);
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
    >
      {showIcon && <MessageCircle className="mr-2 h-4 w-4" />}
      {children || 'WhatsApp'}
    </Button>
  );
}
