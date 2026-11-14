import { createSlice } from "@reduxjs/toolkit";
import hotels from "../data/hotel";

const hotelSlice = createSlice({
  name: "hotels",
  initialState: hotels,
  reducers: {
    setHotels: (state, action) => {
      return action.payload;
    },
    addHotel: (state, action) => {
      state.push(action.payload);
    },
    updateHotel: (state, action) => {
      const index = state.findIndex((hotel) => hotel.id === action.payload.id);

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteHotel: (state, action) => {
      return state.filter((hotel) => hotel.id !== action.payload);
    },
  },
});

export const { setHotels, addHotel, updateHotel, deleteHotel } =
  hotelSlice.actions;

export default hotelSlice.reducer;
