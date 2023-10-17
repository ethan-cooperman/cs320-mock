import mockFilePaths from "../FilePathToData";
import { csvViewer } from "../Evaluate";

/**
 * A function that mocks viewing CSV data.
 *
 * @param {string[][] | undefined} loadedData - The loaded CSV data to be viewed.
 * @returns {object} - An object representing the result of the mock CSV data viewing.
 *   - If successful and data is available, it returns the data.
 *   - If there are no data or an error occurs, it returns an error message.
 */
let mockEvaluateViewCSV: csvViewer = (loadedData) => {
  if (loadedData !== undefined && loadedData.length > 1) {
    return {
      type: "success",
      message: loadedData,
    };
  } else {
    return {
      type: "error_datasource",
      message: "There is no CSV to be viewed",
    };
  }
};

export default mockEvaluateViewCSV;
