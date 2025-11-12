import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';

// Icons for payment methods
const CardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const UpiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24"><path fill="#F58220" d="M11.97 10.218h5.992v1.5H11.97z"/><path fill="#005A9F" d="M11.97 12.001h7.427v1.5H11.97z"/><path fill="#00A84F" d="M11.97 13.782h5.992v1.5H11.97z"/><path fill="#F58220" d="M17.962 15.565H11.97v1.5h5.992z" transform="rotate(-180 14.966 16.315)"/><path fill="#005A9F" d="M19.399 13.782H11.97v1.5h7.429z" transform="rotate(-180 15.684 14.532)"/><path fill="#00A84F" d="M17.962 11.999H11.97v1.5h5.992z" transform="rotate(-180 14.966 12.75)"/><g fill="none" stroke="#545454" strokeWidth=".5" strokeMiterlimit="10"><path d="M19.102 7.74H4.898c-.22 0-.398.178-.398.398v7.724c0 .22.178.398.398.398h14.204c.22 0 .398-.178.398-.398V8.138c0-.22-.178-.398-.398-.398z"/><path d="M5.617 7.74v-.718c0-.987.801-1.788 1.788-1.788h9.19c.987 0 1.788.801 1.788 1.788v.718"/></g></svg>;
const NetBankingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01v.01M12 18v-1m0-1v.01M12 20v-1m0-1V18M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

// Specific UPI App Icons
const GooglePayIcon = () => <svg className="w-12 h-auto" viewBox="0 0 52 20"><path fill="#EA4335" d="M10.8 7.3c0-2.1-1.6-3.7-3.7-3.7-2.1 0-3.7 1.6-3.7 3.7 0 2.1 1.6 3.7 3.7 3.7 2.1.1 3.7-1.5 3.7-3.7zm-1.2 0c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5z"/><path fill="#FBBC05" d="M18.1 7.3c0-2.1-1.6-3.7-3.7-3.7-2.1 0-3.7 1.6-3.7 3.7 0 2.1 1.6 3.7 3.7 3.7 2.1.1 3.7-1.5 3.7-3.7zm-1.2 0c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5z"/><path fill="#4285F4" d="M25.7 3.8h-1.1v7.1h1.1c1.8 0 3.2-1.4 3.2-3.2.1-1.8-1.3-3.9-3.2-3.9zm0 5.9h-1.1v-4.7h1.1c1.1 0 1.9.8 1.9 1.9-.1 1.8-1.2 2.8-1.9 2.8z"/><path fill="#34A853" d="M32.8 3.6c-1.9 0-3.4 1.4-3.4 3.6 0 1.9 1.1 3.1 2.5 3.4l2 .7c.6.2 1 .5 1 .9 0 .6-.6 1-1.3 1-.9 0-1.4-.4-1.6-.9l-1.1.5c.3.9 1.2 1.5 2.7 1.5 2 0 3.5-1.3 3.5-3.5 0-2-1.1-3-2.6-3.5l-1.9-.7c-.5-.2-.8-.4-.8-.8s.3-.8 1-.8c.7 0 1.2.3 1.3.8l1.1-.4c-.4-1-1.4-1.5-2.9-1.5z"/><path d="M41.2 7.3c0-2-1.5-3.7-3.6-3.7-2.2 0-3.8 1.7-3.8 3.7 0 2 1.6 3.7 3.7 3.7 1.2 0 2.1-.5 2.7-1.1l-.8-.7c-.4.4-1 .7-1.7.7-1.4 0-2.4-1.1-2.4-2.5s1.1-2.5 2.4-2.5c1.4 0 2.1 1 2.2 1.7h-2.1v1.1h3.4c0-.1.1-1.1.1-1.3zm-3.7-2.4c1.3 0 2.3 1 2.3 2.4s-1 2.4-2.3 2.4-2.3-1-2.3-2.4 1-2.4 2.3-2.4zM42.2 8.7l1.1.4c-.4 1.2-1.5 2.2-3.1 2.2-2.1 0-3.8-1.7-3.8-3.7s1.7-3.7 3.8-3.7c1.8 0 2.9 1 3.4 1.8l-1 .6c-.3-.6-1-1.2-2.3-1.2-1.5 0-2.6 1.1-2.6 2.5s1.1 2.5 2.6 2.5c1.4 0 2.3-1 2.5-1.6zM51.9 3.8h-1.2v9.1h1.2V3.8z" fill="#5F6368"/></svg>;
const PaytmIcon = () => <svg className="w-12 h-auto" viewBox="0 0 64 20"><path d="M12.943 3.64H6.388L0 16.36h6.555zM29.5 3.64h-9.92L13.1 16.36h6.482l1.69-4.14h6.52l-1.77 4.14H36L29.5 3.64zm-5.9 5.8l2.1-5.12 2.1 5.12h-4.2zM43.313 11.2h-3.92V8.16h3.69v-1.9H39.35l-3.21 10.1h6.63v-1.9h-4.32l.66-2.1h3.91v-1.94zm10.744-1.32l-3.41-6.24h-6.83L37.223 16.36h6.63l1.8-4.2h5.81l-1.95 4.2h6.58L64 3.64H57.5l-3.443 6.24z" fill="#00b9f1"></path><path d="M12.943 3.64H6.388L0 16.36h6.555zM29.5 3.64h-9.92L13.1 16.36h6.482l1.69-4.14h6.52l-1.77 4.14H36L29.5 3.64zm-5.9 5.8l2.1-5.12 2.1 5.12h-4.2zM43.313 11.2h-3.92V8.16h3.69v-1.9H39.35l-3.21 10.1h6.63v-1.9h-4.32l.66-2.1h3.91v-1.94zm10.744-1.32l-3.41-6.24h-6.83L37.223 16.36h6.63l1.8-4.2h5.81l-1.95 4.2h6.58L64 3.64H57.5l-3.443 6.24z" fill="#002e6e"></path></svg>;
const PhonePeIcon = () => <svg className="w-12 h-auto" viewBox="0 0 100 25" fill="none"><path d="M79.352 1.455h8.909v22.09h-8.909V1.455zM0 12.5c0-6.102 4.943-11.045 11.045-11.045h15.91C31.545 1.455 35 4.91 35 9.5v6c0 4.59-3.455 8.045-8.045 8.045h-4.864v-5.682h4.546V12.5h-4.546V7.136h-5.68v9.682h10.545c2.148 0 3.864-1.716 3.864-3.864v-6c0-2.147-1.716-3.863-3.864-3.863H11.045c-3.136 0-5.682 2.546-5.682 5.682S7.91 18.182 11.045 18.182h10.228v5.363H11.045C4.943 23.545 0 18.602 0 12.5zM44.023 23.545V1.455h15.59c4.273 0 7.387 3.114 7.387 7.023v1.227c0 2.511-1.227 4.545-3.318 5.682l4.818 8.16h-9.955l-4.136-7.387h-4.728v7.387h-5.68zM55.443 7.136H50v5.682h5.443c1.92 0 3.454-1.557 3.454-3.454s-1.533-3.228-3.454-3.228zM100 12.5c0-6.102-4.943-11.045-11.045-11.045H73.045v22.09h5.682V18.182h10.228c6.102 0 11.045-4.943 11.045-11.364V12.5zm-11.045-5.363c3.136 0 5.682 2.545 5.682 5.681s-2.546 5.682-5.682 5.682H78.727V7.136h10.228z" fill="#5F259F"></path></svg>;


const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, placeOrder, currentUser } = useAppContext();
  const navigate = useNavigate();
  const total = getCartTotal();
  
  const [shippingDetails, setShippingDetails] = useState({
      name: currentUser?.name || '',
      street: currentUser?.addresses?.[0]?.street || '',
      city: currentUser?.addresses?.[0]?.city || '',
      state: currentUser?.addresses?.[0]?.state || '',
      zip: currentUser?.addresses?.[0]?.zip || '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '1234 5678 9101 1121',
    expiry: '12/28',
    cvv: '123'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment'>('details');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };


  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleUpiAppPayment = () => {
    setIsProcessing(true);
    const upiUrl = `upi://pay?pa=rakk1426521@okaxis&pn=Basha%20Bed%20Mart&am=${total}&cu=INR&tn=Order%20from%20Basha%20Bed%20Mart`;
    window.location.href = upiUrl;

    setTimeout(() => {
        const orderId = placeOrder(shippingDetails);
        if (orderId) {
            navigate(`/order-confirmation/${orderId}`);
        } else {
            alert("There was an issue placing your order.");
            setIsProcessing(false);
        }
    }, 6000);
  };


  const handleConfirmAndPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
        const paymentSuccessful = true;
        if (paymentSuccessful) {
            const orderId = placeOrder(shippingDetails);
            if (orderId) {
                navigate(`/order-confirmation/${orderId}`);
            } else {
                alert("There was an issue placing your order. Your cart might be empty or you might not be logged in.");
                setIsProcessing(false);
            }
        } else {
            alert("Payment failed. Please try again.");
            setIsProcessing(false);
        }
    }, 2500);
  };

  if (cart.length === 0) {
      return (
          <div className="container mx-auto text-center py-16">
              <h1 className="text-2xl font-bold">Your cart is empty.</h1>
              <p>You can't proceed to checkout without any items.</p>
          </div>
      )
  }

  const inputClasses = "w-full mt-1 p-3 bg-white text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400";
  const labelClasses = "block text-sm font-medium text-gray-700";

  const PaymentMethodOption: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
    <div
        onClick={() => setPaymentMethod(value)}
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            paymentMethod === value ? 'bg-primary/10 border-primary ring-2 ring-primary' : 'bg-white border-gray-300 hover:bg-gray-50'
        }`}
    >
        <span className="mr-4 text-primary">{icon}</span>
        <span className="font-semibold">{label}</span>
    </div>
  );


  return (
    <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
        <form onSubmit={handleProceedToPayment}>
            <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-md">
                <section style={{ display: step === 'details' ? 'block' : 'none' }}>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Shipping Address</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className={labelClasses}>Full Name</label>
                            <input type="text" id="name" name="name" value={shippingDetails.name} onChange={handleInputChange} className={inputClasses} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                            <label htmlFor="street" className={labelClasses}>Street Address</label>
                            <input type="text" id="street" name="street" value={shippingDetails.street} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                            <div>
                            <label htmlFor="city" className={labelClasses}>City</label>
                            <input type="text" id="city" name="city" value={shippingDetails.city} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                            <label htmlFor="state" className={labelClasses}>State</label>
                            <input type="text" id="state" name="state" value={shippingDetails.state} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                            <div>
                            <label htmlFor="zip" className={labelClasses}>ZIP / Postal Code</label>
                            <input type="text" id="zip" name="zip" value={shippingDetails.zip} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                        </div>
                    </div>
                </section>
                
                <section style={{ display: step === 'payment' ? 'block' : 'none' }}>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Shipping To</h2>
                        <div className="bg-gray-50 p-4 rounded-md text-gray-700">
                            <p className="font-bold">{shippingDetails.name}</p>
                            <p>{shippingDetails.street}</p>
                            <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zip}</p>
                            <button onClick={() => setStep('details')} className="text-sm text-primary hover:underline mt-2">Edit Address</button>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Payment Method</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <PaymentMethodOption value="card" label="Credit/Debit Card" icon={<CardIcon />} />
                        <PaymentMethodOption value="upi" label="UPI" icon={<UpiIcon />} />
                        <PaymentMethodOption value="netbanking" label="Net Banking" icon={<NetBankingIcon />} />
                        <PaymentMethodOption value="wallet" label="Wallets" icon={<WalletIcon />} />
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-lg border">
                        {paymentMethod === 'card' && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="card-number" className={labelClasses}>Card Number</label>
                                    <input type="text" id="card-number" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentInputChange} className={inputClasses} placeholder="xxxx xxxx xxxx xxxx" required/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="expiry" className={labelClasses}>Expiry Date</label>
                                        <input type="text" id="expiry" name="expiry" value={paymentDetails.expiry} onChange={handlePaymentInputChange} className={inputClasses} placeholder="MM / YY" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" className={labelClasses}>CVV</label>
                                        <input type="text" id="cvv" name="cvv" value={paymentDetails.cvv} onChange={handlePaymentInputChange} className={inputClasses} placeholder="123" required/>
                                    </div>
                                </div>
                            </div>
                        )}
                        {paymentMethod === 'upi' && (
                           <div className="text-center flex flex-col items-center">
                                {!isProcessing ? (
                                    <>
                                        <p className="text-gray-700 mb-4">Choose your preferred UPI app to pay.</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mb-6">
                                            {[
                                                { name: 'Google Pay', icon: <GooglePayIcon />, action: handleUpiAppPayment },
                                                { name: 'Paytm', icon: <PaytmIcon />, action: handleUpiAppPayment },
                                                { name: 'PhonePe', icon: <PhonePeIcon />, action: handleUpiAppPayment },
                                            ].map(app => (
                                                <button key={app.name} type="button" onClick={app.action} className="flex flex-col items-center justify-center p-3 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition-all transform hover:scale-105">
                                                    {app.icon}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="text-sm text-gray-500 my-4">OR</div>
                                        <p className="text-gray-700 mb-4">Scan the QR code to pay.</p>
                                        <img 
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=rakk1426521@okaxis&pn=Basha%20Bed%20Mart&am=${total}&cu=INR`}
                                            alt="UPI QR Code"
                                            className="w-48 h-48 rounded-lg shadow-md"
                                        />
                                        <div className="mt-4 bg-white p-3 rounded-md border w-full max-w-sm">
                                            <p className="font-semibold text-gray-800">Pay to UPI ID:</p>
                                            <p className="font-mono text-primary text-lg tracking-wider">rakk1426521@okaxis</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-10">
                                        <svg className="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p className="font-semibold text-primary mt-4">Redirecting to UPI app...</p>
                                        <p className="text-sm text-gray-600">Waiting for payment confirmation. Please complete the payment in your app and you'll be redirected back automatically.</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {paymentMethod === 'netbanking' && (<div className="text-center"><p className="text-gray-700">You will be redirected to your bank's website to complete the payment.</p></div>)}
                        {paymentMethod === 'wallet' && (<div className="text-center"><p className="text-gray-700">You will be redirected to your selected wallet to complete the payment.</p></div>)}
                    </div>
                </section>
            </div>

            <aside className="lg:w-1/3 bg-white p-8 rounded-lg shadow-md self-start">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
                <div className="space-y-3 mb-6">
                    {cart.map(item => (
                        <div key={item.variantId} className="flex justify-between text-sm">
                            <div className='flex-grow pr-4'>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-500 block"> (Qty: {item.quantity})</span>
                            </div>
                            <span className="font-medium flex-shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-2 mb-4 text-gray-700 border-t pt-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-600">FREE</span>
                    </div>
                </div>

                <div className="flex justify-between font-bold text-2xl border-t-2 border-gray-300 pt-4">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>

                {step === 'details' && (
                     <button type="submit" className="w-full mt-6 bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 text-lg transform hover:scale-105">
                        Proceed to Payment
                    </button>
                )}
                
                 {step === 'payment' && paymentMethod !== 'upi' && (
                    <button type="button" onClick={handleConfirmAndPay} disabled={isProcessing} className="w-full mt-6 bg-secondary hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300 text-lg transform hover:scale-105 flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing Payment...
                            </>
                        ) : (
                            `Confirm & Pay ₹${total.toLocaleString()}`
                        )}
                    </button>
                )}

                {step === 'payment' && paymentMethod === 'upi' && (
                    <div className="text-center mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 font-semibold">Please select a UPI app from the payment options to complete your purchase.</p>
                    </div>
                )}
            </aside>
            </div>
        </form>
        </div>
    </div>
  );
};

export default CheckoutPage;