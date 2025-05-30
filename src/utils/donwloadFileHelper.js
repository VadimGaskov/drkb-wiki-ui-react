export const downloadFileHelper = (file, fileName) => {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
        // Создаем канвас 64x64
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Отрисовываем картинку на канвасе с масштабированием
        ctx.drawImage(img, 0, 0, 256, 256);

        // Получаем blob из канваса
        canvas.toBlob(resizedBlob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(resizedBlob);
            link.download = `${fileName}.png`;
            link.click();
            URL.revokeObjectURL(link.href);
        }, 'image/png');

        // Освобождаем оригинальный blob
        URL.revokeObjectURL(url);
    };

    img.onerror = () => {
        console.error('Ошибка загрузки изображения');
        URL.revokeObjectURL(url);
    };

    img.src = url;
};