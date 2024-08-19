import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticating: false,
  user: null, // Ensure user is initialized to null
  allUser:[]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticating = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticating = false;
    },
    setAllUser(state, action){
      state.allUser = action.payload
    }
  },
});

export const { setUser, clearUser,setAllUser } = userSlice.actions;
export default userSlice.reducer;