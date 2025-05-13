export const dateConverter = (jsonDateString) => {
    const date = new Date(jsonDateString);
    if (isNaN(date)) {
        throw new Error("Invalid date format, blyat!");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы с 0 начинаются, сука
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}