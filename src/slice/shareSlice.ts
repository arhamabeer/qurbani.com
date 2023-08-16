import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instanceOAuth } from "../api";
import {
  CONFIRM_DEAL,
  GET_ANIMAL_NUMBER_AVAILABLE_TO_DEAL,
  GET_ANIMAL_TO_REGISTER,
  GET_DEAL,
  ISSUE_DEAL,
  LOCAL_STORAGE_TOKEN,
} from "../constants";
import { RootState } from "../store";
import { AddShareSliceType, DealingData } from "../types";

type AnimalNumberProps = {
  token: string;
  animalId: number;
};
type IssueDealProps = {
  dealId: number;
  personId: number;
  token: string;
};
type GetDealProps = {
  token: string;
  nic: string;
};
type ConfirmDealingProps = {
  token: string;
  data: DealingData;
};

const initialState: AddShareSliceType = {
  animalNumberAvailableForRegisteration: [],
  animalsForRegistration: [],
  nicData: {
    name: "",
    contact: "",
    emergencyContact: "",
    address: "",
    nic: "",
    adId: 0,
    partId: 0,
    qurbaniDay: 0,
    description: "",
    dealId: 0,
    pickedUp: false,
    personId: 0,
    price: 0,
    finalPrice: 0,
    animalType: "",
    number: 0,
  },
  responses: {
    status: "idle",
    message: "",
    tokenValidated: true,
    shareRegistration: false,
    getNicData: false,
    dealIssued: false,
  },
};

export const issueDealToPerson = createAsyncThunk(
  ISSUE_DEAL,
  async (data: IssueDealProps) => {
    try {
      const axiosAuth = instanceOAuth(data.token);
      let response = await axiosAuth.post("/IssueDealToPerson", data);
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
export const getDealOfPerson = createAsyncThunk(
  GET_DEAL,
  async (datas: GetDealProps) => {
    try {
      let { token, nic } = datas;
      const axiosAuth = instanceOAuth(token);
      let response = await axiosAuth.get("/GetDealOfPerson", {
        params: {
          nic: nic,
        },
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
        getNicData: false,
        dealIssued: false,
      };
    },
    reselAllIssue: (state) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(issueDealToPerson.pending, (state, action) => {
        console.log("pending == ", action);
        state.responses.status = "PENDING";
      })
      .addCase(
        issueDealToPerson.fulfilled,
        (state: AddShareSliceType, action: any) => {
          if (typeof action.payload === "string") {
            state.responses.message = action.payload;
            state.responses.tokenValidated = false;
          } else if (action.payload.responseCode === 200) {
            console.log("payload == ", action.payload);
            state.nicData.pickedUp = true;
            state.responses.dealIssued = true;
            state.responses.message = action.payload.data;
            state.responses.tokenValidated = true;
          } else {
            state.responses.message = `${action.payload.responseMessage}, ${action.payload.errorMessage}`;
            state.responses.tokenValidated = false;
          }
          state.responses.status = "IDLE";
        }
      )
      .addCase(issueDealToPerson.rejected, (state, action) => {
        state.responses.status = "ERROR";
      });
    builder
      .addCase(getDealOfPerson.pending, (state, action) => {
        console.log("pending == ", action);
        state.responses.status = "PENDING";
      })
      .addCase(
        getDealOfPerson.fulfilled,
        (state: AddShareSliceType, action: any) => {
          if (typeof action.payload === "string") {
            state.responses.message = action.payload;
            state.responses.tokenValidated = false;
          } else if (action.payload.responseCode === 200) {
            console.log("payload == ", action.payload);
            state.nicData = action.payload.data;
            state.responses.getNicData = true;
            state.responses.tokenValidated = true;
          } else {
            state.responses.message = `${action.payload.responseMessage}, ${action.payload.errorMessage}`;
            state.responses.tokenValidated = false;
          }
          state.responses.status = "IDLE";
        }
      )
      .addCase(getDealOfPerson.rejected, (state, action) => {
        state.responses.status = "ERROR";
      });
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
export const { resetAvailableAnimals, resetResponse, reselAllIssue } =
  shareSlice.actions;

export const selectAnimalForIssue = (state: RootState) =>
  state.share.animalsForRegistration;
export const selectAnimalNumberForIssue = (state: RootState) =>
  state.share.animalNumberAvailableForRegisteration;
export const selectNicData = (state: RootState) => state.share.nicData;
export const selectIssueResponses = (state: RootState) => state.share.responses;

export default shareSlice.reducer;
