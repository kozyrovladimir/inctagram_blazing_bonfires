/**
 * Рассчитывает ширину и высоту подогнанного изображения в пикселях для заданного изображения и контейнера.
 * @param {number} imageWidth - Ширина изображения в пикселях.
 * @param {number} imageHeight - Высота изображения в пикселях.
 * @param {number} containerWidth - Ширина контейнера в пикселях.
 * @param {number} containerHeight - Высота контейнера в пикселях.
 * @returns {{width: number, height: number}} Объект с шириной и высотой подогнанного изображения в пикселях.
 */
export function calculateImageDimensions(imageWidth: number, imageHeight: number, containerWidth: number, containerHeight: number) {
  // Рассчитываем соотношение сторон изображения
  const imageAspectRatio = imageWidth / imageHeight;

  // Рассчитываем соотношение сторон контейнера
  const containerAspectRatio = containerWidth / containerHeight;

  if (imageAspectRatio < containerAspectRatio) {
    // Если соотношение сторон изображения больше, чем у контейнера,
    // устанавливаем максимальную высоту равную высоте контейнера
    const newHeight = containerHeight;
    const newWidth = containerHeight * imageAspectRatio;
    return { width: newWidth, height: newHeight };
  } else {
    // Иначе, устанавливаем максимальную ширину равную ширине контейнера
    const newWidth = containerWidth;
    const newHeight = containerWidth / imageAspectRatio;
    return { width: newWidth, height: newHeight };
  }
}

