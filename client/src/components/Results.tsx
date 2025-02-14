import Pizza from "./Pizza";
import useSSE from '../hooks/useSSE';
import useStore from "../hooks/useStore";
import type { Ingredients } from "../types";


export default function Results() {
    const { isConnected, value: resultsData } = useSSE<{ results: Ingredients }>("http://localhost:3000/votes");
    const setResults = useStore(store => store.setResults)

    if (!isConnected) return;

    if (resultsData?.results) {
        setResults(resultsData?.results)
    }

    return (
        <div style={{ display: "flex", height: "80vh", alignItems: "center" }}>
            {resultsData && <Pizza />}
        </div>
    );
}
