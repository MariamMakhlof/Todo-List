import { configureStore } from "@reduxjs/toolkit";
import accordionReducer from '../lib/accordionSlice'
import todoReducer from '../lib/todoSlice'

export const store = configureStore({
    reducer: {
        accordions: accordionReducer,
        todos: todoReducer
    }
})