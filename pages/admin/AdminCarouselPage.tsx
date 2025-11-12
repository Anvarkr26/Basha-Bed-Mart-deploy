import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { CarouselSlide } from '../../types';

const initialSlideState: Omit<CarouselSlide, 'id'> = {
    imageUrl: '',
    headline: '',
};

const AdminCarouselPage: React.FC = () => {
    const { carouselSlides, addCarouselSlide, updateCarouselSlide, removeCarouselSlide } = useAppContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState<Omit<CarouselSlide, 'id'> | CarouselSlide>(initialSlideState);
    const [slideToDelete, setSlideToDelete] = useState<CarouselSlide | null>(null);
    
    const isEditing = 'id' in currentSlide;

    const openModal = (slide?: CarouselSlide) => {
        setCurrentSlide(slide || initialSlideState);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSlide(initialSlideState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentSlide({ ...currentSlide, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentSlide.imageUrl || !currentSlide.headline) {
            alert('Image URL and Headline are required.');
            return;
        }

        if (isEditing) {
            updateCarouselSlide(currentSlide);
        } else {
            addCarouselSlide(currentSlide);
        }
        closeModal();
    };
    
    const handleDelete = () => {
        if (slideToDelete) {
            removeCarouselSlide(slideToDelete.id);
            setSlideToDelete(null);
        }
    };

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary text-white";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Carousel</h1>
                <button 
                    onClick={() => openModal()}
                    className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Add New Slide
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carouselSlides.map(slide => (
                    <div key={slide.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
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
                 {carouselSlides.length === 0 && (
                    <div className="md:col-span-2 lg:col-span-3 text-center py-16 bg-gray-800 rounded-lg">
                        <p className="text-gray-400">No carousel slides found. Add one to get started!</p>
                    </div>
                 )}
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in-down" onClick={closeModal}>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-6 text-white">{isEditing ? 'Edit Slide' : 'Add New Slide'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200 mb-1">Image URL</label>
                                <input type="text" id="imageUrl" name="imageUrl" value={currentSlide.imageUrl} onChange={handleInputChange} className={inputClasses} placeholder="https://example.com/image.jpg" required />
                            </div>
                            <div>
                                <label htmlFor="headline" className="block text-sm font-medium text-gray-200 mb-1">Headline</label>
                                <input type="text" id="headline" name="headline" value={currentSlide.headline} onChange={handleInputChange} className={inputClasses} placeholder="Enter a catchy headline" required />
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button type="button" onClick={closeModal} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                                    {isEditing ? 'Save Changes' : 'Add Slide'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {slideToDelete && (
                 <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in-down" onClick={() => setSlideToDelete(null)}>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4 text-white">Confirm Deletion</h2>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete this slide? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setSlideToDelete(null)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCarouselPage;
