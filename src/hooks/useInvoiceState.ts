import { useState, useEffect } from 'react';
import type { InvoiceData } from '../types/invoice';
import { defaultInvoiceData } from '../types/invoice';

const STORAGE_KEY = 'invoice_generator_data';

export function useInvoiceState() {
  const [data, setData] = useState<InvoiceData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse invoice data from local storage', e);
      }
    }
    return defaultInvoiceData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (updates: Partial<InvoiceData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(defaultInvoiceData);
  };

  return { data, updateData, resetData };
}
