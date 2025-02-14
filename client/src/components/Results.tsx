import Pizza from "./Pizza";
import useSSE from '../hooks/useSSE';
import type { Ingredients } from "../types";


export default function Results() {
    const { isConnected, value: resultsData } = useSSE<{ results: Ingredients }>("http://localhost:3000/votes");

    if (!isConnected) return;

    return (
        <div style={{ display: "flex", height: "80vh", alignItems: "center" }}>
            {JSON.stringify(resultsData)}
            {resultsData && <Pizza ingredients={resultsData.results} />}
        </div>
    );
}
