import { create } from "zustand";
import { devtools } from 'zustand/middleware'

import type { Ingredient, Ingredients } from "../types";

interface StoreState {
    ingredients: Ingredients,
    results: Ingredients | null,
    showResult: boolean,
}

interface StoreActions {
    increment: (ingredient: Ingredient) => void,
    toggle: (ingredient: Ingredient) => void,
    setShowResult: () => void,
    setResults: (results: Ingredients) => void
}

const useStore = create<StoreState & StoreActions>()(
    devtools((set, get) => ({
        ingredients: {
            basil: 0,
            mushroom: 0,
            olive: 0,
            pineapple: 0,
            tomato: 0,
            cheese: 0,
        },
        results: null,
        showResult: false,

        increment: (ingredient: Ingredient) => set((state) => ({ ingredients: { ...state.ingredients, [ingredient]: state.ingredients[ingredient] + 1 } })),
        toggle: (ingredient: Ingredient = "cheese") => set(state => ({ ingredients: { ...state.ingredients, [ingredient]: Number(!state.ingredients[ingredient]) } })),
        setShowResult: () => set({ showResult: true }),
        setResults: (results: Ingredients) => set(() => ({ results }))
    })))

export default useStore