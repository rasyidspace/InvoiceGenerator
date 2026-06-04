export interface InvoiceItem {
  id: string;
  component: string;
  description: string;
  cost: number;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface InvoiceData {
  studioName: string;
  website: string;
  title: string;
  codename: string;
  projectNumber: string;
  issuedTo: string;
  date: string;
  projectName: string;
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID';
  downPayment: number;
  paymentTerm: string;
  footerContact: string;
  logoUrl: string | null;
  showPaidStamp: boolean;
  items: InvoiceItem[];
  bankAccounts: BankAccount[];
}

export const defaultInvoiceData: InvoiceData = {
  studioName: 'R24 Studio',
  website: 'www.r24studio.com',
  title: 'INVOICE',
  codename: 'R24',
  projectNumber: '001',
  issuedTo: 'Client Name\nClient Company\nClient Address',
  date: new Date().toISOString().split('T')[0],
  projectName: 'Website Redesign',
  paymentStatus: 'UNPAID',
  downPayment: 0,
  paymentTerm: 'Please pay within 15 days of receiving this invoice.',
  footerContact: 'hello@r24studio.com | +62 812 3456 7890',
  logoUrl: null,
  showPaidStamp: false,
  items: [
    {
      id: '1',
      component: 'Design Phase',
      description: 'UI/UX Design, Wireframing, Prototyping',
      cost: 5000000,
    },
    {
      id: '2',
      component: 'Development',
      description: 'Frontend and Backend Development',
      cost: 10000000,
    }
  ],
  bankAccounts: [
    {
      id: '1',
      bankName: 'BCA',
      accountName: 'John Doe',
      accountNumber: '1234567890',
    }
  ]
};
