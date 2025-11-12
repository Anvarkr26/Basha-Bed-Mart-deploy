import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { Product } from '../../types';

const initialNewProductState: Omit<Product, 'id'> = {
    name: '',
    shortDescription: '',
    description: '',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/newproduct/800/600',
    category: '',
    material: '',
    rating: 4.5,
    isFeatured: false,
    variants: [],
};

const AdminProductsPage: React.FC = () => {
    const { products, addProduct, removeProduct } = useAppContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(initialNewProductState);
    const [variantsJson, setVariantsJson] = useState('[\n  {\n    "id": 101,\n    "size": "Single",\n    "clothMaterial": "Premium Fabric",\n    "weight": 20,\n    "thickness": 6,\n    "price": 15000,\n    "stock": 25\n  }\n]');
    const [jsonError, setJsonError] = useState('');
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let processedValue: string | number | boolean = value;
        if (type === 'number') {
            processedValue = Number(value);
        } else if (name === 'isFeatured') {
            processedValue = (e.target as HTMLInputElement).checked;
        }
        setNewProduct({ ...newProduct, [name]: processedValue });
    };

    const handleVariantsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const jsonString = e.target.value;
        setVariantsJson(jsonString);
        try {
            const parsedVariants = JSON.parse(jsonString);
            if (Array.isArray(parsedVariants)) {
                setNewProduct({ ...newProduct, variants: parsedVariants });
                setJsonError('');
            } else {
                setJsonError('Variants must be an array.');
            }
        } catch (error) {
            setJsonError('Invalid JSON format for variants.');
        }
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (jsonError) {
            alert(`Cannot add product: ${jsonError}`);
            return;
        }
        if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
            alert('Product Name, Category, and a valid Price are required.');
            return;
        }
        addProduct(newProduct);
        closeAddModal();
    };

    const handleDeleteProduct = () => {
        if (productToDelete) {
            removeProduct(productToDelete.id);
            setProductToDelete(null);
        }
    };
    
    const openAddModal = () => {
        setNewProduct(initialNewProductState);
        setVariantsJson('[\n  {\n    "id": 101,\n    "size": "Single",\n    "clothMaterial": "Premium Fabric",\n    "weight": 20,\n    "thickness": 6,\n    "price": 15000,\n    "stock": 25\n  }\n]');
        setJsonError('');
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary text-white";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <button 
                    onClick={openAddModal}
                    className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Add New Product
                </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs text-gray-100 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Product Name</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-medium">{product.id}</td>
                                <td className="px-6 py-4">{product.name}</td>
                                <td className="px-6 py-4">{product.variants.reduce((sum, variant) => sum + variant.stock, 0)}</td>
                                <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4 space-x-4">
                                    <Link to={`/admin/products/edit/${product.id}`} className="font-medium text-blue-400 hover:underline">Edit</Link>
                                    <button onClick={() => setProductToDelete(product)} className="font-medium text-red-400 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in-down" onClick={closeAddModal}>
                    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleAddProduct} className="max-h-[90vh] overflow-y-auto">
                           <div className="p-8">
                            <h2 className="text-2xl font-bold mb-6 text-white">Add New Product</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Product Name</label>
                                        <input type="text" id="name" name="name" value={newProduct.name} onChange={handleInputChange} className={inputClasses} required />
                                    </div>
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-200 mb-1">Category</label>
                                        <input type="text" id="category" name="category" value={newProduct.category} onChange={handleInputChange} className={inputClasses} required />
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-200 mb-1">Base Price (₹)</label>
                                        <input type="number" id="price" name="price" value={newProduct.price} onChange={handleInputChange} className={inputClasses} required />
                                    </div>
                                    <div>
                                        <label htmlFor="material" className="block text-sm font-medium text-gray-200 mb-1">Material</label>
                                        <input type="text" id="material" name="material" value={newProduct.material} onChange={handleInputChange} className={inputClasses} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-200 mb-1">Short Description</label>
                                        <textarea id="shortDescription" name="shortDescription" value={newProduct.shortDescription} onChange={handleInputChange} rows={2} className={inputClasses}></textarea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">Full Description</label>
                                        <textarea id="description" name="description" value={newProduct.description} onChange={handleInputChange} rows={4} className={inputClasses}></textarea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="variants" className="block text-sm font-medium text-gray-200 mb-1">Variants (JSON format)</label>
                                        <textarea id="variants" name="variants" value={variantsJson} onChange={handleVariantsChange} rows={8} className={`${inputClasses} font-mono text-sm ${jsonError ? 'border-red-500' : ''}`}></textarea>
                                        {jsonError && <p className="text-red-400 text-xs mt-1">{jsonError}</p>}
                                    </div>
                                </div>
                           </div>
                           <div className="flex justify-end space-x-4 p-6 bg-gray-700/50 rounded-b-lg">
                                <button type="button" onClick={closeAddModal} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {productToDelete && (
                 <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in-down" onClick={() => setProductToDelete(null)}>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4 text-white">Confirm Deletion</h2>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete the product "{productToDelete.name}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setProductToDelete(null)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;