import {configureStore} from '@reduxjs/toolkit';
import createRoutineSlice from './slice/createRoutineSlice';
import loginSlice from './slice/loginSlice';
export default configureStore({
    reducer: {
        // Add your reducers here
        routine: createRoutineSlice,
        login: loginSlice,
    },
});