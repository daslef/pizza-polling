import Pizza from "./Pizza";
import UI from "./UI";

import type { Ingredients } from "../types";


interface IForm {
    ingredients: Ingredients
    setIngredients: React.Dispatch<React.SetStateAction<Ingredients>>
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Form({ ingredients, setIngredients, setShowResult }: IForm) {
    return (
        <div style={{ display: "flex", height: "80vh", alignItems: "center" }}>
            <Pizza ingredients={ingredients} />
            <UI ingredients={ingredients} setIngredients={setIngredients} setShowResult={setShowResult} />
        </div>
    );
}
