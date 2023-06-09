import { X_COORDINATES, Y_COORDINATES } from "./constants/coordinates";

export const generateRowData = (y_coordinate: number) => {
    let row: string[] = [];
    if (y_coordinate === 0) {
        row = X_COORDINATES.split('');
        return row;
    }

    for (let i = 0; i < X_COORDINATES.length; i++) {
        let coordinate = i === 0 ? `${y_coordinate}` : `${X_COORDINATES[i]}${y_coordinate}`;
        row.push(coordinate);
    }

    return row;
}

export const generateRowsData = () => {
    let rows = [];
    for (let i = 0; i < Y_COORDINATES.length; i++) {
        rows.push(generateRowData(i));
    } 

    return rows;
}

export const generateCoordinates = () => {
    let initialCoordinates = generateRowsData();
    
    return initialCoordinates.map(row => (
        row.map(coordinate => (
            {
                x: coordinate[0],
                y: coordinate[1] ?? null,
                id: coordinate,
                targeted: false,
                occupied: false,
            }
        ))
    ));
}
