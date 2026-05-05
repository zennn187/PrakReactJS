import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign up</h2>
            <p className="text-gray-500 mb-8 text-sm font-medium">Create an account to manage your restaurant.</p>

            <form>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm placeholder-gray-400"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <div className="mb-8">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm placeholder-gray-400"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md shadow-orange-500/30"
                >
                    Sign up
                </button>

                <p className="text-center mt-6 text-sm text-gray-600 font-medium">
                    Already have an account? <Link to="/login" className="text-orange-500 hover:text-orange-600">Sign in</Link>
                </p>
            </form>
        </div>
    );
}