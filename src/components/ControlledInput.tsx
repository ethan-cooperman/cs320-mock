import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * Props for the ControlledInput component.
 */
interface ControlledInputProps {
  // Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
  value: string;
  // This type comes from React+TypeScript. VSCode can suggest these.
  //   Concretely, this means "a function that sets a state containing a string"
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * A controlled input component that wraps an HTML input element.
 * It helps manage and synchronize the input's value with React state.
 *
 * @param {ControlledInputProps} props - The properties for the ControlledInput component.
 * @returns {JSX.Element} - A controlled input element.
 */
export function ControlledInput({
  // Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
