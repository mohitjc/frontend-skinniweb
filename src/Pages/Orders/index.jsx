import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PageLayout from "../../components/sidebarglobal/PageLayout";

const Orders = () => {
  return (
    <PageLayout>
    <div className="max-w-4xl mx-auto p-6">
      {/* Order Details Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h1 className="text-lg font-bold mb-4">Order #000036462</h1>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">December 25</span>
          <button className="bg-gray-200 px-4 py-2 rounded">Reorder</button>
        </div>

        {/* Tab Group for Order Sections */}
        <TabGroup>
          <TabList className="flex space-x-4 border-b">
            {/* Items Ordered Tab */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "px-4 py-2 border-b-2 border-black font-semibold"
                  : "px-4 py-2 text-gray-500"
              }
            >
              Items Ordered
            </Tab>
            {/* Invoices Tab */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "px-4 py-2 border-b-2 border-black font-semibold"
                  : "px-4 py-2 text-gray-500"
              }
            >
              Invoices
            </Tab>
            {/* Order Shipping Tab */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "px-4 py-2 border-b-2 border-black font-semibold"
                  : "px-4 py-2 text-gray-500"
              }
            >
              Order Shipping
            </Tab>
          </TabList>

          <TabPanels className="mt-4">
            {/* Items Ordered Panel */}
            <TabPanel>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-md font-semibold mb-2">Items Ordered</h2>
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
    </PageLayout>
  );
};

export default Orders;
