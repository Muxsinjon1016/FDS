import { loadState, saveState } from "../config/storage";
import { request } from "../config/request";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: loadState("cart") || [],
};

const addToSlice = createSlice({
  name: "addTo",
  initialState,
  reducers: {
    addToList: (state, action) => {
      const itemExists = state.list.some(
        (item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
      );
      if (!itemExists) {
        const newItem = { ...action.payload, amount: 1 };
        state.list.push(newItem);
        saveState("cart", state.list);
        request.post("/cart", newItem);
      } else {
        const item = state.list.find(
          (item) =>
            item.name === action.payload.name &&
            item.price === action.payload.price
        );
        item.amount += 1;
        saveState("cart", state.list);
        request.put(`/cart/${item.id}`, { amount: item.amount });
      }
    },

    addToUserPlus: (state, action) => {
      const item = state.list.find(
        (item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
      );
      if (item) {
        item.amount += 1;
        saveState("cart", state.list);
        request.put(`/cart/${item.id}`, { amount: item.amount }).then(() => {
          saveState("cart", state.list); // Save after successful request
        });
      }
    },

    addToUserMinus: (state, action) => {
      const item = state.list.find(
        (item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
      );
      if (item) {
        if (item.amount > 1) {
          item.amount -= 1;
          saveState("cart", state.list);
          request.put(`/cart/${item.id}`, { amount: item.amount }).then(() => {
            saveState("cart", state.list); // Save after successful request
          });
        } else {
          state.list = state.list.filter(
            (item) =>
              item.name !== action.payload.name ||
              item.price !== action.payload.price
          );
          request.delete(`/cart/${item.id}`).then(() => {
            saveState("cart", state.list); // Save after successful request
          });
        }
      }
    },

    addToRemoveFromCart: (state, action) => {
      const item = state.list.find(
        (item) =>
          item.name === action.payload.name &&
          item.price === action.payload.price
      );

      if (item) {
        request.delete(`/cart/${item.id}`).then((res) => res.data);
        localStorage.removeItem("cart");
      }
    },
  },
});

export const { addToUserMinus, addToUserPlus, addToList, addToRemoveFromCart } =
  addToSlice.actions;
export default addToSlice.reducer;
