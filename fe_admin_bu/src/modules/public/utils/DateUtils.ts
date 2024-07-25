export const dateUtils = (srcDate?: string) => {
    let date = new Date();
    if(srcDate){
         date = new Date(srcDate);
    }
    return date.toLocaleDateString('en-US', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
export const getNextDate = (date: Date): Date => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
}
export const toDateString = (date: Date | undefined): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        // Handle invalid date parameter
        return '';
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const countDate = (startDate: string, endDate: string): number => {
    // Parse the dates
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Calculate the difference in milliseconds
    const timeDifference = endDateObj.getTime() - startDateObj.getTime();

    // Convert the difference to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    // Return the total days as an integer
    return Math.abs(Math.round(daysDifference));
}
export const DatePattern = "dd/MM/yyyy";