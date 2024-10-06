export default function getMinutesDifference(date1: Date, date2: Date): number {
    const millisecondsPerMinute = 1000 * 60;

    // Get the difference in milliseconds
    const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());

    // Convert to minutes
    return Math.floor(diffInMilliseconds / millisecondsPerMinute);
}