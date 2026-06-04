Create a frontend-only invoice generator web app based on a clean minimalist black-and-white invoice design.

Requirements:
- No backend.
- No database.
- No authentication.
- Use React + Tailwind CSS.
- User can fill invoice fields through a form.
- Show live invoice preview.
- User can download the invoice as PDF.
- Use html2canvas and jsPDF for PDF generation.
- Store temporary data in localStorage only.
- Support logo upload from local file.
- Support optional PAID stamp upload or toggle default stamp.
- Support multiple invoice items with add/remove item.
- Auto calculate subtotal and total.
- Support down payment percentage field.
- Auto calculate down payment amount and remaining payment.
- Format all currency values in Indonesian Rupiah format.

Invoice fields:
- Studio Name
- Website
- Invoice Title
- Invoice Number
- Issued To
- Date
- Project Name
- Payment Status
- Down Payment Percentage
- Payment Term
- Footer Contact

Invoice item fields:
- Component
- Description
- Cost

Dynamic Pay To section:
- User can add multiple bank accounts dynamically.
- User can remove bank accounts.
- Each bank account contains:
  - Bank Name
  - Account Name
  - Account Number
- Automatically render all bank accounts inside the invoice layout.
- Responsive layout:
  - If 1 account, render full width.
  - If 2 accounts, render two-column layout.
  - If more than 2 accounts, render as clean grid layout.
- Add “Add Bank Account” button.
- Add remove/delete button for each bank account form.
- Preserve bank account data in localStorage.

Invoice layout:
Header:
- Logo on left
- Studio name on right
- Website under studio name
- Invoice title
- Invoice number

Client/project info:
- Issued To
- Date
- Project Name

Items table:
- Component
- Description
- Cost

Summary:
- Total
- Status Payment
- Down Payment
- Payment Term
- Remaining Payment

Payment info:
- Dynamic Pay To bank account section
- Bank name
- Account name
- Account number

Footer:
- Contact info

Design style:
- A4 portrait invoice.
- Minimalist black and white.
- Clean typography.
- Large whitespace.
- Thin divider lines.
- Bold table headers.
- Professional studio invoice look.
- Responsive editor layout, but PDF output must stay A4 portrait.
- Preview should visually match the final PDF.

UX requirements:
- Form editor should be easy to scan.
- Use section cards for invoice info, items, payment term, bank accounts, and branding.
- Add buttons for adding/removing invoice items.
- Add buttons for adding/removing bank accounts.
- Add reset data button.
- Add download PDF button.
- Add preview area.
- Make the PDF export high quality and A4-sized.

Optional nice-to-have:
- Auto invoice number generator.
- Currency selector with IDR as default.
- Export as PNG.
- Toggle PAID stamp visibility.
- Save all form values to localStorage.
- Load saved data automatically on refresh.

Do not create backend logic.
Do not create automated tests.
Do not add unnecessary complex state management.
Focus only on UI, form state, live preview, localStorage persistence, PDF export, and clean reusable components.