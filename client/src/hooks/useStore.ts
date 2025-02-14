import { create } from "zustand";

import type { Ingredient, Ingredients } from "../types";

import { combine } from 'zustand/middleware'

const useStore = create(
    combine({
        ingredients: {
            basil: 0,
            mushroom: 0,
            olive: 0,
            pineapple: 0,
            tomato: 0,
            cheese: 0,
        },
        results: null,
        showResult: false
    }, (set) => ({
        increment: (ingredient: Ingredient) => set((state) => ({ ingredients: { ...state.ingredients, [ingredient]: state.ingredients[ingredient] + 1 } })),
        toggle: (ingredient: Ingredient = "cheese") => set(state => ({ ingredients: { ...state.ingredients, [ingredient]: Number(!state.ingredients[ingredient]) } })),
        setShowResult: () => set({ showResult: true }),
        setResults: (results: Ingredients) => set(() => ({ results }))
    })),
)


export default useStore