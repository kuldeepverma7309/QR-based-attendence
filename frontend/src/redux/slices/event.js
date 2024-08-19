import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
  },
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    addEvent(state, action) {
      state.events.push(action.payload);
    },
    removeEvent(state, action) {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, removeEvent } = eventSlice.actions;
export default eventSlice.reducer;
