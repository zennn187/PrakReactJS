import {
  FaShoppingCart,
  FaCheckCircle,
  FaBan,
  FaDollarSign,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import ordersData from "../data/ordersData.json";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    pending: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0,
  });

  // Mengambil 5 data terbaru dari ordersData.json
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Urutkan berdasarkan orderDate (terbaru di atas) lalu ambil 5 data
    const sortedOrders = [...ordersData]
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5)
      .map(order => ({
        id: order.orderId,
        customer: order.customerName,
        date: new Date(order.orderDate).toLocaleDateString('id-ID'),
        total: `Rp ${order.totalPrice.toLocaleString('id-ID')}`,
        status: order.status.toLowerCase()
      }));
    
    setRecentOrders(sortedOrders);

    // Hitung statistik dari data orders.json
    const pendingCount = ordersData.filter(order => order.status === "Pending").length;
    const completedCount = ordersData.filter(order => order.status === "Completed").length;
    const cancelledCount = ordersData.filter(order => order.status === "Cancelled").length;
    
    // Hitung TOTAL REVENUE (jumlah semua totalPrice)
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.totalPrice, 0);

    // Animasi counter
    const animateCount = (target, key, isRevenue = false) => {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounts((prev) => ({ ...prev, [key]: isRevenue ? target : Math.floor(start) }));
          clearInterval(timer);
        } else {
          setCounts((prev) => ({ ...prev, [key]: isRevenue ? Math.floor(start) : Math.floor(start) }));
        }
      }, 16);
    };

    animateCount(pendingCount, "pending");
    animateCount(completedCount, "completed");
    animateCount(cancelledCount, "cancelled");
    animateCount(totalRevenue, "totalRevenue", true);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
            Pending
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  // Format Rupiah untuk tampilan
  const formatRupiah = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <div className="animate-fadeIn">
      <PageHeader title="Dashboard" />

      {/* Stats Cards */}
      <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending Card */}
        <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150"></div>
          <div className="relative flex items-center space-x-5">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-4 shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-12">
              <FaShoppingCart className="text-3xl text-white transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-gray-800 transition-all duration-500 group-hover:text-yellow-600">
                {counts.pending}
              </span>
              <span className="text-gray-500 font-medium mt-1">
                Pending Orders
              </span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Completed Card */}
        <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-100">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150"></div>
          <div className="relative flex items-center space-x-5">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 group-hover:-rotate-12">
              <FaCheckCircle className="text-3xl text-white transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-gray-800 transition-all duration-500 group-hover:text-green-600">
                {counts.completed}
              </span>
              <span className="text-gray-500 font-medium mt-1">Completed</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Cancelled Card */}
        <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-200">
          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150"></div>
          <div className="relative flex items-center space-x-5">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-12">
              <FaBan className="text-3xl text-white transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-gray-800 transition-all duration-500 group-hover:text-red-600">
                {counts.cancelled}
              </span>
              <span className="text-gray-500 font-medium mt-1">Cancelled</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150"></div>
          <div className="relative flex items-center space-x-5">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 group-hover:-rotate-12">
              <FaDollarSign className="text-3xl text-white transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-800 transition-all duration-500 group-hover:text-blue-600">
                {formatRupiah(counts.totalRevenue)}
              </span>
              <span className="text-gray-500 font-medium mt-1">Total Revenue</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="px-5 pb-8 animate-fadeInUp animation-delay-500">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <p className="text-sm text-gray-500 mt-1">
              Latest 5 orders from customers
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors duration-300 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {order.total}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110">
                          <FaEye />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 hover:scale-110">
                          <FaEdit />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}