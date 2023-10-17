import React from "react";
import REPLHistory from "./REPL/REPLHistory";
import "/Users/ethancooperman/Desktop/CS32/Sprints/mock-deployed/src/styles/main.css";
import "/Users/ethancooperman/Desktop/CS32/Sprints/mock-deployed/src/styles/App.css";
import REPL from "./REPL/REPL";
import { useState } from "react";

/**
 * The main application component for the Mock application.
 * This component serves as the entry point for the application and
 * renders the REPL (Read-Eval-Print Loop) component along with a
 * control to toggle between verbose and simple modes.
 */
function App() {
  const [showVerbose, setShowVerbose] = useState<boolean>(false);
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock ({showVerbose ? "Verbose" : "Simple"} Mode)</h1>
      </p>
      <REPL setShowVerbose={setShowVerbose} showVerbose={showVerbose} />
    </div>
  );
}

export default App;
