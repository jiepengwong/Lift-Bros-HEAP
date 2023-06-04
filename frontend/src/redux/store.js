import {configureStore} from '@reduxjs/toolkit';
import {createRoutineSlice} from './slice/createRoutineSlice';

export default configureStore({
    reducer: {
        // Add your reducers here
        routine: createRoutineSlice,
    },
});