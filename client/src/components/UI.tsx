import { useMutation } from '@tanstack/react-query'

import useStore from '../hooks/useStore'
import assets from '../assets'
import type { Ingredient } from "../types"

export default function UI() {
    const increment = useStore(store => store.increment)
    const ingredients = useStore(store => store.ingredients)
    const setShowResult = useStore(store => store.setShowResult)
    const toggle = useStore(store => store.toggle)

    const mutation = useMutation({
        mutationFn: async () => fetch('http://localhost:3000/vote', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredients),
        }),
        onSuccess: () => {
            setShowResult()
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
                    onChange={() => toggle()}
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
