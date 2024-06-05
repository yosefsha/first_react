// FruitsCount component that uses the FruitsContext to display the total number of fruits in the list
import FruitsContext from "./FruitsContext";
import { useContext } from "react";

function FruitsCount() {
    const { fruits } = useContext(FruitsContext);
    return <h1>Total fruits: {fruits.length}</h1>;
}

export default FruitsCount;