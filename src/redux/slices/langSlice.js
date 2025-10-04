import { createSlice } from "@reduxjs/toolkit";
import ar from "../../local/ar";
import en from "../../local/en";

const initialState = {
  lang: "en",
  content: en,
};

const langSlice = createSlice({
  name: "mylang",
  initialState: initialState,
  reducers: {
    toggleLang: (state, action) => {
      let newLang = action.payload 
        ? action.payload 
        : state.lang === "en" 
          ? "ar" 
          : "en";

      state.lang = newLang;
      state.content = newLang === "en" ? en : ar;

      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    },
  },
});

export const { toggleLang } = langSlice.actions;
export default langSlice.reducer;
