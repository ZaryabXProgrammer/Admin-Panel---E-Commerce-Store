import { createSlice } from "@reduxjs/toolkit";

export const userList = createSlice({
    name: 'users',

    initialState: {
        allUsers : [],
        isFetching: false,
        error: false
        
    },

    reducers: {
//Get Users from Api
        getUsersStart: (state) => {
            state.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.allUsers = action.payload
        },
        getUsersFailure: (state) => {
            state.isFetching = false,
            state.error = true;
        }
    }
})