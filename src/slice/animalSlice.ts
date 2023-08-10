import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceOAuth } from "../api";
import {
  GET_ALL_ANIMAL,
  GET_ANIMAL_NUMBER_TO_REGISTER,
  GET_ANIMAL_TO_REGISTER,
  LOCAL_STORAGE_TOKEN,
  REGISTER_ANIMAL,
} from "../constants";
import { RootState } from "../store";
import { HomeCount } from "../types";

type RegisterAnimalProps = {
  type: string | number;
  number: string | number;
  partPrice: string;
  token: string;
  desc: string;
};
type AnimalNumberProps = {
  token: string;
  animalId: number;
};

const initialState: HomeCount = {
  allAnimals: [],
  animalsForRegistration: [],
  animalNumberAvailableForRegisteration: [],
  responses: {
    status: "idle",
    message: "",
    tokenValidated: true,
    animalRegistration: false,
  },
};

export const registerAnimal = createAsyncThunk(
  REGISTER_ANIMAL,
  async (data: RegisterAnimalProps) => {
    try {
      const { desc, number, partPrice, type, token } = data;
      const axiosAuth = instanceOAuth(token);
      let response = await axiosAuth.post("/AddAnimal", {
        type: type,
        number: number,
        partPrice: partPrice,
        desc: desc,
      });
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
export const getAnimalNumberAvailableForRegisteration = createAsyncThunk(
  GET_ANIMAL_NUMBER_TO_REGISTER,
  async (data: AnimalNumberProps) => {
    try {
      const axiosAuth = instanceOAuth(data.token);
      let response = await axiosAuth.get(
        "/GetAnimalNumberAvailableForRegisteration",
        {
          params: {
            AnimalId: data.animalId,
          },
        }
      );
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
  reducers: {
    resetAnimalNumberAvailableForRegisteration: (state) => {
      state.animalNumberAvailableForRegisteration = [];
    },
    resetResponse: (state) => {
      state.responses = {
        status: "idle",
        message: "",
        tokenValidated: true,
        animalRegistration: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerAnimal.pending, (state, action) => {
        console.log("pending == ", action);
        state.responses.animalRegistration = false;
        state.responses.status = "PENDING";
      })
      .addCase(registerAnimal.fulfilled, (state: HomeCount, action: any) => {
        if (typeof action.payload === "string") {
          state.responses.message = action.payload;
          state.responses.tokenValidated = false;
        } else if (action.payload.responseCode === 200) {
          state.responses.message = action.payload.data;
          // console.log(action.payload);
          state.responses.animalRegistration = true;
          state.responses.tokenValidated = true;
        } else {
          state.responses.message = `${action.payload.responseMessage}, ${action.payload.errorMessage}`;
          state.responses.tokenValidated = false;
        }
        state.responses.status = "IDLE";
      })
      .addCase(registerAnimal.rejected, (state, action) => {
        state.responses.animalRegistration = false;
        state.responses.status = "ERROR";
      });
    builder
      .addCase(
        getAnimalNumberAvailableForRegisteration.pending,
        (state, action) => {
          console.log("pending == ", action);
          state.responses.status = "PENDING";
        }
      )
      .addCase(
        getAnimalNumberAvailableForRegisteration.fulfilled,
        (state: HomeCount, action: any) => {
          if (typeof action.payload === "string") {
            state.responses.message = action.payload;
            state.responses.tokenValidated = false;
          } else if (action.payload.responseCode === 200) {
            state.animalNumberAvailableForRegisteration = action.payload.data;
            // console.log(action.payload);
            state.responses.tokenValidated = true;
          } else {
            state.responses.message = `${action.payload.responseMessage}, ${action.payload.errorMessage}`;
            state.responses.tokenValidated = false;
          }
          state.responses.status = "IDLE";
        }
      )
      .addCase(
        getAnimalNumberAvailableForRegisteration.rejected,
        (state, action) => {
          state.responses.status = "ERROR";
        }
      );
    builder
      .addCase(getAnimalRegisteration.pending, (state, action) => {
        console.log("pending == ", action);
        state.responses.status = "PENDING";
      })
      .addCase(
        getAnimalRegisteration.fulfilled,
        (state: HomeCount, action: any) => {
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
          state.allAnimals = data;
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
export const { resetAnimalNumberAvailableForRegisteration, resetResponse } =
  animalSlice.actions;

export const selectAnimal = (state: RootState) => state.animal.allAnimals;
export const selectAnimalNumberForReg = (state: RootState) =>
  state.animal.animalNumberAvailableForRegisteration;
export const selectallAnimalsForReg = (state: RootState) =>
  state.animal.animalsForRegistration;
export const selectAnimalResponses = (state: RootState) =>
  state.animal.responses;

export default animalSlice.reducer;
