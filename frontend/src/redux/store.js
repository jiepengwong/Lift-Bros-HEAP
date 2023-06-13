import {configureStore} from '@reduxjs/toolkit';
import createRoutineSlice from './slice/createRoutineSlice';
import historySlice from './slice/historySlice';

export default configureStore({
    reducer: {
        // Add your reducers here
        routine: createRoutineSlice,
        history: historySlice
    },
});