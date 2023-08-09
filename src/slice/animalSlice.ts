import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceOAuth } from "../api";
import { GET_ALL_ANIMAL, LOCAL_STORAGE_TOKEN } from "../constants";
import { RootState } from "../store";
import { HomeCount } from "../types";

const initialState: HomeCount = {
  animals: [],
  responses: {
    status: "idle",
    message: "",
    tokenValidated: true,
  },
};

export const getAllAnimals = createAsyncThunk(
  GET_ALL_ANIMAL,
  async (token: string) => {
    try {
      const axiosAuth = instanceOAuth(token);
      let response = await axiosAuth.get("/GetAllAnimals");
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

export const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllAnimals.pending, (state, action) => {
        console.log("pending == ", action);
        state.responses.status = "PENDING";
      })
      .addCase(getAllAnimals.fulfilled, (state: HomeCount, action: any) => {
        console.log(action.payload);
        if (typeof action.payload === "string") {
          state.responses.message = action.payload;
          state.responses.tokenValidated = false;
        } else if (action.payload.responseCode === 200) {
          let label = Object.keys(action.payload.data);
          let quantity: Array<number> = Object.values(action.payload.data);
          let total_quantity = 0;
          let data: [{ label: string; quantity: number }] = [
            {
              label: "total animals".toUpperCase(),
              quantity: 0,
            },
          ];
          for (let i = 0; i < label.length; i++) {
            let obj: { label: string; quantity: number } = {
              label: label[i].toUpperCase(),
              quantity: quantity[i],
            };
            total_quantity += quantity[i];
            data.push(obj);
          }
          data[0].quantity = total_quantity;
          state.animals = data;
          state.responses.tokenValidated = true;
        } else {
          state.responses.message = `${action.payload.responseMessage}, ${action.payload.errorMessage}`;
          state.responses.tokenValidated = false;
        }
        state.responses.status = "IDLE";
      })
      .addCase(getAllAnimals.rejected, (state, action) => {
        state.responses.status = "ERROR";
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = animalSlice.actions;

export const selectAnimal = (state: RootState) => state.animal.animals;
export const selectAnimalResponses = (state: RootState) =>
  state.animal.responses;

export default animalSlice.reducer;
