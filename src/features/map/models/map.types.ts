export interface MapProps {
  center?: [number, number];
  zoom?: number;
}

export interface MapLocation {
  id: string;
  name: string;
  coordinates: [number, number];
}
