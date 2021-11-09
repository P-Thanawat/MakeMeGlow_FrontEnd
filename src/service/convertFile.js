export const toBase64 = (file) =>
  new Promise((reslove, reject) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => reslove(fileReader.result);
    fileReader.onerror = (err) => reject(err);
  });
