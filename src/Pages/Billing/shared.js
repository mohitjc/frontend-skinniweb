const types=[
  {
    id:'Product',
    name:'Product'
  },
  {
    id:'Blog',
    name:'Blog'
  },
  {
    id:'FAQ',
    name:'FAQ'
  },
]

  const planType = [
    { id: 'stripe', name: 'Stripe' },
    { id: 'frontend', name: 'Frontend' },
  ]

const shared = {
  check: "billing",
  title: "Billings",
  addTitle: "Billing",
  url: "activeplan",
  types:types,
  detailApi: "transaction/detail",
  listApi: "transaction/list",
  planType:planType
};

export default shared;
