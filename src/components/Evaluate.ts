import mockEvaluateLoadCSV from "./mocks/mockEvaluateLoadCSV";
import mockEvaluateViewCSV from "./mocks/mockEvaluateViewCSV";
import mockFilePaths from "./FilePathToData";
import mockEvaluateSearchCSV from "./mocks/mockEvaluateSearchCSV";

/**
 * A type for what a loadCSV success response
 */
type loadCSVSuccess = {
  type: string;
  message: string;
};

/**
 * A type for an error_bad_request responses
 */
type errorBadRequest = {
  type: string;
  message: string;
};

/**
 * A type for what a viewCSV success response
 */
type viewCSVSuccess = {
  type: string;
  message: string[][];
};

/**
 * A type for error_datasource response
 */
type errorDatasource = {
  type: string;
  message: string;
};

/**
 * A type for a searchDataSuccess response
 */
type searchDataSuccess = {
  type: string;
  message: string[][];
};

/**
 * A type for what Evaluate should return (either a string message or data), and a boolean to determine if the reponse is an error or success
 */
export type evaluateReturnType = [string | string[][], boolean];

/**
 * A type for a csvLoader method
 */
export type csvLoader = (filepath: string) => loadCSVSuccess | errorBadRequest;

/**
 * A type for a csvViewer method
 */
export type csvViewer = (
  loadedData: string[][]
) => viewCSVSuccess | errorDatasource;

/**
 * A type for a csvSearchermethod
 */
export type csvSearcher = (
  loadedData: string[][],
  columnNumber: string,
  columnLabel: string,
  target: string
) => errorDatasource | searchDataSuccess | errorBadRequest;

/**
 * This is where to assign the functions to use for loading, viewing, or searching
 */
let csvLoader: csvLoader = mockEvaluateLoadCSV;
let csvViewer: csvViewer = mockEvaluateViewCSV;
let csvSearcher: csvSearcher = mockEvaluateSearchCSV;

/**
 * Initialize a variable for loaded data as undefined
 */
let loadedData: string[][];

/**
 * A function to parse inputs into an array to account for cases when there are spaces in certain labels
 * @param input The string input
 * @returns A String[] representing the input broken up by spaces (unless in quotations)
 */
const parseInput = (input: string): string[] => {
  let returnList: string[] = [];
  let currentWord: string = "";
  let inQuotes: boolean = false;
  for (let i = 0; i < input.length; i++) {
    if (
      input[i] !== '"' &&
      (input[i] !== " " || (input[i] === " " && inQuotes))
    ) {
      currentWord += input[i];
    } else if (input[i] === '"') {
      inQuotes = !inQuotes;
    } else if (input[i] === " " && !inQuotes) {
      returnList.push(currentWord);
      currentWord = "";
    }
  }
  returnList.push(currentWord);
  return returnList;
};

/**
 * A function to return the result of a command and whether the command was successful
 * @param input The input given into the REPL
 * @param showVerbose true if the REPL is in verbose mode, false otherwise
 * @returns The return information of processing the input along with a boolean of whether the command was successful
 */
let evaluate = (input: string, showVerbose: boolean): evaluateReturnType => {
  let splitInput: string[] = parseInput(input);
  console.log(splitInput);
  if (splitInput[0] === "mode" && showVerbose && splitInput.length === 1)
    return ["Mode was changed to brief.", true];
  else if (splitInput[0] === "mode" && splitInput.length === 1)
    return ["Mode was changed to verbose", true];
  else if (splitInput.length === 2 && splitInput[0] === "load_file") {
    if (csvLoader(splitInput[1]).type === "success") {
      loadedData = mockFilePaths[splitInput[1]];
      return [csvLoader(splitInput[1]).message, true];
    } else {
      return [csvLoader(splitInput[1]).message, false];
    }
  } else if (splitInput.length === 1 && splitInput[0] === "view") {
    if (csvViewer(loadedData).type === "success") {
      return [csvViewer(loadedData).message, true];
    } else {
      return [csvViewer(loadedData).message, false];
    }
  } else if (
    splitInput.length === 3 &&
    splitInput[0] === "search" &&
    Number.isNaN(parseInt(splitInput[1]))
  ) {
    if (
      csvSearcher(loadedData, "", splitInput[1], splitInput[2]).type ===
      "success"
    ) {
      return [
        csvSearcher(loadedData, "", splitInput[1], splitInput[2]).message,
        true,
      ];
    } else {
      return [
        csvSearcher(loadedData, "", splitInput[1], splitInput[2]).message,
        false,
      ];
    }
  } else if (splitInput.length === 3 && splitInput[0] === "search") {
    if (
      csvSearcher(loadedData, splitInput[1], "", splitInput[2]).type ===
      "success"
    ) {
      return [
        csvSearcher(loadedData, splitInput[1], "", splitInput[2]).message,
        true,
      ];
    } else {
      return [
        csvSearcher(loadedData, splitInput[1], "", splitInput[2]).message,
        false,
      ];
    }
  } else if (splitInput.length === 2 && splitInput[0] === "search") {
    if (csvSearcher(loadedData, "", "", splitInput[1]).type === "success") {
      return [csvSearcher(loadedData, "", "", splitInput[1]).message, true];
    } else {
      return [csvSearcher(loadedData, "", "", splitInput[1]).message, false];
    }
  }
  return ["Command not found", false];
};

export default evaluate;
