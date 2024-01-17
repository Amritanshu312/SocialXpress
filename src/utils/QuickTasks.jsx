export const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 26)
}

export function PreviewImage(file, callback) {
  var oFReader = new FileReader();

  oFReader.onload = function (oFREvent) {
    var result = oFREvent.target.result;
    callback(result);
  };

  oFReader.readAsDataURL(file);
}

