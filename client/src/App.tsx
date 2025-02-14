import Form from './components/Form';
import Results from './components/Results'

import useStore from './hooks/useStore';

function App() {
  const showResult = useStore((store) => store.showResult)

  return (
    <main style={{ maxWidth: 'min(80vmax, 1040px)', margin: "2vmax auto" }}>
      {showResult ? <Results /> : <Form />}
    </main>
  )
}

export default App
