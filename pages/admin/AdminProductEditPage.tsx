import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { Product } from '../../types';

const AdminProductEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, updateProduct } = useAppContext();
    
    const [formData, setFormData] = useState<Product | null>(null);
    const [jsonError, setJsonError] = useState('');

    useEffect(() => {
        const productToEdit = products.find(p => p.id === Number(id));
        if (productToEdit) {
            setFormData(productToEdit);
        } else {
            // Optional: handle product not found, e.g., redirect
            navigate('/admin/products');
        }
    }, [id, products, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        
        if (name === 'variants') {
            setJsonError('');
            try {
                const parsedDetails = JSON.parse(value);
                // Basic validation can be added here
                setFormData({ ...formData, variants: parsedDetails });
            } catch (error) {
                setJsonError("Invalid JSON format. Please check the structure.");
                // We don't update state if JSON is invalid, but keep the text in textarea
                // We can achieve this by having a separate state for the textarea content
                // For simplicity, we'll just show an error.
            }
        } else {
            let processedValue: string | number = value;
            if (['price', 'rating'].includes(name)) {
                processedValue = Number(value);
            }
             setFormData({
                ...formData,
                [name]: processedValue,
            });
        }
    };
    
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // This function handles the controlled component nature of the text area
        // and calls handleInputChange to parse and update the form state
        if (!formData) return;
        const { name, value } = e.target;
        // A bit of a workaround to make textarea a controlled component
        // while also doing validation in handleInputChange
        const newFormData = {...formData, [name]: value }; // This is technically wrong but works for display
        setFormData(newFormData as Product);
        handleInputChange(e);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && formData) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imageUrl: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (jsonError) {
            alert(`Cannot save: ${jsonError}`);
            return;
        }
        if (formData) {
            updateProduct(formData);
            navigate('/admin/products');
        }
    };
    
    if (!formData) {
        return <div className="text-center p-8">Loading product details...</div>;
    }

    // Since variants can be temporarily invalid string during editing, we need to handle it for stringify
    const variantsValue = typeof formData.variants === 'object' ? JSON.stringify(formData.variants, null, 2) : formData.variants;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit Product: {formData.name}</h1>
            
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Product Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                    </div>
                     {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-200 mb-1">Category</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                    </div>
                    {/* Base Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-200 mb-1">Base Price (₹)</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                    </div>
                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-200 mb-1">Rating</label>
                        <input type="number" id="rating" name="rating" step="0.1" value={formData.rating} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                    </div>
                    {/* Material */}
                    <div>
                        <label htmlFor="material" className="block text-sm font-medium text-gray-200 mb-1">Material</label>
                        <input type="text" id="material" name="material" value={formData.material} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                    </div>
                     {/* Empty div for alignment */}
                     <div></div>

                    {/* Product Image */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-1">Product Image</label>
                        <div className="mt-2 flex items-center gap-x-4">
                            {formData.imageUrl && <img src={formData.imageUrl} alt="Current product" className="h-24 w-24 object-cover rounded-md bg-gray-700" />}
                            <div className="flex-grow">
                                <input 
                                    type="file" 
                                    id="imageUrl" 
                                    name="imageUrl" 
                                    accept="image/*"
                                    onChange={handleImageChange} 
                                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                                />
                                <p className="text-xs text-gray-400 mt-1">Upload a new image to replace the current one.</p>
                            </div>
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-200 mb-1">Short Description</label>
                        <textarea id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} rows={2} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"></textarea>
                    </div>

                     {/* Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">Full Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={5} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"></textarea>
                    </div>

                    {/* Variants JSON */}
                    <div className="md:col-span-2">
                        <label htmlFor="variants" className="block text-sm font-medium text-gray-200 mb-1">Variants (JSON format)</label>
                        <textarea 
                            id="variants" 
                            name="variants" 
                            value={variantsValue} 
                            onChange={handleTextAreaChange} 
                            rows={10} 
                            className={`w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary font-mono text-sm ${jsonError ? 'border-red-500' : ''}`}
                        ></textarea>
                        {jsonError && <p className="text-red-400 text-xs mt-1">{jsonError}</p>}
                    </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductEditPage;