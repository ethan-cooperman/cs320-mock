import evaluate from "../Evaluate";
import { csvLoader } from "../Evaluate";
import mockFilePaths from "../FilePathToData";

/**
 * A function that mocks the loading of CSV data from a specified file path.
 *
 * @param {string} filePath - The file path to load CSV data from.
 * @returns {object} - An object representing the result of the mock CSV data loading.
 *   - If the file path is found in `mockFilePaths`, it returns a success message.
 *   - If the file path is not found in `mockFilePaths`, it returns an error message.
 */
let mockEvaluateLoadCSV: csvLoader = (filePath) => {
  if (!(filePath in mockFilePaths)) {
    return {
      type: "error_bad_request",
      message: "Could not find data at path " + filePath,
    };
  }
  return {
    type: "success",
    message: "Data loaded from " + filePath,
  };
};

export default mockEvaluateLoadCSV;