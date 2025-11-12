import { Product, User, Order, CartItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Royal Silk Cotton Mattress',
    shortDescription: 'Experience unparalleled comfort and luxury.',
    description: 'Our flagship mattress, made from 100% natural silk cotton (Ilavam Panju). Provides excellent spinal support and regulates temperature for a cool, restful sleep. Hypoallergenic and durable.',
    price: 15000,
    imageUrl: 'https://picsum.photos/seed/mattress1/800/600',
    category: 'Mattress',
    material: 'Natural Silk Cotton',
    rating: 4.8,
    isFeatured: true,
    variants: [
      { id: 101, size: 'Single', clothMaterial: 'Premium Damask Fabric', weight: 20, thickness: 6, price: 15000, stock: 25 },
      { id: 102, size: 'Queen', clothMaterial: 'Premium Damask Fabric', weight: 25, thickness: 6, price: 18000, stock: 20 },
      { id: 103, size: 'King', clothMaterial: 'Premium Damask Fabric', weight: 30, thickness: 8, price: 22000, stock: 15 },
      { id: 104, size: 'Queen', clothMaterial: 'Organic Cotton', weight: 26, thickness: 6, price: 19500, stock: 18 },
    ],
  },
  {
    id: 2,
    name: 'Plush Silk Cotton Pillow',
    shortDescription: 'The perfect companion for a good night\'s sleep.',
    description: 'Soft yet supportive, our silk cotton pillows cradle your head and neck perfectly. They are breathable and resistant to dust mites, making them ideal for sensitive sleepers.',
    price: 1200,
    imageUrl: 'https://picsum.photos/seed/pillow1/800/600',
    category: 'Pillow',
    material: 'Natural Silk Cotton',
    rating: 4.9,
    isFeatured: true,
    variants: [
        { id: 201, size: 'Standard', clothMaterial: 'Soft Cotton Casing', weight: 1.5, thickness: 5, price: 1200, stock: 150 },
        { id: 202, size: 'King', clothMaterial: 'Soft Cotton Casing', weight: 2, thickness: 5, price: 1500, stock: 100 },
    ]
  },
  {
    id: 3,
    name: 'Elegant Jacquard Sofa Cover',
    shortDescription: 'Protect and beautify your sofa.',
    description: 'Crafted from high-quality Jacquard fabric, this sofa cover adds a touch of elegance to your living room while protecting your furniture from spills and wear.',
    price: 3500,
    imageUrl: 'https://picsum.photos/seed/sofa1/800/600',
    category: 'Sofa Covers',
    material: 'Jacquard Fabric',
    rating: 4.5,
    isFeatured: true,
    variants: [
        { id: 301, size: '1-Seater', clothMaterial: 'Jacquard', weight: 2.5, thickness: 0.2, price: 3500, stock: 40 },
        { id: 302, size: '2-Seater', clothMaterial: 'Jacquard', weight: 3.5, thickness: 0.2, price: 4500, stock: 30 },
        { id: 303, size: '3-Seater', clothMaterial: 'Jacquard', weight: 4.5, thickness: 0.2, price: 5500, stock: 25 },
    ]
  },
  {
    id: 4,
    name: 'Ortho-Support Foam Mattress',
    shortDescription: 'Engineered for superior back support.',
    description: 'This multi-layered foam mattress is designed to alleviate pressure points and provide optimal support for your spine. A great choice for those with back pain.',
    price: 12500,
    imageUrl: 'https://picsum.photos/seed/mattress2/800/600',
    category: 'Mattress',
    material: 'High-Density Foam',
    rating: 4.7,
    variants: [
      { id: 401, size: 'Single', clothMaterial: 'Breathable Knit Fabric', weight: 22, thickness: 8, price: 12500, stock: 30 },
      { id: 402, size: 'Queen', clothMaterial: 'Breathable Knit Fabric', weight: 28, thickness: 8, price: 15500, stock: 25 },
      { id: 403, size: 'King', clothMaterial: 'Breathable Knit Fabric', weight: 35, thickness: 8, price: 19500, stock: 20 },
    ],
  },
   {
    id: 5,
    name: 'Classic Cotton Bed Sheet Set',
    shortDescription: 'Soft, breathable, and timeless.',
    description: 'Made from 100% pure cotton, this bed sheet set is incredibly soft and gets even softer with every wash. Includes one flat sheet, one fitted sheet, and two pillowcases.',
    price: 2500,
    imageUrl: 'https://picsum.photos/seed/bedsheet1/800/600',
    category: 'Bedding',
    material: 'Cotton',
    rating: 4.6,
    isFeatured: true,
    variants: [
        { id: 501, size: 'Queen', clothMaterial: '100% Pure Cotton', weight: 1.2, thickness: 0.1, price: 2500, stock: 80 },
        { id: 502, size: 'King', clothMaterial: '100% Pure Cotton', weight: 1.5, thickness: 0.1, price: 2800, stock: 60 },
    ],
  },
  {
    id: 6,
    name: 'Memory Foam Contour Pillow',
    shortDescription: 'Adapts to your unique shape for custom support.',
    description: 'Designed to ergonomically support your neck and head, this memory foam pillow helps reduce neck pain and stiffness for a more comfortable sleep.',
    price: 1800,
    imageUrl: 'https://picsum.photos/seed/pillow2/800/600',
    category: 'Pillow',
    material: 'Memory Foam',
    rating: 4.8,
    variants: [
        { id: 601, size: 'Standard', clothMaterial: 'Hypoallergenic Bamboo Cover', weight: 1.8, thickness: 4, price: 1800, stock: 120 },
    ]
  },
];


export const USERS: User[] = [
  {
    id: 1,
    name: 'Suresh Kumar',
    email: 'suresh.kumar@example.com',
    password: 'password123',
    addresses: [
      { id: 1, street: '123 Silk Road', city: 'Chennai', state: 'Tamil Nadu', zip: '600001', isDefault: true },
    ],
  },
  {
    id: 2,
    name: 'Anwar Basha',
    email: 'mypostbox2004@gmail.com',
    password: 'Anvar@26',
    addresses: [
      { id: 2, street: '456 Weavers Lane', city: 'Puducherry', state: 'Puducherry', zip: '605001', isDefault: true },
    ],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    password: 'password456',
    addresses: [
      { id: 3, street: '456 Weavers Lane', city: 'Puducherry', state: 'Puducherry', zip: '605001', isDefault: true },
    ],
  },
];


export const ORDERS: Order[] = [
  {
    id: 'ORD-224276',
    userId: 1,
    date: '2023-10-29',
    items: [{ productId: 3, variantId: 303, name: 'Elegant Jacquard Sofa Cover', imageUrl: 'https://picsum.photos/seed/sofa1/800/600', quantity: 1, variantDescription: '3-Seater / Jacquard', price: 5500 }],
    total: 5500,
    status: 'Processing',
    shippingAddress: { name: USERS[0].name, street: USERS[0].addresses[0].street, city: USERS[0].addresses[0].city, state: USERS[0].addresses[0].state, zip: USERS[0].addresses[0].zip },
  },
  {
    id: 'ORD-174276',
    userId: 2,
    date: '2023-10-28',
    items: [{ productId: 2, variantId: 201, name: 'Plush Silk Cotton Pillow', imageUrl: 'https://picsum.photos/seed/pillow1/800/600', quantity: 2, variantDescription: 'Standard / Soft Cotton Casing', price: 1200 }],
    total: 2400,
    status: 'Shipped',
    shippingAddress: { name: USERS[1].name, street: USERS[1].addresses[0].street, city: USERS[1].addresses[0].city, state: USERS[1].addresses[0].state, zip: USERS[1].addresses[0].zip },
  },
  {
    id: 'ORD-074276',
    userId: 1,
    date: '2023-10-26',
    items: [{ productId: 1, variantId: 102, name: 'Royal Silk Cotton Mattress', imageUrl: 'https://picsum.photos/seed/mattress1/800/600', quantity: 1, variantDescription: 'Queen / Premium Damask Fabric', price: 18000 }],
    total: 18000,
    status: 'Delivered',
    shippingAddress: { name: USERS[0].name, street: USERS[0].addresses[0].street, city: USERS[0].addresses[0].city, state: USERS[0].addresses[0].state, zip: USERS[0].addresses[0].zip },
  },
];