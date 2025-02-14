import Pizza from "./Pizza";
import UI from "./UI";

export default function Form() {
    return (
        <div style={{ display: "flex", height: "80vh", alignItems: "center" }}>
            <Pizza />
            <UI />
        </div>
    );
}
