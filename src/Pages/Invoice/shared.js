const status=[
  { id: 'VOIDED', name: 'Voided' },
  { id: 'PAID', name: 'Paid' },
  { id: 'AUTHORISED', name: 'Authorized' },
  { id: 'DELETED', name: 'Deleted' },
  { id: 'DRAFT', name: 'Draft' }
]

const shared = {
  check: "Invoice",
  title: "Invoices",
  addTitle: "Invoice",
  url: "invoice",
  status:status,
  listApi: "xero/invoices",
 
  
};

export default shared;
