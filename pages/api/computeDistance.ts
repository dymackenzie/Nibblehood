/**
 * @file computeDistance.ts, a TypeScript file that defines a function that computes the distance between two coordinates.
 * 
 * @param coord1 location of first coordinate
 * @param coord2 location of second coordinate
 * @returns distance bewteen both coordinates in kilometers 
 */

export default function computeDistanceInKm(coord1: { latitude: number, longitude: number }, coord2: { latitude: number, longitude: number }) {
    function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRadians = (degree: number) => degree * (Math.PI / 180);

        const R = 6371; // Earth's radius in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    }
    return haversineDistance(coord1.latitude, coord1.longitude, coord2.latitude, coord2.longitude);
}