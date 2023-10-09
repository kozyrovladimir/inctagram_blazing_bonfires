export const processImageFiles = (imageFiles: File[]): Promise<string[]> => {

  // @ts-ignore
  return Promise.all(
    imageFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result); // Возвращает Data URL изображения
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    })
  );
};
