import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'fa', // 'fa' (Persian) default, 'en' for English
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleLanguage: (state) => {
      state.language = state.language === 'fa' ? 'en' : 'fa';
    },
  },
});

export const { setLanguage, toggleLanguage } = themeSlice.actions;
export default themeSlice.reducer;