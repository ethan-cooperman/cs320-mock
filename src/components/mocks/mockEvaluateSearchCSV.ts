import mockFilePaths from "../FilePathToData";
import { csvSearcher, csvViewer } from "../Evaluate";

let searchCSVFilepath: string = "dol_ri_earnings_disparity.csv";
let hasLabels: boolean = true;

/**
 * A function that mocks searching for data in a loaded CSV file.
 *
 * @param {string[][] | undefined} loadedData - The loaded CSV data to search within.
 * @param {string} columnNumber - The column number to search (empty string if not used).
 * @param {string} columnLabel - The column label to search (empty string if not used).
 * @param {string} target - The target value to search for.
 * @returns {object} - An object representing the result of the mock CSV search.
 *   - If successful, it returns the matching data.
 *   - If there are no matches or an error occurs, it returns an error message.
 */
let mockEvaluateSearchCSV: csvSearcher = (
  loadedData,
  columnNumber,
  columnLabel,
  target
) => {
  if (loadedData === undefined) {
    return {
      type: "error_datasource",
      message: "There is no CSV to be viewed",
    };
  } else {
    let headers: string[][] = [loadedData[0]];
    let returnList: string[][] = [];
    if (columnNumber !== "") {
      let number: number = parseInt(columnNumber);
      for (let i = 1; i < loadedData.length; i++) {
        if (loadedData[i][number] === target) {
          returnList.push(loadedData[i]);
        }
      }
      if (returnList.length >= 1) {
      return {
        type: "success",
        message: headers.concat(returnList),
      };
    } else {
      return {
          type: "error_bad_request",
          message: "No data was found with those search parameters.",
        };
    }
    } else if (columnLabel !== "") {
      let number: number = -1;
      for (let i = 0; i < loadedData[0].length; i++) {
        if (loadedData[0][i] === columnLabel) {
          number = i;
        }
      }
      if (number === -1) {
        return {
          type: "error_bad_request",
          message:
            "Sorry, could not find label " + columnLabel + " in CSV data.",
        };
      } else {
        for (let i = 1; i < loadedData.length; i++) {
          if (loadedData[i][number] === target) {
            returnList.push(loadedData[i]);
          }
        }
        if (returnList.length >= 1) {
      return {
        type: "success",
        message: headers.concat(returnList),
      };
    } else {
      return {
          type: "error_bad_request",
          message: "No data was found with those search parameters.",
        };
    }
      }
    } else if (target !== "") {
      for (let i = 0; i < loadedData.length; i++) {
        for (let j = 0; j < loadedData[0].length; j++) {
          if (loadedData[i][j] === target) {
            returnList.push(loadedData[i]);
          }
        }
      }
      if (returnList.length >= 1) {
        return {
          type: "success",
          message: headers.concat(returnList),
        };
      } else {
        return {
            type: "error_bad_request",
            message: "No data was found with those search parameters.",
          };
      }
    } else {
      return {
        type: "error_bad_request",
        message:
          "Sorry, no search target was found, or there was an issue reading your input",
      };
    }
  }
};

export default mockEvaluateSearchCSV;
