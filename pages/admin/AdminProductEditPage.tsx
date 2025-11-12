import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { Product } from '../../types';

const AdminProductEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, updateProduct } = useAppContext();
    
    const [formData, setFormData] = useState<Product | null>(null);
    const [variantsJson, setVariantsJson] = useState('');
    const [jsonError, setJsonError] = useState('');

    useEffect(() => {
        const productToEdit = products.find(p => p.id === Number(id));
        if (productToEdit) {
            setFormData(productToEdit);
            setVariantsJson(JSON.stringify(productToEdit.variants, null, 2));
        } else {
            navigate('/admin/products');
        }
    }, [id, products, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        const { name, value, type } = e.target;
        let processedValue: string | number | boolean = value;

        if (type === 'number') {
            processedValue = Number(value);
        } else if (name === 'isFeatured') {
            processedValue = (e.target as HTMLInputElement).checked;
        }

        setFormData({
            ...formData,
            [name]: processedValue,
        });
    };
    
    const handleVariantsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const jsonString = e.target.value;
        setVariantsJson(jsonString);
        if (!formData) return;

        try {
            const parsedVariants = JSON.parse(jsonString);
            if (Array.isArray(parsedVariants)) {
                setFormData({ ...formData, variants: parsedVariants });
                setJsonError('');
            } else {
                setJsonError('Variants must be a valid JSON array.');
            }
        } catch (error) {
            setJsonError('Invalid JSON format for variants.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (jsonError) {
            alert(`Cannot save: ${jsonError}`);
            return;
        }
        if (formData) {
            try {
                updateProduct(formData);
                navigate('/admin/products');
            } catch (error) {
                alert('Failed to save changes. Please try again.');
            }
        }
    };
    
    if (!formData) {
        return <div className="text-center p-8">Loading product details...</div>;
    }

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary text-white transition-colors duration-200";

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit Product: {formData.name}</h1>
            
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Product Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={inputClasses} required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-200 mb-1">Category</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} className={inputClasses} required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-200 mb-1">Base Price (₹)</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} className={inputClasses} required />
                    </div>
                    <div>
                        <label htmlFor="material" className="block text-sm font-medium text-gray-200 mb-1">Material</label>
                        <input type="text" id="material" name="material" value={formData.material} onChange={handleInputChange} className={inputClasses} />
                    </div>
                     <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-200 mb-1">Rating</label>
                        <input type="number" id="rating" name="rating" step="0.1" value={formData.rating} onChange={handleInputChange} className={inputClasses} required />
                    </div>
                     <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200 mb-1">Image URL</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className={inputClasses} required />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-200 mb-1">Short Description</label>
                        <textarea id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} rows={2} className={inputClasses}></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">Full Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={4} className={inputClasses}></textarea>
                    </div>
                     <div className="md:col-span-2">
                        <div className="flex items-center">
                            <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"/>
                            <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-200">Featured Product</label>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="variants" className="block text-sm font-medium text-gray-200 mb-1">Variants (JSON format)</label>
                        <textarea id="variants" name="variants" value={variantsJson} onChange={handleVariantsChange} rows={10} className={`${inputClasses} font-mono text-sm ${jsonError ? 'border-red-500 ring-red-500' : ''}`}></textarea>
                        {jsonError && <p className="text-red-400 text-xs mt-1">{jsonError}</p>}
                    </div>
                </div>
                 <div className="flex justify-end space-x-4 mt-8">
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
