// fruits provider function that returns a component that contains the Fruits and FruitsCount components
import React, { useState } from 'react';

import FruitsContext from './FruitsContext';

export default function FruitsProvider({ children }) {
    const initialState = []; //['apple', 'banana', 'cherry'];
    // const { fruits, setFruits } = useContext(FruitsContext);

    const [fruits, setFruits] = useState(initialState);
    console.log('fruits:', fruits);
    console.log('setFruits:', setFruits);
    // const updateFruits = (newItem) => {
    //     setFruits([...fruits, newItem]);

    //     // setFruits((prevValues) => {
    //     //     [
    //     //         ...prevValues,
    //     //         newItem
    //     //     ]
    //     // });
    // };
    const updateFruits = (newItem) => {
        setFruits([...fruits, newItem]);
    };

    return (
        <FruitsContext.Provider value={{
            fruits, setFruits: updateFruits,
            foo: () => console.log('did foooooo'),
            removeItem: (index) => {
                const newFruits = fruits.filter((_, i) => i !== index);
                setFruits(newFruits);
            }
        }}>
            {children}
        </FruitsContext.Provider>
    );
}