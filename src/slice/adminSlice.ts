import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, instanceAuth } from "../api";
import { LoginValueState } from "../types";
import { LOCAL_STORAGE_TOKEN, LOGIN_ADMIN_THUNK } from "../constants";
import { RootState } from "../store";
import { toast } from "react-toastify";

type adminState = {
  name: string;
  email: string;
  status: string;
  adminLoginMessage: string;
  loginStatus: boolean;
};

const initialState: adminState = {
  name: "",
  email: "",
  status: "idle",
  loginStatus: false,
  adminLoginMessage: "",
};

export const loginAdmin = createAsyncThunk(
  LOGIN_ADMIN_THUNK,
  async (data: LoginValueState) => {
    try {
      const res = await instanceAuth.post("/Login", {
        Email: data.email,
        Password: data.password,
      });
      return res;
    } catch (ex) {
      return ex;
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    set: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    remove: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state, action) => {
        state.status = "PENDING";
      })
      .addCase(loginAdmin.fulfilled, (state: adminState, action: any) => {
        // state.products = action.payload;
        console.log(state, action);
        if (action.payload.status === 200) {
          state.email = action.payload.data.data.email;
          state.name = action.payload.data.data.name;
          state.adminLoginMessage = "Login Successful";
          state.loginStatus = true;
          localStorage.setItem(
            LOCAL_STORAGE_TOKEN,
            action.payload.data.description
          );
        } else {
          state.adminLoginMessage = `${action.payload.response.data.responseMessage} ${action.payload.response.data.errorMessage}`;
          state.loginStatus = false;
        }
        state.status = "IDLE";
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "ERROR";
      });
  },
});

// Action creators are generated for each case reducer function
export const { set, remove } = adminSlice.actions;

export const selectAdmin = (state: RootState) => state.admin;

export default adminSlice.reducer;
