import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message);
                    return;
                }
                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError(err.message || "An unknown error occurred");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const errorInfo = error ? (
        <div className="bg-red-50 border-l-4 border-red-500 mb-6 p-4 text-sm text-red-700 rounded-r flex items-center shadow-sm">
            <BsFillExclamationDiamondFill className="mr-2 text-lg" />
            {error}
        </div>
    ) : null;

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h2>
            <p className="text-gray-500 mb-8 text-sm font-medium">Sign in to stay connected.</p>

            {errorInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm placeholder-gray-400"
                        placeholder="you@example.com"
                        onChange={handleChange}
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm placeholder-gray-400"
                        placeholder="********"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center justify-between mb-8">
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 mr-2 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                        Remember me
                    </label>
                    <Link to="/forgot" className="text-sm text-orange-500 font-semibold hover:text-orange-600">
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md shadow-orange-500/30 flex justify-center items-center"
                >
                    {loading ? (
                        <><ImSpinner2 className="mr-2 animate-spin" /> Signing in...</>
                    ) : (
                        "Sign in"
                    )}
                </button>

                <p className="text-center mt-6 text-sm text-gray-600 font-medium">
                    Don't have an account? <Link to="/register" className="text-orange-500 hover:text-orange-600">Sign up</Link>
                </p>
            </form>
        </div>
    );
}