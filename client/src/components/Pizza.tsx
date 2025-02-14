import { motion } from "framer-motion";

import assets from "../assets";
import type { Ingredient, Ingredients } from "../types";

interface IPizza {
    ingredients: Ingredients
}

interface IPizzaIngredient {
    ingredient: Ingredient,
    value: number
}


function PizzaIngredient({ ingredient, value }: IPizzaIngredient) {
    const zIndex = ['mushroom', 'tomato', 'olive', 'basil'].includes(ingredient) ? 'z4' : 'z3'

    return (
        <>
            {Array.from({ length: value }, (_, ix) => ix).map(index => (
                <motion.div
                    initial={{ opacity: 0.5, y: 100 }}
                    animate={{
                        opacity: value > 0 ? 1 : 0,
                    }}
                    transition={{ duration: 1 }}
                    className={`ingredients ${zIndex}`}
                    key={`ingridient_${ingredient}_piece_${index}`}
                >
                    <img src={assets[ingredient][index]} alt="Pizza Ingredient" height="100%" width="100%" />
                </motion.div>
            ))}
        </>
    )

}

export default function Pizza({ ingredients }: IPizza) {
    return (
        <div style={{ flex: 1, padding: 40 }}>
            <div style={{ position: "relative" }}>
                {Object.entries(ingredients).slice(0, -1).map(([ingredient, value]) => (
                    <PizzaIngredient ingredient={ingredient as Ingredient} value={value} key={`ingridient_${ingredient}_${value}`} />
                ))}

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                        // opacity: ingredients["cheese"] ? 1 : 0,
                        scale: ingredients["cheese"] ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="cheese z1"
                >
                    <img src={assets.cheese} alt="Cheese" height="100%" width="100%" />
                </motion.div>

                <motion.div transition={{ duration: 1 }} className="">
                    <img src={assets.base} alt="Pizza Base" height="100%" width="100%" />
                </motion.div>
            </div>
        </div>

    )
}