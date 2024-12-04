const status=[
  { id: 'VOIDED', name: 'Voided' },
  { id: 'PAID', name: 'Paid' },
  { id: 'AUTHORISED', name: 'Authorized' },
  { id: 'DELETED', name: 'Deleted' }
]
const shared = {
  check: "accounting",
  title: "Account Transactions",
  addTitle: "Account Transaction",
  url: "transactions",
  status:status,
  listApi: "xero/bank/transactions",
  paypallist:"paypal/transactions"
};

export default shared;
