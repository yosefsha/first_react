

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


  return (
    <div className="App">
      <FileUploadComponent uploadToS3={false} />
    </div>
  );
}

export default App; 
