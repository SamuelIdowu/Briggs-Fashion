'use client';

import { useCallback } from 'react';
import { WhatsAppService, WhatsAppMessage } from '@/services/whatsappService';

export function useWhatsApp() {
  const sendInquiry = useCallback(async (message: WhatsAppMessage) => {
    try {
      await WhatsAppService.sendInquiry(message);
    } catch (error) {
      console.error('Failed to send WhatsApp inquiry:', error);
      throw error;
    }
  }, []);

  const sendProductInquiry = useCallback(async (
    productName: string,
    type: 'ready-made' | 'custom',
    size?: string,
    color?: string
  ) => {
    const message: WhatsAppMessage = {
      productName,
      size,
      color,
      type,
    };
    
    await sendInquiry(message);
  }, [sendInquiry]);

  const sendGeneralInquiry = useCallback(async (customMessage?: string) => {
    const message: WhatsAppMessage = {
      type: 'general',
      customMessage,
    };
    
    await sendInquiry(message);
  }, [sendInquiry]);

  const sendCustomInquiry = useCallback(async (productName?: string, customMessage?: string) => {
    const message: WhatsAppMessage = {
      productName,
      type: 'custom',
      customMessage,
    };
    
    await sendInquiry(message);
  }, [sendInquiry]);

  const getWhatsAppNumber = useCallback((type: 'sales' | 'custom' | 'support') => {
    return WhatsAppService.getNumber(type);
  }, []);

  const createWhatsAppUrl = useCallback((message: WhatsAppMessage) => {
    return WhatsAppService.createWhatsAppUrl(message);
  }, []);

  return {
    sendInquiry,
    sendProductInquiry,
    sendGeneralInquiry,
    sendCustomInquiry,
    getWhatsAppNumber,
    createWhatsAppUrl,
  };
} 