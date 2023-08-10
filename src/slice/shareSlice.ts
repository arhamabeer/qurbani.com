import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceOAuth } from "../api";
import { GET_ANIMAL_TO_REGISTER, LOCAL_STORAGE_TOKEN } from "../constants";
import { RootState } from "../store";
import { AddShareSliceType } from "../types";

const initialState: AddShareSliceType = {
  animalsForRegistration: [],
  responses: {
    status: "idle",
    message: "",
    tokenValidated: true,
    shareRegistration: false,
  },
};

export const getAnimalRegisteration = createAsyncThunk(
  GET_ANIMAL_TO_REGISTER,
  async (token: string) => {
    try {
      const axiosAuth = instanceOAuth(token);
      let response = await axiosAuth.get("/GetAnimalRegisteration");
      return response.data;
    } catch (err: any) {
      console.log("err ", err);
      if (err.response.status === 401) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        return "Session Expired. Please login again";
      }
      return err.response.data.errorMessage;
    }
  }
);
export const shareSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAnimalRegisteration.pending, (state, action) => {
        console.log("pending == ", action);
        state.responses.status = "PENDING";
      })
      .addCase(
        getAnimalRegisteration.fulfilled,
        (state: AddShareSliceType, action: any) => {
          if (typeof action.payload === "string") {
            state.responses.message = action.payload;
            state.responses.tokenValidated = false;
          } else if (action.payload.responseCode === 200) {
            state.animalsForRegistration = action.payload.data;
            state.responses.tokenValidated = true;
          } else {
            state.responses.message = `${action.payload.responseMessage}, ${action.payload.errorMessage}`;
            state.responses.tokenValidated = false;
          }
          state.responses.status = "IDLE";
        }
      )
      .addCase(getAnimalRegisteration.rejected, (state, action) => {
        state.responses.status = "ERROR";
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = shareSlice.actions;

// export const selectAnimal = (state: RootState) => state.animal.allAnimals;

export default shareSlice.reducer;
