import { createSlice } from '@reduxjs/toolkit'
import { SubscriptionPlan } from '../App';

export interface IMainUserSlice {
    mainUserSlice: {
        buttonClicks: number;
        hardinessZone: number;
        location: string;
        temperatureUnit: string;
        isLoggedIn: boolean;
        lastLocation: string;
        lastLocationUnauthenticated: string;
        subscriptionPlan: SubscriptionPlan;
        darkTheme: boolean;
        resetEmail: string;
        hasVerifiedOTP: boolean;
    }
}

export const MainUserSlice = createSlice({
  name: 'mainUserSlice',
  initialState: {
    // Personalization
    darkTheme: true,
    hardinessZone: -1,
    location: "",
    temperatureUnit: "F",
    subscriptionPlan: SubscriptionPlan.Free,

    // Activity
    buttonClicks: 0,  // Used to determine overall activity
    isLoggedIn: false,
    lastLocation: "",
    lastLocationUnauthenticated: "",
    // OTP
    resetEmail: "",
    hasVerifiedOTP: false,
  },
  reducers: {
    incrementUserClick: (state) => {
        state.buttonClicks += 1
    },
    decrementUserClicks: (state) => {
        state.buttonClicks -= 1
    },
    setHardinessZone: (state, action) => {
        state.hardinessZone = action.payload;
    },
    setLocation: (state, action) => {
        state.location = action.payload;
    },
    setTemperatureUnit: (state, action) => {
        state.temperatureUnit = action.payload;
    },
    setLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload;
    },
    setLastLocation: (state, action) => {
        state.lastLocation = action.payload;
    },
    setLastLocationUnauthenticated: (state, action) => {
        state.lastLocationUnauthenticated = action.payload;
    },
    setSubscriptionStatus: (state, action) => {
        state.subscriptionPlan = action.payload;
    },
    setResetEmail: (state, action) => {
        state.resetEmail = action.payload;
    },
    setHasVerifiedOTP: (state, action) => {
        state.hasVerifiedOTP = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { incrementUserClick, decrementUserClicks, setHardinessZone, setLocation, setTemperatureUnit, setLoggedIn, setLastLocation, 
               setLastLocationUnauthenticated, setSubscriptionStatus, setResetEmail, setHasVerifiedOTP } = MainUserSlice.actions

export default MainUserSlice.reducer