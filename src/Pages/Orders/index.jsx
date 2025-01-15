import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Layout from "../../components/sidebarglobal/layout";
import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import methodModel from "../../methods/methods";
import datepipeModel from "../../models/datepipemodel";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";

const Orders = () => {
  const { id } = useParams()
  const history = useNavigate()
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  // const [filters, setFilter] = useState({ page: 1, count: 10, search: "", });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const breadcrumbItems = [
    { label: 'Home', link: '/', active: false },
    { label: 'Order Listing', link: '/myorders', active: false },
    { label: 'Order Detail', link: '', active: true },
  ];

  const getData = (p = {}) => {
    loader(true);
    let filter = { id: id };

    ApiClient.get("ordersData", filter).then((res) => {
      if (res.success) {
        setData(res.data);
        setTotal(res.total);
      }
      loader(false);
    });
  };

  // Function to handle date change
  // const handleDateChange = (e) => {
  //   const selectedDate = e.target.value;
  //   setFilter((prev) => ({ ...prev, date: selectedDate }));
  // };

  // Function to reset filters
  // const resetFilters = () => {
  //   setFilter({ page: 1, count: 10, search: "", date: "" });
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
  <Breadcrumb items={breadcrumbItems} />
      <div className="">
        {/* Order Details Section */}
        <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
          <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem]  sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
            <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
              <div className="">
                <h1 className="text-[22px] font-bold mb-1">ORDER #{id}</h1>

                <p className="text-[#828282] text-[12px]">{datepipeModel.date(data?.createdAt)}</p>
              </div>
              <button className="bg-[#828282] text-white px-3 py-2 rounded-[10px] h-fit hover:opacity-[90%]">Complete</button>
            </div>
            <div className="flex justify-between flex-wrap gap-y-3 gap-x-5">
              <p className="text-[#828282] text-[12px] font-[600]">Reorder</p>
              <p className="text-[#828282] text-[12px] font-[600]">Print Order</p>
            </div>
          </div>

          {/* Tab Group for Order Sections */}
          <TabGroup>
            <TabList className="flex space-x-2 sm:space-x-3 overflow-auto">
              {/* Items Ordered Tab */}
              <Tab
                className={({ selected }) =>
                  selected
                    ? "whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 bg-[#FEE4D0] rounded-t-[12px] font-semibold !outline-0"
                    : "whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 bg-[#828282] rounded-t-[12px] text-white !outline-0"
                }
              >
                Items Ordered
              </Tab>
              {/* <Tab
              className={({ selected }) =>
                selected
                  ? "whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 bg-[#FEE4D0] rounded-t-[12px] font-semibold !outline-0"
                  : "whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 bg-[#828282] rounded-t-[12px] text-white !outline-0"
              }
            >
              Invoices
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 bg-[#FEE4D0] rounded-t-[12px] font-semibold !outline-0"
                  : "whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 bg-[#828282] rounded-t-[12px] text-white !outline-0"
              }
            >
              Order Shipping
            </Tab> */}
            </TabList>

            <TabPanels className="">
              {/* Items Ordered Panel */}
              <TabPanel>
                <div className="bg-[#FFF2E8] rounded-[12px] !rounded-tl-[0px] px-[0rem] py-[0rem] sm:p-[2rem] ">
                  <div className="bg-white sm:rounded-[12px] px-[0rem]  py-[0rem] sm:p-[2rem]">

                    <div className="grid grid-cols-12 gap-y-5">
                      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <h2 className="whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">PRODUCT NAME	</h2>
                        {/* <div className="px-2 py-3">
                          <p className="text-[12px]">Landing Page</p>
                          <div className="mt-3">
                            <h2 className="text-[12px] font-bold">State Name</h2>
                            <p className="text-[12px]">Florida (13001)</p>
                          </div>
                          <div className="mt-3">
                            <h2 className="text-[12px] font-bold">Subscription Acknowledgement</h2>
                            <p className="text-[12px]">I Understand h2at by clicking h2is box, i am</p>
                            <p className="text-[12px]">signing up............</p>
                          </div>
                          <div className="mt-3">
                            <h2 className="text-[12px] font-bold">Select Sdivengh2</h2>
                            <p className="text-[12px]">20 MG</p>
                          </div>
                        </div> */}
                        {data?.products?.map((product, index) => (
                          <div className="px-2 py-3" key={index}>
                            <p className="text-[12px]">{product.productName}</p>
                          </div>
                        ))}
                      </div>

                      <div className="col-span-6 lg:col-span-2">
                        <h2 className="whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">SKU</h2>
                        <div className="px-2 py-3">
                          <p className="text-[12px]"> LP -</p>
                          <p className="text-[12px]">GEN -</p>
                          <p className="text-[12px]">UI -</p>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-4 lg:col-span-2">
                        <h2 className="lg:text-right whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">PRICE</h2>

                        {/* <div className="text-[12px] lg:text-right px-2 py-3">$3.00</div> */}
                        {data?.products?.map((product, index) => (
                          <div className="px-2 py-3">
                            <p className="text-[12px] lg:text-right" key={index}>${product.unitPrice}</p>
                          </div>
                        ))}
                      </div>

                      <div className="col-span-6 md:col-span-4 lg:col-span-2">
                        <h2 className="lg:text-right whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">QTY</h2>
                        {data?.products?.map((product, index) => (<div className="px-2 py-3">
                          <p className="text-[12px] lg:text-right" key={index}>Shipped - {product.quantity}</p>
                        </div>))}
                      </div>

                      <div className="col-span-6 md:col-span-4 lg:col-span-2">
                        <h2 className="lg:text-right whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">SUBTOTAL</h2>
                        {/* <div className="text-[12px] lg:text-right px-2 py-3">$90.00</div> */}
                        {data?.products?.map((product, index) => (
                          <div className="px-2 py-3">
                            <div className="text-[12px] lg:text-right" key={index}>${product.subTotal}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#F1F1F1] mt-4 rounded-[12px] p-4">
                      <div className=""></div>
                      <div className="grid grid-cols-1 gap-3">
                        <p className="text-[12px] flex flex-wrap justify-between gap-y-1 gap-x-5">SUBTOTAL: <span className="">${data?.products?.reduce((total, product) => total + product.subTotal, 0)}</span></p>
                        {/* <p className="text-[12px] flex flex-wrap justify-between gap-y-1 gap-x-5">DISCOUNT (SIMPLYCODES 10): <span className="">-$9.00</span></p> */}
                        <p className="text-[12px] flex flex-wrap justify-between gap-y-1 gap-x-5">SHIPPING AND HANDLING: <span className="">$0.00</span></p>
                        <p className="text-[12px] flex flex-wrap justify-between gap-y-1 gap-x-5 font-bold mt-5">GRAND TOTAL:  <span className="">${data?.products?.reduce((total, product) => total + product.subTotal, 0)}</span></p>
                      </div>

                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Invoices Panel */}
              <TabPanel>
                <div className="bg-[#FFF2E8] rounded-[12px] !rounded-tl-[0px] px-[0rem] py-[0rem] sm:p-[2rem] ">
                  <div className="bg-white sm:rounded-[12px] px-[0rem]  py-[2rem] sm:p-[2rem]">
                    <div className="border-b pb-3">
                      <div className="flex justify-between flex-wrap items-end gap-y-2 gap-x-5">
                        <div className="grid grid-cols-1 gap-2">
                          <p className="text-[12px] text-[#828282] text-[12px]">Print All Invoices</p>
                          <p className="text-[#000]">Invoice#000032792</p>
                        </div>
                        <p className="text-[12px] text-[#828282] text-[12px]">Print Invoice</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-y-5">
                      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <h2 className="whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">PRODUCT NAME	</h2>
                        <div className="px-2 py-3">
                          <p className="text-[12px]">Landing Page</p>
                          <div className="mt-3">
                            <h2 className="text-[12px] font-bold">State Name</h2>
                            <p className="text-[12px]">Florida (13001)</p>
                          </div>
                          <div className="mt-3">
                            <h2 className="text-[12px] font-bold">Subscription Acknowledgement</h2>
                            <p className="text-[12px]">I Understand h2at by clicking h2is box, i am</p>
                            <p className="text-[12px]">signing up............</p>
                          </div>
                          <div className="mt-3">
                            <h2 className="text-[12px] font-bold">Select Sdivengh2</h2>
                            <p className="text-[12px]">20 MG</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-6 lg:col-span-2">
                        <h2 className="whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">SKU</h2>
                        <div className="px-2 py-3">
                          <div className="px-2 py-3">
                            <p className="text-[12px]"> LP -</p>
                            <p className="text-[12px]">GEN -</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-4 lg:col-span-2">
                        <h2 className="text-[12px] lg:text-right whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">PRICE</h2>
                        <div className="px-2 py-3">
                          <div className="text-[12px] lg:text-right px-2 py-3">$3.00</div>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-4 lg:col-span-2">
                        <h2 className="lg:text-right whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">QTY</h2>
                        <div className="px-2 py-3">
                          <p className="text-[12px] lg:text-right">Shipped - 30</p>
                          <p className="text-[12px] lg:text-right">Shipped - 30</p>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-4 lg:col-span-2">
                        <h2 className="lg:text-right whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">SUBTOTAL</h2>
                        <div className="px-2 py-3">
                          <div className="text-[12px] lg:text-right px-2 py-3">$90.00</div>
                        </div>
                      </div>


                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#F1F1F1] mt-4 rounded-[12px] p-4">
                      <div className=""></div>
                      <div className="grid grid-cols-1 gap-3">
                        <p className="text-[12px] flex justify-between gap-y-1 gap-x-5">SUBTOTAL: <span className="">$90.00</span></p>
                        <p className="text-[12px] flex justify-between gap-y-1 gap-x-5">DISCOUNT (SIMPLYCODES 10): <span className="">-$9.00</span></p>
                        <p className="text-[12px] flex justify-between gap-y-1 gap-x-5">SHIPPING AND HANDLING: <span className="">$0.00</span></p>
                        <p className="text-[12px] flex justify-between gap-y-1 gap-x-5 font-bold mt-5">GRAND TOTAL: <span className="">$81.00</span></p>
                      </div>

                    </div>
                  </div>
                </div>
              </TabPanel>


              <TabPanel>
                <div className="bg-[#FFF2E8] rounded-[12px] !rounded-tl-[0px] px-[0rem] py-[0rem] sm:p-[2rem] ">
                  <div className="bg-white sm:rounded-[12px] px-[0rem]  py-[2rem] sm:p-[2rem]">
                    <div className="border-b pb-3">
                      <div className="flex justify-between flex-wrap items-end gap-y-2 gap-x-5">
                        <div className="grid grid-cols-1 gap-2">
                          <p className="text-[12px] text-[#828282] text-[12px]">Track All Shipments Print All Shipments</p>
                          <p className="text-[12px] text-[#000]">Shipment #000031341</p>
                          <p className="text-[12px] text-[#828282] font-[500]">Print Shipment</p>
                        </div>
                        <p className="text-[12px] text-[#828282] text-[12px]">Track this shipment</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-y-5">
                      <div className="col-span-12 lg:col-span-8">
                        <h2 className="whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">PRODUCT NAME	</h2>
                        <div className="px-2 py-3">
                          <p className="text-[12px]">Landing Page</p>
                          <div className="mt-3">
                            <h2 className="text-[12px]font-bold">State Name</h2>
                            <p className="text-[12px]">Florida (13001)</p>
                          </div>
                          <div className="mt-3">
                            <h2 className="text-[12px] font-bold">Subscription Acknowledgement</h2>
                            <p className="text-[12px]">I Understand h2at by clicking h2is box, i am</p>
                            <p className="text-[12px]">signing up............</p>
                          </div>
                          <div className="mt-3">
                            <h2 className="text-[12px] font-bold">Select Sdivengh2</h2>
                            <p className="text-[12px]">20 MG</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-6 lg:col-span-2">
                        <h2 className="whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">SKU</h2>
                        <div className="px-2 py-3">
                          <div className="px-2 py-3">
                            <p className="text-[12px]"> LP -</p>
                            <p className="text-[12px]">GEN -</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-6 lg:col-span-2">
                        <h2 className="text-right whitespace-nowrap text-[13px] xl:text-[14px] border-b font-bold px-2 py-4">QTY Shipped</h2>
                        <div className="px-2 py-3">
                          <div className="text-[12px] text-right px-2 py-3">$3.00</div>
                        </div>
                      </div>


                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 bg-[#F1F1F1] mt-4 text-right rounded-[12px] p-4">
                      <div className=""></div>
                      <div className="grid grid-cols-1 gap-3">
                        <p className="text-[12px] flex justify-between gap-y-1 gap-x-5">SUBTOTAL: <span className="">$90.00</span></p>
                        <p className="text-[12px] flex justify-between gap-y-1 gap-x-5">DISCOUNT (SIMPLYCODES 10): <span className="">-$9.00</span></p>
                        <p className="text-[12px] flex justify-between gap-y-1 gap-x-5">SHIPPING AND HANDLING: <span className="">$0.00</span></p>
                        <p className="text-[12px] flex justify-between gap-y-1 gap-x-5 font-bold mt-5">GRAND TOTAL: <span className="">$81.00</span></p>
                      </div>

                    </div>
                  </div>
                </div>
              </TabPanel>

            </TabPanels>
          </TabGroup>
        </div>

        {/* Order Information Section */}
        {/* <div className="bg-white p-6 rounded-[12px] mt-8 shadow">
        <h2 className="border-b text-[18px] pb-4 sm:px-4">ORDER INFORMATION</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:px-5">
   <div className="">
   <h2 className="font-bold py-4">Shipping Address	</h2>
    <div className="">
     <p className="text-[12px]">Lawrance 103689</p>
     <p className="text-[12px]">Lorem Ipsum</p>
     <p className="text-[12px]">Lorem</p>
     <p className="text-[12px]">11489</p>
    </div>
     </div>

     <div className="">
   <h2 className="font-bold py-4">Shipping Method	</h2>
    <div className="">
     <p className="text-[12px]">Rate</p>
    </div>
     </div>

     <div className="">
   <h2 className="font-bold py-4">Billing Address	</h2>
    <div className="">
     <p className="text-[12px]">Lawrance 103689</p>
     <p className="text-[12px]">Lorem Ipsum</p>
     <p className="text-[12px]">Lorem</p>
     <p className="text-[12px]">11489</p>
    </div>
     </div>

     <div className="">
   <h2 className="font-bold py-4">Payment Method	</h2>
    <div className="">
     <p className="text-[12px]">Payment Method</p>
     <p>Lorem Ipsum</p>
     <div className="border-t pt-2 mt-2">
     <p className="text-[12px] flex">Credit Card    <span className="ml-3">Visa</span></p>
     </div>
     <div className="border-t pt-2 mt-2">
     <p className="text-[12px] flex">Credit Card Number <span className="ml-3">xxx</span></p>
     </div>
    </div>
     </div>

</div>
 </div> */}
      </div>
    </Layout>
  );
};

export default Orders;
