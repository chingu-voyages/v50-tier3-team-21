import { LayerProps } from "react-map-gl";

type Coordinate = [number, number] | [undefined, undefined];

/**
 * Calculates the Haversine distance between two geographic coordinates.
 * @param coords1 - The first set of coordinates.
 * @param coords2 - The second set of coordinates.
 * @returns The distance in kilometers.
 */
export const haversineDistance = (coords1: Coordinate, coords2: Coordinate): number | undefined => {
    if (!coords1 || !coords2) {
        return undefined;
    }


    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;
    if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
        return undefined;
    }

    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1!)) * Math.cos(toRadians(lat2!)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
};

interface GeoLocation {
    latitude: number;
    longitude: number;
}

/**
 * Creates a GeoJSON circle.
 * @param center - The center point of the circle.
 * @param radiusInKm - The radius of the circle in kilometers.
 * @param points - The number of points to define the circle.
 * @returns The GeoJSON object representing the circle.
 */
export const createGeoJSONCircle = (center: GeoLocation, radiusInKm: number, points: number = 64) => {
    const coords = {
        latitude: center.latitude,
        longitude: center.longitude
    };

    const km = radiusInKm;

    const ret: [number, number][] = [];
    const distanceX = km / (111.32 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    for (let i = 0; i < points; i++) {
        const theta = (i / points) * (2 * Math.PI);
        const x = distanceX * Math.cos(theta);
        const y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]); // Close the circle

    return {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [ret]
        }
    };
};

// Layer style
export const layerStyle: LayerProps = {
    id: 'circle-layer',
    type: 'fill',
    paint: {
        'fill-color': 'rgba(67,255,100,0.36)',
    }
};

