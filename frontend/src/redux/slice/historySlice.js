import {createSlice} from '@reduxjs/toolkit';

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        // Add your initial state here
        history: {},
    },

    // 
    reducers: {
        sethistory: (state, action) => {
            state.history = action.payload;
        }


    },

});

// Export actions
export const {sethistory} = historySlice.actions;

export default historySlice.reducer;