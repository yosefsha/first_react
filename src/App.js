

import {
  useState,
  useRef
} from "react";
import "./App.css";
import FileUploadComponent from "./components/FileUploadComponent";

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
    setResult('');
  };

  return (
    <div className="App">
      <div>
        <h1>Simplest Working Calculator</h1>
      </div>
      <FileUploadComponent uploadToS3={false} />
    </div>
  );
}

export default App; 
