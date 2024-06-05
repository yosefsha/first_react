// Fruits component that uses the FruitsContext to manage the state of the fruits list
import FruitsCount from './FruitsCount';
import FruitsContext from "./FruitsContext";
import { useContext } from "react";
import image1 from '../assets/f1.jpeg';
export default function Fruits() {
    const { fruits, setFruits, foo, removeItem } = useContext(FruitsContext);
    const fruitslist = ['apple', 'banana', 'cherry', 'pear'];

    // get rundom item from fruitslist
    const getRandomFruit = () => {
        const randomIndex = Math.floor(Math.random() * fruitslist.length);
        return fruitslist[randomIndex];
    };

    const onAddFruit = () => {
        setFruits(getRandomFruit());
    };

    const onRemoveFruit = () => {
        console.log('foo:', foo);
        console.log('fruits:', fruits);
        foo();
        removeItem(fruits.length - 1);
    };

    return (
        <div>
            <h1>My favorite fruits</h1>
            <img src={image1} height={100} alt='fruits' />
            <ul>
                {fruits.map(fruit => (
                    <li >{fruit}</li>
                ))}
            </ul>

            <button onClick={onAddFruit}>Add fruit</button>
            <button onClick={onRemoveFruit}>Remove fruit</button>
            <FruitsCount />
        </div>
    );
}