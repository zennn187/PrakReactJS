import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";

export default function Orders() {
    const [counts, setCounts] = useState({
        pending: 0,
        processing: 0,
        shipped: 0,
        completed: 0
    });

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

    return (
        <div className="animate-fadeIn">
        <PageHeader title="Dashboard"/>
            
            <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Pending Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                            <FaShoppingCart className="text-3xl text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-gray-800 group-hover:text-yellow-600">
                                {counts.pending}
                            </span>
                            <span className="text-gray-500 font-medium">Pending</span>
                        </div>
                    </div>
                </div>

                {/* Processing Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-100">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                            <FaTruck className="text-3xl text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-gray-800 group-hover:text-blue-600">
                                {counts.processing}
                            </span>
                            <span className="text-gray-500 font-medium">Processing</span>
                        </div>
                    </div>
                </div>

                {/* Shipped Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-200">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                            <FaBan className="text-3xl text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-gray-800 group-hover:text-purple-600">
                                {counts.shipped}
                            </span>
                            <span className="text-gray-500 font-medium">Shipped</span>
                        </div>
                    </div>
                </div>

                {/* Completed Card */}
                <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp animation-delay-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center space-x-5">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                            <FaDollarSign className="text-3xl text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-gray-800 group-hover:text-green-600">
                                {counts.completed}
                            </span>
                            <span className="text-gray-500 font-medium">Completed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}