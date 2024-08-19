import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import eventReducer from './slices/event';
import attendanceReducer from './slices/attendance';

// const rootReducer = combineReducers({
//     user: userReducer,
//     event: eventReducer,
//     attendance: attendanceReducer,
// });


const rootReducer = combineReducers({
  user: userReducer,
  event: eventReducer,
});

const store = configureStore({
    reducer: rootReducer,
  });

export default store;
