/**
 * @param {Blob} file
 * @param {function} callback
 */
function readFile(file, callback) {
  let fileReader = new FileReader();
  fileReader.onload = () => callback(JSON.parse(fileReader.result || ''));
  fileReader.readAsText(file);
}

export default readFile;
