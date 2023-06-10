export type CoordinateType = {
    id: string;
    targeted: boolean; 
    occupied: boolean;
    isLabel: boolean;
}

export type RowType = CoordinateType[];
