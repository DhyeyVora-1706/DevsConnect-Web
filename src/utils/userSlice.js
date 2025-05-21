import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUserInfo: (state, action) => {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    removeUserInfo: (state, action) => {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { addUserInfo, removeUserInfo } = userSlice.actions;
