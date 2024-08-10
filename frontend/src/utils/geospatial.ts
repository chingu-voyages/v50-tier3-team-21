// Haversine Distance Function

type Coordinate = number[] | undefined
export const haversineDistance = (coords1: Coordinate, coords2: Coordinate) => {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;

    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
};

interface GeoLocation {
    latitude: number,
    longitude: number
}
// Create Circle GeoJSON
export const createGeoJSONCircle = (center: GeoLocation, radiusInKm: number, points: number = 64) => {
    const coords = {
        latitude: center.latitude,
        longitude: center.longitude
    };

    const km = radiusInKm;

    const ret = [];
    const distanceX = km / (111.32 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    for (let i = 0; i < points; i++) {
        const theta = (i / points) * (2 * Math.PI);
        const x = distanceX * Math.cos(theta);
        const y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [ret]
        }
    };
};

// Layer style
export const layerStyle = {
    id: 'circle-layer',
    type: 'fill',
    paint: {
        'fill-color': '#43ff64',
    }
};

