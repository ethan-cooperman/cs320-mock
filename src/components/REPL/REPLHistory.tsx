import React, { useState } from "react";
import "/src/styles/main.css";
import DataTable from "../DataTable";

/**
 * Props for the REPLHistory component.
 */
interface REPLHistoryProps {
  history: [string, string | string[][], boolean][];
  showVerbose: boolean;
}

/**
 * A component that displays the history of user commands and their responses.
 *
 * @param {REPLHistoryProps} props - The properties for the REPLHistory component.
 * @returns {JSX.Element} - A component displaying the command history.
 */
function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((x: [string, string | string[][], boolean], index) =>
        typeof x[1] === "string" ? (
          props.showVerbose ? (
            <div className="response-box" aria-label={"string verbose" + index} key={index}>
              <div className="command" aria-label={"command" + index}>Command: {x[0]} </div>
              <div className={x[2] ? "success-message" : "error-message"}>
                Output: {x[1]}
              </div>
            </div>
          ) : (
            <div className="response-box" aria-label={"string normal" + index} key={index}>
              <div className={x[2] ? "success-message" : "error-message"}>
                {x[1]}
              </div>
            </div>
          )
        ) : props.showVerbose ? (
          <div className="response-box" aria-label={"datatable" + index} key={index}>
            <div className="command" aria-label={"command" + index}>Command: {x[0]} </div>
            <div className={x[2] ? "success-message" : "error-message"}>
              Output: <DataTable data={x[1]} />
            </div>
          </div>
        ) : (
          <div className="response-box" aria-label={"datatable" + index} key={index}>
            <div className={x[2] ? "success-message" : "error-message"}>
              <DataTable data={x[1]} />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default REPLHistory;
