import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers, FaClipboardList, FaExclamationTriangle, FaUtensils, FaChartPie, FaRegCalendarAlt, FaCommentDots, FaWallet } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const [activeMenu, setActiveMenu] = useState("Dashboard");

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-3.5 space-x-4 font-medium transition-all duration-200
        ${isActive ?
            "text-orange-500 bg-orange-50 shadow-sm" :
            "text-gray-500 hover:bg-gray-50 hover:text-orange-500"
        }`

    const menuItems = [
        { name: "Dashboard", icon: MdSpaceDashboard, path: "/" },
        { name: "Order List", icon: FaClipboardList, path: "/orders" },
        { name: "Customer", icon: FaUsers, path: "/customers" },
        { name: "Analytics", icon: FaChartPie, path: "/analytics" },
        { name: "Foods", icon: FaUtensils, path: "/foods" },
        { name: "Calendar", icon: FaRegCalendarAlt, path: "/calendar" },
        { name: "Chat", icon: FaCommentDots, path: "/chat" },
        { name: "Wallet", icon: FaWallet, path: "/wallet" },
        { name: "Error 404", icon: FaExclamationTriangle, path: "/error-404" }
    ];

    return (
        <div className="flex min-h-screen w-[280px] flex-col bg-white p-6 border-r border-gray-100 z-20">
            <div className="flex items-center mb-10 pl-2">
                <span className="font-poppins text-4xl font-extrabold text-gray-800 tracking-tight">
                    On-Catering<b className="text-orange-500">.</b>
                </span>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                <ul className="space-y-1.5">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                onClick={() => setActiveMenu(item.name)}
                                className={menuClass}
                            >
                                <item.icon className={`text-xl ${activeMenu === item.name ? "text-orange-500" : "text-gray-400"}`} />
                                <span className="flex-1 text-sm">{item.name}</span>
                                {activeMenu === item.name && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8 bg-orange-50 rounded-2xl p-5 text-center shadow-sm relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-100 rounded-full opacity-50"></div>
                <h4 className="text-sm font-bold text-gray-800 mb-2 relative z-10">Organize Menus!</h4>
                <p className="text-xs text-gray-500 mb-4 relative z-10">Add or manage your food menus easily.</p>
                <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-orange-500/20 relative z-10">
                    Add Menus
                </button>
            </div>
        </div>
    );
}