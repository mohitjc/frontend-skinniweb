const status=[
  { id: 'VOIDED', name: 'Voided' },
  { id: 'PAID', name: 'Paid' },
  { id: 'AUTHORISED', name: 'Authorized' },
  { id: 'DELETED', name: 'Deleted' }
]
const shared = {
  check: "accounting",
  title: "Hubspot",
  addTitle: "Account Transaction",
  url: "transactions",
  status:status,
};

export default shared;
