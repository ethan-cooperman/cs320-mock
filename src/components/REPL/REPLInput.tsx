import "/Users/ethancooperman/Desktop/CS32/Sprints/mock-deployed/src/styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../ControlledInput";

/**
 * Props for the REPLInput component.
 */
interface REPLInputProps {
  parseInput: (command: string) => void;
}

/**
 * A component that provides an input field for users to enter commands.
 *
 * @param {REPLInputProps} props - The properties for the REPLInput component.
 * @returns {JSX.Element} - A component with an input field and a submit button.
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button
        aria-label={"button"}
        onClick={() => props.parseInput(commandString)}
      >
        Submit
      </button>
    </div>
  );
}
