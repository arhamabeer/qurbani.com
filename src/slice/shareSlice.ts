import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceOAuth } from "../api";
import {
  CONFIRM_DEAL,
  GET_ANIMAL_NUMBER_AVAILABLE_TO_DEAL,
  GET_ANIMAL_TO_REGISTER,
  LOCAL_STORAGE_TOKEN,
} from "../constants";
import { RootState } from "../store";
import { AddShareSliceType, DealingData } from "../types";

type AnimalNumberProps = {
  token: string;
  animalId: number;
};
type ConfirmDealingProps = {
  token: string;
  data: DealingData;
};

const initialState: AddShareSliceType = {
  animalNumberAvailableForRegisteration: [],
  animalsForRegistration: [],
  responses: {
    status: "idle",
    message: "",
    tokenValidated: true,
    shareRegistration: false,
  },
};

export const confirmDealing = createAsyncThunk(
  CONFIRM_DEAL,
  async (datas: ConfirmDealingProps) => {
    try {
      let { token, data } = datas;
      const axiosAuth = instanceOAuth(token);
      let response = await axiosAuth.post("/ConfirmDealing", data);
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

export const getAnimalNumberAvailableForDealing = createAsyncThunk(
  GET_ANIMAL_NUMBER_AVAILABLE_TO_DEAL,
  async (data: AnimalNumberProps) => {
    try {
      const axiosAuth = instanceOAuth(data.token);
      let response = await axiosAuth.get(
        "/GetAnimalNumberAvailableForDealing",
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
export const shareSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    resetAvailableAnimals: (state) => {
      state.animalNumberAvailableForRegisteration = [];
    },
    resetResponse: (state) => {
      state.responses = {
        status: "idle",
        message: "",
        tokenValidated: true,
        shareRegistration: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(confirmDealing.pending, (state, action) => {
        console.log("pending == ", action);
        state.responses.status = "PENDING";
      })
      .addCase(
        confirmDealing.fulfilled,
        (state: AddShareSliceType, action: any) => {
          if (typeof action.payload === "string") {
            state.responses.message = action.payload;
            state.responses.tokenValidated = false;
          } else if (action.payload.responseCode === 200) {
            console.log("payload == ", action.payload);
            state.responses.message = action.payload.data;
            state.responses.shareRegistration = true;

            state.responses.tokenValidated = true;
          } else {
            state.responses.message = `${action.payload.responseMessage}, ${action.payload.errorMessage}`;
            state.responses.tokenValidated = false;
          }
          state.responses.status = "IDLE";
        }
      )
      .addCase(confirmDealing.rejected, (state, action) => {
        state.responses.status = "ERROR";
      });
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
    builder
      .addCase(getAnimalNumberAvailableForDealing.pending, (state, action) => {
        console.log("pending == ", action);
        state.responses.status = "PENDING";
      })
      .addCase(
        getAnimalNumberAvailableForDealing.fulfilled,
        (state: AddShareSliceType, action: any) => {
          if (typeof action.payload === "string") {
            state.responses.message = action.payload;
            state.responses.tokenValidated = false;
          } else if (action.payload.responseCode === 200) {
            // console.log(action.payload);
            action.payload.data.sort((a: any, b: any) => a.number - b.number);
            state.animalNumberAvailableForRegisteration = action.payload.data;
            state.responses.tokenValidated = true;
          } else {
            state.responses.message = `${action.payload.responseMessage}, ${action.payload.errorMessage}`;
            state.responses.tokenValidated = false;
          }
          state.responses.status = "IDLE";
        }
      )
      .addCase(getAnimalNumberAvailableForDealing.rejected, (state, action) => {
        state.responses.status = "ERROR";
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetAvailableAnimals, resetResponse } = shareSlice.actions;

export const selectAnimalForIssue = (state: RootState) =>
  state.share.animalsForRegistration;
export const selectAnimalNumberForIssue = (state: RootState) =>
  state.share.animalNumberAvailableForRegisteration;
export const selectIssueResponses = (state: RootState) => state.share.responses;

export default shareSlice.reducer;
