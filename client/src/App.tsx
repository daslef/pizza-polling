import { useState } from 'react';

import Form from './components/Form';
import Results from './components/Results'

import type { Ingredients } from './types';


function App() {
  const [showResult, setShowResult] = useState<boolean>(false)

  const [ingredients, setIngredients] = useState<Ingredients>({
    basil: 0,
    mushroom: 0,
    olive: 0,
    pineapple: 0,
    tomato: 0,
    cheese: 0,
  });

  return (
    <main style={{ maxWidth: 'min(80vmax, 1040px)', margin: "2vmax auto" }}>
      {showResult ? <Results /> :
        <Form
          ingredients={ingredients}
          setIngredients={setIngredients}
          setShowResult={setShowResult}
        />}
    </main>
  )
}

export default App
