import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginUser: { username: "", token: "" },
  },
  reducers: {
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

// Export actions
export const { setLoginUser } = loginSlice.actions;
export default loginSlice.reducer;
