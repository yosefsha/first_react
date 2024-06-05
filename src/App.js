/*
import './App.css';
import Heading from './components/Heading';
import FruitsProvider from './components/FruitsProvider';
import Fruits from './components/Fruits';
import Home from './components/Home';
import { Route, Routes, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <FruitsProvider >
        <Router>
          <Heading />
          <nav className='nav'>
            <Link to='/' className='nav-item'>Home</Link>
            <b> | </b>
            <b> | </b>
            <Link to='/fruits' className='nav-item'>Fruits</Link>
            <b> | </b>
          </nav>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/fruits' element={<Fruits />} />
          </Routes>
        </Router>
      </FruitsProvider>

    </div >
  );
}

export default App;
*/


import {
  useState,
  useRef
} from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const [result, setResult] = useState(0);

  function plus(e) {
    console.log('plus e:', e);
    console.log('plus e result:', result);
    console.log('plus e resultRef.current:', resultRef.current);
    console.log('plus e inputRef:', inputRef);
    e.preventDefault();
    setResult((result) => result + Number(inputRef.current.value));
  };

  function minus(e) {
    console.log('plus e:', e);
    // Add the code for the minus function 
    e.preventDefault();
    setResult((result) => result - Number(inputRef.current.value));

  };

  function times(e) {
    e.preventDefault();
    setResult((result) => result * Number(inputRef.current.value));
  };

  function divide(e) {
    e.preventDefault();
    setResult((result) => result / Number(inputRef.current.value));
  };

  function resetInput(e) {
    e.preventDefault();
    inputRef.current.value = '';
  };

  function resetResult(e) {
    e.preventDefault();
    setResult(0);
  };

  return (
    <div className="App">
      <div>
        <h1>Simplest Working Calculator</h1>
      </div>
      <form>
        <p ref={resultRef}>

          Result: {result}
        </p>
        <input
          pattern="[0-9]"
          ref={inputRef}
          type="number"
          placeholder="Type a number"
        />
        <button onClick={plus}>add</button>
        <button onClick={minus}>subtract</button>
        <button onClick={times}>multiply</button>
        <button onClick={divide}>divide</button>
        <button onClick={resetInput}>reset input</button>
        <button onClick={resetResult}>reset result</button>

      </form>
    </div>
  );
}

export default App; 
