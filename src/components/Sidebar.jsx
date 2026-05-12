import { MdSpaceDashboard, MdShoppingBag } from "react-icons/md"; // Tambah MdShoppingBag
import { FaUsers, FaPlus, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-3.5 space-x-4 font-medium transition-all duration-200
        ${isActive ?
            "text-orange-500 bg-orange-50 shadow-sm" :
            "text-gray-500 hover:bg-gray-50 hover:text-orange-500"
        }`

    const menuItems = [
        { name: "Dashboard", icon: MdSpaceDashboard, color: "text-green-600", gradient: "from-green-400 to-green-600", path: "/" },
        // --- MENU  BARU ---
        { name: "Products", icon: MdShoppingBag, color: "text-emerald-600", gradient: "from-emerald-400 to-emerald-600", path: "/products" },
        // ------------------------
        { name: "Orders", icon: FaClipboardList, color: "text-blue-600", gradient: "from-blue-400 to-blue-600", path: "/orders" },
        { name: "Customers", icon: FaUsers, color: "text-purple-600", gradient: "from-purple-400 to-purple-600", path: "/customers" },
        { name: "Error 400", icon: FaExclamationTriangle, color: "text-red-600", gradient: "from-red-400 to-red-600", path: "/error-400" },
        { name: "Error 401", icon: FaExclamationTriangle, color: "text-orange-600", gradient: "from-orange-400 to-orange-600", path: "/error-401" },
        { name: "Error 403", icon: FaExclamationTriangle, color: "text-yellow-600", gradient: "from-yellow-400 to-yellow-600", path: "/error-403" }
    ];

    return (
        <div className="flex min-h-screen w-80 flex-col bg-gradient-to-b from-white via-white to-gray-50 p-8 shadow-2xl animate-slideInLeft relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            {/* Logo Sedap */}
            <div className="flex flex-col mb-10 group cursor-pointer relative overflow-visible">
                <div className="absolute -inset-3 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* Falling Particles (Disederhanakan untuk ruang) */}
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`absolute w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-60 animate-fall-${(i % 12) + 1}`}
                             style={{ left: `${i * 15}%`, top: '-10px' }}></div>
                    ))}
                </div>
                
                <div className="relative text-center">
                    <div className="relative inline-block">
                        <span className="font-poppins text-5xl font-black tracking-tight">
                            <span className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent group-hover:from-green-600/70 group-hover:via-green-500/70 group-hover:to-green-400/70 transition-all duration-500">
                                Sedap
                            </span>
                            <b className="text-green-500 text-5xl ml-0.5 inline-block group-hover:animate-pulse transition-all duration-300">.</b>
                        </span>
                    </div>
                    <div className="mt-2 flex justify-center">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-green-500/50 to-transparent rounded-full group-hover:w-24 transition-all duration-500"></div>
                    </div>
                    <p className="mt-2 text-[10px] font-medium text-gray-400 tracking-[0.2em]">✦ MODERN ADMIN ✦</p>
                </div>
            </div>

            {/* User Profile Card */}
            <div className="relative mb-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-md group cursor-pointer">
                <div className="relative flex items-center space-x-3">
                    <div className="relative">
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIe3VuOA6oMIqC9QIR6mkvfG9stciQXtOZ4A&s" 
                            className="w-12 h-12 rounded-full border-2 border-green-500 group-hover:scale-110 transition-transform duration-300"
                            alt="Profile"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Welcome back,</p>
                        <p className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Oza Okta</p>
                        <p className="text-[10px] text-gray-400 font-mono">{currentTime.toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>

            {/* List Menu */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <p className="text-[10px] font-bold text-gray-400 mb-4 px-4 tracking-[0.3em]">MAIN MENU</p>
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={item.name} className="relative">
                            <NavLink
                                to={item.path}
                                onClick={() => setActiveMenu(item.name)}
                                className={menuClass}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}></div>
                                <item.icon className={`text-xl transition-all duration-300 ${activeMenu === item.name ? item.color : 'text-gray-400 group-hover:text-green-500'} group-hover:scale-110`} />
                                <span className="flex-1 font-medium text-sm">{item.name}</span>
                                
                                {activeMenu === item.name && (
                                    <>
                                        <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-green-500 rounded-r-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-6">
                <div className="group relative bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-2xl shadow-lg mb-4 cursor-pointer transition-all duration-500 hover:shadow-green-200/50">
                    <div className="relative text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Update</span>
                        </div>
                        <div className="flex justify-center items-center p-2.5 bg-white/20 rounded-xl space-x-2 backdrop-blur-sm hover:bg-white/30 transition-all">
                            <FaPlus className="text-xs" />
                            <span className="text-xs font-bold">Add New Menus</span>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <span className="font-bold text-gray-500 block text-[10px] uppercase tracking-widest">
                        Sedap Restaurant Admin
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">&copy; 2026 v.1.0.0</p>
                </div>
            </div>
        </div>
    );
}