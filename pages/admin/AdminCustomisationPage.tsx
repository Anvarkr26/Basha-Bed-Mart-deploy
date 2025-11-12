import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { CarouselSlide } from '../../types';

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

const initialSlideState: Omit<CarouselSlide, 'id'> = {
    imageUrl: '',
    headline: '',
};

const AdminCustomisationPage: React.FC = () => {
    const { 
        carouselSlides, addCarouselSlide, updateCarouselSlide, removeCarouselSlide,
        siteSettings, updateSiteSettings 
    } = useAppContext();

    // Carousel State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState<Omit<CarouselSlide, 'id'> | CarouselSlide>(initialSlideState);
    const [slideToDelete, setSlideToDelete] = useState<CarouselSlide | null>(null);
    const isEditing = 'id' in currentSlide;

    // Payment State
    const [upiIdInput, setUpiIdInput] = useState(siteSettings.upiId);
    const [upiMessage, setUpiMessage] = useState('');

    // --- Carousel Functions ---
    const openModal = (slide?: CarouselSlide) => {
        setCurrentSlide(slide || initialSlideState);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSlide(initialSlideState);
    };

    const handleSlideInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentSlide({ ...currentSlide, [name]: value });
    };

    const handleSlideFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const base64 = await toBase64(e.target.files[0]);
            setCurrentSlide({ ...currentSlide, imageUrl: base64 });
        }
    };
    
    const handleCarouselSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentSlide.imageUrl || !currentSlide.headline) {
            alert('Image URL and Headline are required.');
            return;
        }
        if (isEditing) updateCarouselSlide(currentSlide);
        else addCarouselSlide(currentSlide);
        closeModal();
    };
    
    const handleDelete = () => {
        if (slideToDelete) {
            removeCarouselSlide(slideToDelete.id);
            setSlideToDelete(null);
        }
    };

    // --- Branding Functions ---
    const handleBrandingFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
        if (e.target.files && e.target.files[0]) {
            const base64Url = await toBase64(e.target.files[0]);
            if (type === 'logo') updateSiteSettings({ logoUrl: base64Url });
            else updateSiteSettings({ faviconUrl: base64Url });
        }
    };

    // --- Payment Functions ---
    const handleUpiIdSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (upiIdInput.trim() === '') {
            setUpiMessage('UPI ID cannot be empty.');
            return;
        }
        updateSiteSettings({ upiId: upiIdInput.trim() });
        setUpiMessage('UPI ID updated successfully.');
        setTimeout(() => setUpiMessage(''), 3000);
    };

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary text-white transition-colors duration-200";

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Site Customisation</h1>

            <div className="space-y-8">
                {/* Carousel Management */}
                <div className="bg-gray-800 rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Homepage Carousel</h2>
                        <button onClick={() => openModal()} className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-100">
                            Add New Slide
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {carouselSlides.map(slide => (
                            <div key={slide.id} className="bg-gray-700/50 rounded-lg overflow-hidden flex flex-col">
                                <img src={slide.imageUrl} alt={slide.headline} className="w-full h-40 object-cover" />
                                <div className="p-4 flex flex-col flex-grow">
                                    <p className="text-white flex-grow" title={slide.headline}>{slide.headline}</p>
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button onClick={() => openModal(slide)} className="text-sm font-medium text-blue-400 hover:underline">Edit</button>
                                        <button onClick={() => setSlideToDelete(slide)} className="text-sm font-medium text-red-400 hover:underline">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                         {carouselSlides.length === 0 && <p className="md:col-span-3 text-center py-8 text-gray-400">No carousel slides found.</p>}
                    </div>
                </div>

                {/* Branding Management */}
                <div className="bg-gray-800 rounded-lg shadow-md p-8">
                     <h2 className="text-2xl font-semibold mb-6">Branding</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Header Logo</label>
                            <div className="flex items-center space-x-4">
                                <img src={siteSettings.logoUrl} alt="Current logo" className="h-12 w-12 rounded-full bg-gray-700 object-cover" />
                                <input type="file" accept="image/*" onChange={(e) => handleBrandingFileChange(e, 'logo')} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer" />
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Recommended: 40x40px.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">Site Favicon</label>
                            <div className="flex items-center space-x-4">
                                <img src={siteSettings.faviconUrl} alt="Current favicon" className="h-12 w-12 rounded-full bg-gray-700 object-cover" />
                                <input type="file" accept="image/png, image/x-icon, image/svg+xml" onChange={(e) => handleBrandingFileChange(e, 'favicon')} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer" />
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Recommended: 32x32px .ico or .png</p>
                        </div>
                     </div>
                </div>

                {/* Payment Management */}
                <div className="bg-gray-800 rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold mb-6">Payment Settings</h2>
                    <form onSubmit={handleUpiIdSubmit} className="max-w-md">
                        <label htmlFor="upi-id" className="block text-sm font-medium text-gray-200 mb-2">UPI ID for Payments</label>
                        <div className="flex items-center space-x-2">
                            <input type="text" id="upi-id" value={upiIdInput} onChange={(e) => setUpiIdInput(e.target.value)} className={`${inputClasses} flex-grow`} placeholder="your-upi-id@okhdfcbank" />
                            <button type="submit" className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-100">
                                Update
                            </button>
                        </div>
                        {upiMessage && <p className="text-green-400 text-xs mt-2">{upiMessage}</p>}
                    </form>
                </div>
            </div>

            {/* Carousel Add/Edit Modal */}
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 animate-fade-in" onClick={closeModal}>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-6 text-white">{isEditing ? 'Edit Slide' : 'Add New Slide'}</h2>
                        <form onSubmit={handleCarouselSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Image</label>
                                <div className="flex items-center space-x-4">
                                    {currentSlide.imageUrl && <img src={currentSlide.imageUrl} alt="Preview" className="h-16 w-16 rounded-md object-cover bg-gray-700"/>}
                                    <input type="file" accept="image/*" onChange={handleSlideFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200 mb-1">Or enter Image URL</label>
                                <input type="text" id="imageUrl" name="imageUrl" value={currentSlide.imageUrl} onChange={handleSlideInputChange} className={inputClasses} placeholder="https://example.com/image.jpg" required />
                            </div>
                            <div>
                                <label htmlFor="headline" className="block text-sm font-medium text-gray-200 mb-1">Headline</label>
                                <input type="text" id="headline" name="headline" value={currentSlide.headline} onChange={handleSlideInputChange} className={inputClasses} placeholder="Enter a catchy headline" required />
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button type="button" onClick={closeModal} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-100">Cancel</button>
                                <button type="submit" className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-100">{isEditing ? 'Save Changes' : 'Add Slide'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {slideToDelete && (
                 <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSlideToDelete(null)}>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4 text-white">Confirm Deletion</h2>
                        <p className="text-gray-300 mb-6">Are you sure you want to delete this slide?</p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setSlideToDelete(null)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-100">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-100">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCustomisationPage;