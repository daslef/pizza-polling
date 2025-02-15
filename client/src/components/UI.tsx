import useStore from '../hooks/useStore'
import assets from '../assets'
import type { Ingredient } from "../types"

export default function UI() {
    const ingredients = {
        basil: 0,
        cheese: 0
    }

    // TODO: state & mutation

    return (
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: "1vmax", justifyContent: "center", height: "100%" }}>
            {Object.keys(ingredients).slice(0, -1).map((ingredient) => (
                <button type="button" className="button button--ingredient" key={`ingridient_${ingredient}_button`} onClick={() => console.log(ingredient as Ingredient)}>
                    <img className="icon button__icon" src={assets.icons[(ingredient as keyof typeof assets.icons)]} />
                </button>
            ))}

            <label className="container-checkbox" aria-label="cheese">
                <img src={assets.cheese} className="button__icon" style={{ opacity: ingredients["cheese"] + 0.4 }} alt="cheese icon" />
                <input
                    type="checkbox"
                    checked={Boolean(ingredients["cheese"])}
                />
            </label>

            <button
                className="button button--submit"
                onClick={() => {
                    console.log('mutate please')
                }}
            >
                ✔️
            </button>
        </div>
    )
}
