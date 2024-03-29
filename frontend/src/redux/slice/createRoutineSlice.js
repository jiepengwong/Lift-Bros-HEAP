import {createSlice} from '@reduxjs/toolkit';

export const createRoutineSlice = createSlice({
    name: 'createRoutine',
    initialState: {
        // Add your initial state here
        routineDetails: {},
    },

    // 
    reducers: {
        setRoutineDetails: (state, action) => {
            state.routineDetails = action.payload;
        }


    },

});

// Export actions
export const {setRoutineDetails} = createRoutineSlice.actions;

export default createRoutineSlice.reducer;