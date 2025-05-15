export const downloadFileHelper = (file, fileName) => {
    const base64Data = atob(file);
    if (!base64Data) return;

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.png`; // Default name, user can change it

    // Trigger file save dialog
    link.click();

    // Cleanup
    URL.revokeObjectURL(link.href);
}