import { useState } from "react";
import "/src/styles/main.css";
import REPLHistory from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import evaluate from "../Evaluate";
import { evaluateReturnType } from "../Evaluate";

/**
 * Props for the REPL component.
 */
interface REPLProps {
  setShowVerbose: (showVerbose: boolean) => void;
  showVerbose: boolean;
}

/**
 * A Read-Eval-Print Loop (REPL) component that allows users to input commands
 * and displays the command history and output.
 *
 * @param {REPLProps} props - The properties for the REPL component.
 * @returns {JSX.Element} - A REPL user interface with input and history display.
 */
export default function REPL(props: REPLProps) {
  const [history, setHistory] = useState<
    [string, string | string[][], boolean][]
  >([]);

  const parseInput = (command: string) => {
    if (command === "mode") props.setShowVerbose(!props.showVerbose);
    let [output, success] = evaluate(command, props.showVerbose);
    setHistory([...history, [command, output, success]]);
  };

  return (
    <div className="repl">
      <REPLHistory history={history} showVerbose={props.showVerbose} />
      <hr></hr>
      <REPLInput parseInput={parseInput} />
    </div>
  );
}
