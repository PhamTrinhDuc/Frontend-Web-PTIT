
// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const { product, quantity } = action.payload;
//       const index = state.cartItems.findIndex((item) => item.product.id === product.id);
//       if (index === -1) {
//         state.cartItems.push({ product, quantity });
//       } else {
//         state.cartItems[index].quantity += quantity;
//       }
//     },
//     removeFromCart: (state, action) => {
//       const { productId } = action.payload;
//       state.cartItems = state.cartItems.filter((item) => item.product.id !== productId);
//     },
//     updateQuantity: (state, action) => {
//       const { productId, quantity } = action.payload;
//       const index = state.cartItems.findIndex((item) => item.product.id === productId);
//       state.cartItems[index].quantity = quantity;
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//     },
//   }
// })

// export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Danh sách sản phẩm trong giỏ hàng
  },
  reducers: {
    addToCart(state, action) {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.quantity += 1; // Tăng số lượng nếu sản phẩm đã có
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Thêm mới với quantity = 1
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload; // Lấy id và quantity từ payload
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ); // Cập nhật quantity, đảm bảo không nhỏ hơn 1
    },
    removeFromCart(state, action) {
      const id = action.payload; // Lấy id từ payload
      state.items = state.items.filter((item) => item.id !== id); // Xóa sản phẩm có id tương ứng
    },
    clearCart(state) {
      state.items = []; // Xóa toàn bộ giỏ hàng
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;