/**
 * @file getMinutesDifference.ts, a TypeScript file that defines a function that calculates the difference in minutes between two dates.
 * 
 * @param date1 one of the dates to compare
 * @param date2 another date to compare
 * @returns difference in minutes between the two dates
 */

export default function getMinutesDifference(date1: Date, date2: Date): number {
    const millisecondsPerMinute = 1000 * 60;

    // get the difference in milliseconds
    const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());

    // convert to minutes
    return Math.floor(diffInMilliseconds / millisecondsPerMinute);
}