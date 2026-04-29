import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";
import ERPService from "../../services/ERPService";
import BusinessService from "../../services/BusinessService";

export const adminLogin = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.post(`/login`, payload);
      Cookies.set("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyMobileNumber = createAsyncThunk(
  "verifyMobileNumber",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await BusinessService.post(`/verify-mobile`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createBusiness = createAsyncThunk(
  "createBusiness",
  async ({key,formData}, { rejectWithValue }) => {
    try {
      const { data } = await BusinessService.post(`/register/${key}`, formData);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllERP = createAsyncThunk(
  "getAllERP",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await ERPService.get(`/all`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getUserById = createAsyncThunk(
  "getUserById",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.get(`/user-details`);
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
    [adminLogin,getAllERP,verifyMobileNumber,getUserById,createBusiness].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default AuthSlice.reducer;
