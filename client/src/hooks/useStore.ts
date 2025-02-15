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
    devtools((set, get) => ({})))

export default useStore