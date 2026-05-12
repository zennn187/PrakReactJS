import {
  FaShoppingCart,
  FaCheckCircle,
  FaBan,
  FaDollarSign,
  FaEllipsisH,
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

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
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

    const pendingCount = ordersData.filter(order => order.status === "Pending").length;
    const completedCount = ordersData.filter(order => order.status === "Completed").length;
    const cancelledCount = ordersData.filter(order => order.status === "Cancelled").length;
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.totalPrice, 0);

    // Animasi counter simple
    const animateCount = (target, key, isRevenue = false) => {
      let start = 0;
      const duration = 1500;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounts((prev) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounts((prev) => ({ ...prev, [key]: Math.floor(start) }));
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
          <span className="px-4 py-1.5 text-xs font-bold rounded-xl bg-yellow-100 text-yellow-600">
            Pending
          </span>
        );
      case "completed":
        return (
          <span className="px-4 py-1.5 text-xs font-bold rounded-xl bg-green-100 text-green-600">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="px-4 py-1.5 text-xs font-bold rounded-xl bg-red-100 text-red-600">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-4 py-1.5 text-xs font-bold rounded-xl bg-gray-100 text-gray-600">
            {status}
          </span>
        );
    }
  };

  const formatRupiah = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const stats = [
    { title: "Pending Orders", value: counts.pending, icon: FaShoppingCart, bg: "bg-blue-50", color: "text-blue-500" },
    { title: "Completed Orders", value: counts.completed, icon: FaCheckCircle, bg: "bg-green-50", color: "text-green-500" },
    { title: "Cancelled Orders", value: counts.cancelled, icon: FaBan, bg: "bg-red-50", color: "text-red-500" },
    { title: "Total Revenue", value: formatRupiah(counts.totalRevenue), icon: FaDollarSign, bg: "bg-orange-50", color: "text-orange-500" },
  ];

  return (
    <div>
      <PageHeader title="Dashboard On-Catering" />

      {/* Stats Cards - Gaya Minimalis Aprycot */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-extrabold text-gray-800">{stat.value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`text-2xl ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Overview of latest orders</p>
          </div>
          <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 bg-orange-50 px-4 py-2 rounded-xl transition">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-gray-800">{order.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${order.customer}`} alt="avatar" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-500">{order.date}</td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-800">{order.total}</td>
                  <td className="px-8 py-5">{getStatusBadge(order.status)}</td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors bg-gray-50 hover:bg-orange-50 rounded-lg">
                      <FaEllipsisH />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}