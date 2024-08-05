

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



  return (
    <div className="App">
      <FileUploadComponent uploadToS3={false} />
    </div>
  );
}

export default App; 
