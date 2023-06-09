const X_COORDINATES = ' ABCDEFGHI';
const Y_COORDINATES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const generateRow = (y_coordinate: number) => {
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

export const generateRows = () => {
    let rows = [];
    for (let i = 0; i < Y_COORDINATES.length; i++) {
        rows.push(generateRow(i));
    } 

    return rows;
}