import Layout from "../../components/sidebarglobal/layout";

const Subscription = () => {
  return (
    <Layout>
    <div className="bg-gray-100 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Subscriptions</h2>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Sort By</span>
          <select className="bg-white border border-gray-300 rounded-md px-3 py-2">
            <option value="ref">Ref</option>
            <option value="description">Description</option>
            <option value="status">Status</option>
            <option value="frequency">Frequency</option>
            <option value="subtotal">Subtotal</option>
            <option value="lastRun">Last Run</option>
            <option value="nextRun">Next Run</option>
          </select>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase text-gray-700 bg-gray-200">
          <tr>
            <th className="px-6 py-3">Ref#</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Frequency</th>
            <th className="px-6 py-3">Subtotal</th>
            <th className="px-6 py-3">Last Run</th>
            <th className="px-6 py-3">Next Run</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b hover:bg-gray-100">
            <td className="px-6 py-4">1000001737</td>
            <td className="px-6 py-4">Landing Page</td>
            <td className="px-6 py-4">Active</td>
            <td className="px-6 py-4">Every Month</td>
            <td className="px-6 py- 4">890.00</td>
            <td className="px-6 py-4">12/25/24</td>
            <td className="px-6 py-4">1/25/25</td>
          </tr>
        </tbody>
      </table>

      <p className="text-gray-600 mt-4">
        Note: Subtotals do not include shipping, tax, or other possible surcharges. Actual order totals may vary over time.
      </p>
    </div>
    </Layout>
  );
};

export default Subscription;