import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Layout from "../../components/sidebarglobal/layout";

const Orders = () => {
  return (
    <Layout>
    <div className="">
      {/* Order Details Section */}
      <div className="bg-white p-[2rem] rounded-[12px]">
        <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] p-4 rounded-[12px] mb-[3rem]">
          <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
          <div className="">
        <h1 className="text-[26px] font-bold mb-1">ORDER #000036462</h1>
       
          <span className="text-[#828282]">December 25</span>
        </div>
        <button className="bg-[#828282] text-white px-3 py-2 rounded-[10px] h-fit hover:opacity-[90%]">Complete</button>
        </div>
        <div className="flex justify-between flex-wrap gap-y-3 gap-x-5">
          <p className="text-[#828282] font-[600]">Reorder</p>
          <p className="text-[#828282] font-[600]">Print Order</p>
        </div>
        </div>

        {/* Tab Group for Order Sections */}
        <TabGroup>
          <TabList className="flex space-x-3">
            {/* Items Ordered Tab */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "px-4 py-2.5 bg-[#FEE4D0] rounded-t-[12px] font-semibold !outline-0"
                  : "px-4 py-2.5 bg-[#828282] rounded-t-[12px] text-white !outline-0"
              }
            >
              Items Ordered
            </Tab>
            {/* Invoices Tab */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "px-4 py-2 bg-[#FEE4D0] rounded-t-[12px] font-semibold font-semibold !outline-0"
                  : "px-4 py-2 bg-[#828282] rounded-t-[12px] text-white !outline-0"
              }
            >
              Invoices
            </Tab>
            {/* Order Shipping Tab */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "px-4 py-2 bg-[#FEE4D0] rounded-t-[12px] font-semibold font-semibold !outline-0"
                  : "px-4 py-2 bg-[#828282] rounded-t-[12px] text-white !outline-0"
              }
            >
              Order Shipping
            </Tab>
          </TabList>

          <TabPanels className="">
            {/* Items Ordered Panel */}
            <TabPanel>
              <div className="bg-[#FFF2E8] p-4 rounded-[12px] !rounded-tl-[0px] !p-[2.5rem] ">
                <div className="bg-white rounded-[12px] p-[2rem]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b px-2 py-4">Product Name</th>
                      <th className="border-b px-2 py-4">SKU</th>
                      <th className="border-b px-2 py-4">Price</th>
                      <th className="border-b px-2 py-4">Qty</th>
                      <th className="border-b px-2 py-4">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <td className="border-b p-2">Landing Page</td>
                      <td className="border-b p-2">LP-GEN-UI</td>
                      <td className="border-b p-2">$3.00</td>
                      <td className="border-b p-2">30</td>
                      <td className="border-b p-2">$90.00</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 text-right">
                  <p>Subtotal: $90.00</p>
                  <p>Discount: -$9.00</p>
                  <p>Shipping and Handling: $0.00</p>
                  <p className="font-bold">Grand Total: $81.00</p>
                </div>
                </div>
              </div>
            </TabPanel>

            {/* Invoices Panel */}
<TabPanel>
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-md font-semibold mb-4">Invoice #000032792</h2>
    <button className="text-blue-500 text-sm underline mb-4">
      Print All Invoices
    </button>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2 text-left">Product Name</th>
          <th className="border-b p-2">SKU</th>
          <th className="border-b p-2">Price</th>
          <th className="border-b p-2">Qty</th>
          <th className="border-b p-2">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-b p-2">
            Landing Page Generic
            <br />
            <span className="text-sm text-gray-500">State Name</span>
            <br />
            <span className="text-sm text-gray-500">Price: $90.00</span>
            <br />
            <span className="text-sm text-gray-500">
              Subscription Acknowledgement
              <br />
              I understand that by clicking this box, I am signing up for...
            </span>
            <br />
            <span className="text-sm text-gray-500">Select Strength: 30 MG</span>
          </td>
          <td className="border-b p-2">LP-GEN-*</td>
          <td className="border-b p-2">$3.00</td>
          <td className="border-b p-2">30</td>
          <td className="border-b p-2">$90.00</td>
        </tr>
      </tbody>
    </table>
    <div className="mt-4 text-right">
      <p>Subtotal: $90.00</p>
      <p>Discount (SMPLYCODES 10): -$9.00</p>
      <p>Shipping and Handling: $0.00</p>
      <p className="font-bold">Grand Total: $81.00</p>
    </div>
  </div>
</TabPanel>
          

<TabPanel>
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-md font-semibold mb-4">Shipment #000031341</h2>
    <button className="text-blue-500 text-sm underline mb-4">
      Print Shipment
    </button>

    <div className="mb-4">
      <span className="font-bold">Tracking Number(s): </span>
      <span>9400111105502313678298</span>
    </div>

    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2 text-left">Product Name</th>
          <th className="border-b p-2">SKU</th>
          <th className="border-b p-2">QTY Shipped</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-b p-2">
            Landing Page Generic
            <br />
            <span className="text-sm text-gray-500">State Name: Florida ($0.00)</span>
            <br />
            <span className="text-sm text-gray-500">
              Subscription Acknowledgement:
              <br />
              I understand that by clicking this box, I am signing up...
            </span>
            <br />
            <span className="text-sm text-gray-500">Select Strength: 20 MG</span>
          </td>
          <td className="border-b p-2">LP-GEN-*</td>
          <td className="border-b p-2">30</td>
        </tr>
      </tbody>
    </table>
  </div>
</TabPanel>

          </TabPanels>
        </TabGroup>
      </div>

      {/* Order Information Section */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow">
        <h2 className="text-md font-bold mb-4">Order Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold">Shipping Address</h3>
            <p>Lawrence 103869</p>
            <p>Lorem Ipsum</p>
            <p>11089</p>
          </div>
          {/* Shipping Method */}
          <div>
            <h3 className="font-semibold">Shipping Method</h3>
            <p>Rate</p>
          </div>
          {/* Billing Address */}
          <div>
            <h3 className="font-semibold">Billing Address</h3>
            <p>Lawrence 103869</p>
            <p>Lorem Ipsum</p>
            <p>11089</p>
          </div>
          {/* Payment Method */}
          <div>
            <h3 className="font-semibold">Payment Method</h3>
            <p>Credit Card - Visa</p>
            <p>Credit Card Number: **** **** **** 1234</p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Orders;
