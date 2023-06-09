export type CoordinateType = {
    x: string;
    y: string | null; 
    id: string;
    targeted: boolean; 
    occupied: boolean;
}

export type RowType = CoordinateType[];
