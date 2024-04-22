import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useFlexService } from "./flexstore/flexService";

function App() {
  const { FlexDetector, FlexSender,FlexApi } = useFlexService();
  const [count, setCount] = useState(FlexDetector("count"));

  console.log("count", FlexDetector("ipAddress"));

  useEffect(() => {
    async function api(){

   
  const fetchdata = await FlexApi({
    method : "GET",
    url : "https://api64.ipify.org?format=json",
    contentType : "application/json",
    flexstore : {
      storeaccess : true,
      statename : "IpAddress"
    },
   })

   console.log("fetchdata",fetchdata)

  }
 api()
  },[])

  return (
    <>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            FlexSender("Count", count + 1);
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
