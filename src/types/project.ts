export interface IPose {
  id: string;
  timestamp: string;
  position: [number, number, number];
  orientation: [number, number, number, number];
}

export interface IProject {
  name: string
  path: string
  amap: string
  footprint: IPose[]
  video: string
  pointcloud: string
}
