import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";

export default function Orders() {
    const [counts, setCounts] = useState({
        pending: 0,
        processing: 0,
        shipped: 0,
        completed: 0
    });

    // Data contoh orders
    const [recentOrders] = useState([
        { id: "ORD-001", customer: "Budi Santoso", date: "2025-04-21", total: "Rp 250.000", status: "pending" },
        { id: "ORD-002", customer: "Siti Aminah", date: "2025-04-21", total: "Rp 175.000", status: "processing" },
        { id: "ORD-003", customer: "Ahmad Rizki", date: "2025-04-20", total: "Rp 450.000", status: "shipped" },
        { id: "ORD-004", customer: "Dewi Sartika", date: "2025-04-20", total: "Rp 320.000", status: "completed" },
        { id: "ORD-005", customer: "Rizki Fadilah", date: "2025-04-19", total: "Rp 120.000", status: "pending" },
    ]);

    // Animasi counter
    useEffect(() => {
        const animateCount = (target, key) => {
            let start = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCounts(prev => ({ ...prev, [key]: target }));
                    clearInterval(timer);
                } else {
                    setCounts(prev => ({ ...prev, [key]: Math.floor(start) }));
                }
            }, 16);
        };

        animateCount(25, 'pending');
        animateCount(30, 'processing');
        animateCount(15, 'shipped');
        animateCount(75, 'completed');
    }, []);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
            case 'processing': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">Processing</span>;
            case 'shipped': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">Shipped</span>;
            case 'completed': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Completed</span>;
            default: return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">Unknown</span>;
        }
    };

    return (
        <div className="animate-fadeIn">
            <PageHeader title="Dashboard"/>
            
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
                            <span className="text-gray-500 font-medium mt-1">Pending Orders</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Processing Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150"></div>
                    <div className="relative flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 group-hover:-rotate-12">
                            <FaTruck className="text-3xl text-white transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-gray-800 transition-all duration-500 group-hover:text-blue-600">
                                {counts.processing}
                            </span>
                            <span className="text-gray-500 font-medium mt-1">Processing</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Shipped Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150"></div>
                    <div className="relative flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-12">
                            <FaBan className="text-3xl text-white transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-gray-800 transition-all duration-500 group-hover:text-purple-600">
                                {counts.shipped}
                            </span>
                            <span className="text-gray-500 font-medium mt-1">Shipped</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Completed Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150"></div>
                    <div className="relative flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-110 group-hover:-rotate-12">
                            <FaDollarSign className="text-3xl text-white transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-gray-800 transition-all duration-500 group-hover:text-green-600">
                                {counts.completed}
                            </span>
                            <span className="text-gray-500 font-medium mt-1">Completed</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="px-5 pb-8 animate-fadeInUp animation-delay-500">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                        <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                        <p className="text-sm text-gray-500 mt-1">Latest 5 orders from customers</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentOrders.map((order, index) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-300 group" style={{ animationDelay: `${index * 100}ms` }}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{order.total}</td>
                                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
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