import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";

export const adminLogin = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.post(`/login`, payload);
      // Cookies.set("technicianId", data.technician._id);
      Cookies.set("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);



const AuthSlice = createSlice({
  name: "authAdmin",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFullFilled = (state, action) => {
      state.loading = false;
      state.admin = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.admin = null;
      state.error = action.payload;
    };
    [adminLogin].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default AuthSlice.reducer;
