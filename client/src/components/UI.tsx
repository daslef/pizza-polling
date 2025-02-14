import React from 'react'
import { useMutation } from '@tanstack/react-query'

import assets from '../assets'
import type { Ingredient, Ingredients } from "../types"

interface IUI {
    ingredients: Ingredients
    setIngredients: React.Dispatch<React.SetStateAction<Ingredients>>
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>
}

const UI: React.FC<IUI> = ({ ingredients, setIngredients, setShowResult }) => {
    const increment = (ingredient: Ingredient) => {
        setIngredients((state) => ({ ...state, [ingredient]: state[ingredient] + 1 }))
    }

    const mutation = useMutation({
        mutationFn: async () => fetch('http://localhost:3000/vote', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredients),
        }),
        onSuccess: () => {
            setShowResult(true)
        }
    })


    return (
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: "1vmax", justifyContent: "center", height: "100%" }}>
            {Object.keys(ingredients).slice(0, -1).map((ingredient) => (
                <button type="button" className="button button--ingredient" key={`ingridient_${ingredient}_button`} onClick={() => increment(ingredient as Ingredient)}>
                    <img className="icon button__icon" src={assets.icons[(ingredient as keyof typeof assets.icons)]} />
                </button>
            ))}

            <label className="container-checkbox" aria-label="cheese">
                <img src={assets.cheese} className="button__icon" style={{ opacity: ingredients["cheese"] + 0.4 }} alt="cheese icon" />
                <input
                    type="checkbox"
                    checked={Boolean(ingredients["cheese"])}
                    onChange={() =>
                        setIngredients((state) => ({ ...state, cheese: Number(!state.cheese) }))
                    }
                />
            </label>

            <button
                className="button button--submit"
                onClick={() => {
                    console.log(ingredients)
                    mutation.mutate()
                }}
            >
                ✔️
            </button>
        </div>
    )
}

export default UI