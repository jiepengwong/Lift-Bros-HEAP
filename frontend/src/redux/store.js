import {configureStore} from '@reduxjs/toolkit';
import createRoutineSlice from './slice/createRoutineSlice';
import historySlice from './slice/historySlice';
import loginSlice from './slice/loginSlice';

export default configureStore({
    reducer: {
        // Add your reducers here
        routine: createRoutineSlice,
        history: historySlice,
        login: loginSlice,
    },
});