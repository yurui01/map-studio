export interface IFrame {
  id: string;
  timestamp: string;
  px: number;
  py: number;
  pz: number;
  qx: number;
  qy: number;
  qz: number;
  qw: number;
  rx?: number;
  ry?: number;
  rz?: number;
  pointcloud?: {
    positions?: Float32Array | undefined;
    colors?: Uint8Array | undefined;
  };
}