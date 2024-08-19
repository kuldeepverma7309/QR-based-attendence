import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    records: [],
  },
  reducers: {
    addRecord(state, action) {
      state.records.push(action.payload);
    },
    removeRecord(state, action) {
      state.records = state.records.filter(record => record.id !== action.payload);
    },
  },
});

export const { addRecord, removeRecord } = attendanceSlice.actions;
export default attendanceSlice.reducer;
