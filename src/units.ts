// src/units.ts



export type Mesh = {
    vertices: number[];
    triangles: number[];
    normals: number[];
}

export type Transform = {
    x: number;
    y: number;
    z: number;
    x_x: number;
    x_y: number;
    x_z: number;
    scale_x: number;
    scale_y: number;
    scale_z: number;
}

export type Unit = {
    mesh: Mesh;
    transform: Transform;
    type: string;
    id: number;
    buildingID: number;
    level: number;
    phase: number;
    name: string;
    description: string;
    price: number;
    is_available: boolean;
}