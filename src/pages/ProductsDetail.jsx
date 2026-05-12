import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield } from "lucide-react"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.message)
                    return
                }
                setProduct(response.data)
                setSelectedImage(0)
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading produk...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-md text-center">
                    <p className="text-red-600 font-semibold text-lg mb-2">Terjadi Kesalahan</p>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        )
    }

    if (!product) return null

    const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail]
    const discountPercent = product.discountPercentage ? Math.round(product.discountPercentage) : 0
    const originalPrice = product.price / (1 - discountPercent / 100)

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
                    <span>Produk</span>
                    <span>/</span>
                    <span className="capitalize">{product.category}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                            <img
                                src={images[selectedImage]}
                                alt={product.title}
                                className="w-full h-96 lg:h-[500px] object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === idx
                                                ? "border-blue-500 ring-2 ring-blue-300"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Gambar ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        {/* Category & Title */}
                        <div>
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                                {product.category}
                            </p>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                {product.title}
                            </h1>
                            <p className="text-gray-600">Merek: <span className="font-semibold text-gray-900">{product.brand}</span></p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating ? product.rating.toFixed(1) : 'N/A'} dari 5
                            </span>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <p className="text-gray-700 leading-relaxed">
                                {product.description}
                            </p>
                        )}

                        {/* Price Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-4xl font-bold text-blue-600">
                                    Rp {(product.price * 1000).toLocaleString('id-ID')}
                                </span>
                                {discountPercent > 0 && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">
                                            Rp {Math.round(originalPrice * 1000).toLocaleString('id-ID')}
                                        </span>
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            -{discountPercent}%
                                        </span>
                                    </>
                                )}
                            </div>
                            {product.stock !== undefined && (
                                <p className="text-sm text-gray-700">
                                    Stok: <span className={product.stock > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                        {product.stock > 0 ? `${product.stock} tersedia` : "Habis"}
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* Product Specs */}
                        <div className="grid grid-cols-2 gap-4">
                            {product.weight && (
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <p className="text-gray-600 text-sm mb-1">Berat</p>
                                    <p className="font-semibold text-gray-900">{product.weight}g</p>
                                </div>
                            )}
                            {product.dimensions && (
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <p className="text-gray-600 text-sm mb-1">Dimensi</p>
                                    <p className="font-semibold text-gray-900">
                                        {product.dimensions.width}×{product.dimensions.height}×{product.dimensions.depth}cm
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-semibold">Jumlah:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                                >
                                    −
                                </button>
                                <span className="px-6 py-2 font-semibold text-gray-900 border-l border-r border-gray-300">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
                                <ShoppingCart size={20} />
                                Tambah ke Keranjang
                            </button>
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-colors border-2 ${
                                    isFavorite
                                        ? "bg-red-50 border-red-500 text-red-600"
                                        : "bg-white border-gray-300 text-gray-700 hover:border-red-500"
                                }`}
                            >
                                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                            </button>
                            <button className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                                <Truck className="text-green-600" size={24} />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Pengiriman Gratis</p>
                                    <p className="text-xs text-gray-600">ke seluruh Indonesia</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <Shield className="text-blue-600" size={24} />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Garansi</p>
                                    <p className="text-xs text-gray-600">Resmi & Terpercaya</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}