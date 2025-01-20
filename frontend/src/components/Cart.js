import React from 'react';
import { useCart } from '../context/CartContext'; // Import the custom hook

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    deleteItem,
    discountCode,
    setDiscountCode,
    discountApplied,
    handleDiscountSubmit,
    calculateTotal,
  } = useCart();

  // Handle increment quantity
  const incrementQuantity = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  // Handle decrement quantity
  const decrementQuantity = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6">
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-start justify-between border-b py-4 space-x-6">
              {/* Image Section */}
              <div className="w-1/5">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                />
              </div>

              {/* Name & Price Section */}
              <div className="flex-1">
                <h2 className="font-semibold text-xl">{item.name}</h2>
                <p className="text-lg font-semibold text-gray-700">₹{item.price}</p>
              </div>

              {/* Quantity & Increment/Decrement Section */}
              <div className="flex items-center space-x-3">
                <button
                  className="border-2 border-gray-400 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200"
                  onClick={() => decrementQuantity(item.id, item.quantity)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-14 text-center border-2 border-gray-400 rounded-md"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                />
                <button
                  className="border-2 border-gray-400 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200"
                  onClick={() => incrementQuantity(item.id, item.quantity)}
                >
                  +
                </button>
              </div>

              {/* Price Section */}
              <div className="w-1/4 text-right">
                <p className="font-semibold text-lg text-gray-700">₹{item.price * item.quantity}</p>
              </div>

              {/* Delete Button Section */}
              <div className="w-1/6 text-right">
                <button
                  className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDiscountSubmit();
        }}
        className="mt-6 flex"
      >
        <input
          type="text"
          placeholder="Discount Code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="border-2 border-gray-400 p-3 flex-1 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="bg-black text-white p-3 rounded-r-md hover:bg-gray-800 transition"
        >
          Apply
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Total: ₹{calculateTotal()}</h2>
        <button className="mt-4 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
