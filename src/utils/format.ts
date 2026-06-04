export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateInvoiceNumber(codename: string, date: string, projectNumber: string): string {
  const parts = date ? date.split('-') : [];
  const ddmm = parts.length === 3 ? `${parts[2]}-${parts[1]}` : '';
  const code = codename || 'XXX';
  const proj = projectNumber || '000';
  return `MLB/${code}/${ddmm}/${proj}`;
}
