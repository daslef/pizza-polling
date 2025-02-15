import Pizza from "./Pizza";
import useSSE from '../hooks/useSSE';
import useStore from "../hooks/useStore";
import type { Ingredients } from "../types";


export default function Results() {
    // TODO: connect to SSE with <{ results: Ingredients }>
    // TODO: if not connected, show nothing
    // TODO: render value.results

    return (
        <div style={{ display: "flex", height: "80vh", alignItems: "center" }}>
            <Pizza />
        </div>
    );
}
