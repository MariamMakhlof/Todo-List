// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

// // Load from and save to localStorage
// const loadFromLocalStorage = () => {
//   const saved = localStorage.getItem("accordions");
//   return saved ? JSON.parse(saved) : [];
// };

// const saveToLocalStorage = (accordions) => {
//   localStorage.setItem("accordions", JSON.stringify(accordions));
// };

// const initialState = {
//   accordions: loadFromLocalStorage(),
// };

// const accordionSlice = createSlice({
//   name: "accordion",
//   initialState,
//   reducers: {
//     addAccordion: (state, action) => {
//       const newAccordion = { id: uuidv4(), title: action.payload.title, todos: [] };
//       state.accordions.push(newAccordion);
//       saveToLocalStorage(state.accordions);
//     },
//     deleteAccordion: (state, action) => {
//       state.accordions = state.accordions.filter((acc) => acc.id !== action.payload);
//       saveToLocalStorage(state.accordions);
//     },
//     editAccordion: (state, action) => {
//       const accordion = state.accordions.find((acc) => acc.id === action.payload.id);
//       if (accordion) {
//         accordion.title = action.payload.title;
//         saveToLocalStorage(state.accordions);
//       }
//     },
//   },
// });

// export const { addAccordion, deleteAccordion, editAccordion } = accordionSlice.actions;
// export default accordionSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Load from and save to localStorage
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem("accordions");
  return saved ? JSON.parse(saved) : [];
};

const saveToLocalStorage = (accordions) => {
  localStorage.setItem("accordions", JSON.stringify(accordions));
};

const initialState = {
  accordions: loadFromLocalStorage(),
};

const accordionSlice = createSlice({
  name: "accordion",
  initialState,
  reducers: {
    addAccordion: (state, action) => {
      const newAccordion = { id: uuidv4(), title: action.payload.title, todos: [] };
      state.accordions.push(newAccordion);
      saveToLocalStorage(state.accordions);
    },
    deleteAccordion: (state, action) => {
      // delete selected IDs in array from storage
      state.accordions = state.accordions.filter((acc) => acc.id !== action.payload);
      saveToLocalStorage(state.accordions);
    },
    editAccordion: (state, action) => {
      // get the id 
      const accordion = state.accordions.find((acc) => acc.id === action.payload.id);
      if (accordion) {
        // true ->  store it's new title 
        accordion.title = action.payload.title;
        saveToLocalStorage(state.accordions);
      }
    },
  },
});

export const { addAccordion, deleteAccordion, editAccordion } = accordionSlice.actions;
export default accordionSlice.reducer;
