const getFormattedDate = (date) => {
    return date.toISOString().slice(0,10);
}
export default getFormattedDate;

export const getDateMinusDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days); 
    return result;
};