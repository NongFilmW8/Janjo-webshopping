import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // เพิ่มการใช้ Bootstrap

function App() {
  const products = [
    { id: 1, name: 'Cat Condo 1', price: 100 , image: 'logo192.jpg' },
    { id: 2, name: 'Cat Condo 2', price: 150 , image: 'url_to_image1.jpg'},
    { id: 3, name: 'Cat House 1', price: 200 , image: 'url_to_image1.jpg'},
    { id: 4, name: 'Cat House 2', price: 250 , image: 'url_to_image1.jpg'},
    { id: 5, name: 'Luxury Condo', price: 300 , image: 'url_to_image1.jpg'},
    { id: 6, name: 'Modern Condo', price: 350 , image: 'url_to_image1.jpg'},
    { id: 7, name: 'Wooden Cat House', price: 400 , image: 'url_to_image1.jpg'},
    { id: 8, name: 'Steel Cat House', price: 450 , image: 'url_to_image1.jpg'},
    { id: 9, name: 'Outdoor Condo', price: 500 , image: 'url_to_image1.jpg'},
    { id: 10, name: 'Deluxe Cat Condo', price: 600 , image: 'url_to_image1.jpg'},
    { id: 11, name: 'Cat Mansion', price: 7500 , image: 'url_to_image1.jpg'},
    { id: 12, name: 'Rich Cat', price: 10000 , image: 'url_to_image1.jpg'},
  ];

  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [showModal, setShowModal] = useState(false); // สำหรับการแสดง Modal
  const [isConfirmed, setIsConfirmed] = useState(false); // สถานะการยืนยันคำสั่งซื้อ

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleCoupon = () => {
    setCoupon(prompt("Enter Coupon Code: FREEDELIVERY, DISCOUNT10, DISCOUNT20"));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // การคำนวณส่วนลดตามคูปอง
  let discountPercent = 0;
  let shipping = 100; // ตั้งค่าค่าขนส่งเริ่มต้นที่ 100 บาท

  if (coupon === 'DISCOUNT10') {
    discountPercent = 10;
  } else if (coupon === 'DISCOUNT20') {
    discountPercent = 20;
  } else if (coupon === 'FREEDELIVERY') {
    shipping = 0; 
  }

  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalPrice = totalPrice - discountAmount + shipping;

  const confirmOrder = () => {
    setIsConfirmed(true); // ตั้งค่าสถานะการยืนยัน
    setShowModal(false); // ปิด Modal
  };

  const handleConfirmOrder = () => {
    setShowModal(false); // ปิด Modal
    confirmOrder(); // เรียกฟังก์ชันยืนยันคำสั่งซื้อ
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">NongFilm Pet Store</h1>

      {/* แสดงรายการสินค้า */}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image} // แสดงรูปภาพสินค้า
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }} // จัดการขนาดและการแสดงผลรูปภาพ
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: {product.price} THB</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* แสดง Shopping Cart */}
      <div className="mt-4">
        <h2>Shopping Cart</h2>
        {cart.length > 0 ? (
          <ul className="list-group">
            {cart.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                {item.name} - {item.quantity} หลัง
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Your cart is empty</p>
        )}

        {/* คำนวณราคารวม */}
        <div className="mt-3">
          <p>Total Price: {totalPrice} THB</p>
          {discountAmount > 0 && (
            <p className="text-danger">Discount: -{discountAmount.toFixed(2)} THB ({discountPercent}%)</p>
          )}
          <p>Shipping 🏎️ :  {shipping} THB</p>
          {coupon === 'FREEDELIVERY' && (
            <p className="text-danger">Discount: -100 THB (Free Delivery)</p>
          )}
          <button className="btn btn-info mb-2" onClick={handleCoupon}>
            Apply Coupon
          </button>
          <p className="font-weight-bold">Final Price: {finalPrice.toFixed(2)} THB</p>

          {/* ปุ่มยืนยันการสั่งซื้อ */}
          <button className="btn btn-success mt-3" onClick={() => setShowModal(true)}>
            Confirm Order
          </button>
        </div>
      </div>

      {/* Modal สำหรับการยืนยันการสั่งซื้อ */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Order</h5>
              </div>
              <div className="modal-body text-center">
                <p>Are you sure you want to confirm your order?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleConfirmOrder}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal สำหรับแสดง GIF เมื่อยืนยันคำสั่งซื้อ */}
      {isConfirmed && (
        <div className="modal show" style={{ display: 'block' }} onClick={() => setIsConfirmed(false)}>
          <div className="modal-dialog">
            <div className="modal-content text-center">
              <div className="modal-body">
                <img src="https://cdn.dribbble.com/users/282075/screenshots/4756095/media/2c39d98f22740b1094616201a68e7d08.gif" alt="Order Confirmed" style={{ width: '100%', height: '100%' }} />
                <h5>Your order has been confirmed!</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsConfirmed(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
