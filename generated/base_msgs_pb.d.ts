// package: ars.v1
// file: aps_proto/proto/base_msgs.proto

import * as jspb from "google-protobuf";

export class BasicString extends jspb.Message {
  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BasicString.AsObject;
  static toObject(includeInstance: boolean, msg: BasicString): BasicString.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BasicString, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BasicString;
  static deserializeBinaryFromReader(message: BasicString, reader: jspb.BinaryReader): BasicString;
}

export namespace BasicString {
  export type AsObject = {
    data: string,
  }
}

export class Vec3 extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  getZ(): number;
  setZ(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vec3.AsObject;
  static toObject(includeInstance: boolean, msg: Vec3): Vec3.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Vec3, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Vec3;
  static deserializeBinaryFromReader(message: Vec3, reader: jspb.BinaryReader): Vec3;
}

export namespace Vec3 {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
  }
}

export class Quaternion extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  getZ(): number;
  setZ(value: number): void;

  getW(): number;
  setW(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Quaternion.AsObject;
  static toObject(includeInstance: boolean, msg: Quaternion): Quaternion.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Quaternion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Quaternion;
  static deserializeBinaryFromReader(message: Quaternion, reader: jspb.BinaryReader): Quaternion;
}

export namespace Quaternion {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
    w: number,
  }
}

export class Pose extends jspb.Message {
  hasPosition(): boolean;
  clearPosition(): void;
  getPosition(): Vec3 | undefined;
  setPosition(value?: Vec3): void;

  hasOrientation(): boolean;
  clearOrientation(): void;
  getOrientation(): Quaternion | undefined;
  setOrientation(value?: Quaternion): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Pose.AsObject;
  static toObject(includeInstance: boolean, msg: Pose): Pose.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Pose, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Pose;
  static deserializeBinaryFromReader(message: Pose, reader: jspb.BinaryReader): Pose;
}

export namespace Pose {
  export type AsObject = {
    position?: Vec3.AsObject,
    orientation?: Quaternion.AsObject,
  }
}

export class Twist extends jspb.Message {
  getLinear(): number;
  setLinear(value: number): void;

  getAngular(): number;
  setAngular(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Twist.AsObject;
  static toObject(includeInstance: boolean, msg: Twist): Twist.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Twist, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Twist;
  static deserializeBinaryFromReader(message: Twist, reader: jspb.BinaryReader): Twist;
}

export namespace Twist {
  export type AsObject = {
    linear: number,
    angular: number,
  }
}

export class Header extends jspb.Message {
  getSeq(): number;
  setSeq(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getType(): MessageTypeMap[keyof MessageTypeMap];
  setType(value: MessageTypeMap[keyof MessageTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Header.AsObject;
  static toObject(includeInstance: boolean, msg: Header): Header.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Header, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Header;
  static deserializeBinaryFromReader(message: Header, reader: jspb.BinaryReader): Header;
}

export namespace Header {
  export type AsObject = {
    seq: number,
    timestamp: number,
    type: MessageTypeMap[keyof MessageTypeMap],
  }
}

export class PointCloud extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): Header | undefined;
  setHeader(value?: Header): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PointCloud.AsObject;
  static toObject(includeInstance: boolean, msg: PointCloud): PointCloud.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PointCloud, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PointCloud;
  static deserializeBinaryFromReader(message: PointCloud, reader: jspb.BinaryReader): PointCloud;
}

export namespace PointCloud {
  export type AsObject = {
    header?: Header.AsObject,
    data: Uint8Array | string,
  }
}

export class ImuData extends jspb.Message {
  getAccX(): number;
  setAccX(value: number): void;

  getAccY(): number;
  setAccY(value: number): void;

  getAccZ(): number;
  setAccZ(value: number): void;

  getGyroX(): number;
  setGyroX(value: number): void;

  getGyroY(): number;
  setGyroY(value: number): void;

  getGyroZ(): number;
  setGyroZ(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImuData.AsObject;
  static toObject(includeInstance: boolean, msg: ImuData): ImuData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ImuData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImuData;
  static deserializeBinaryFromReader(message: ImuData, reader: jspb.BinaryReader): ImuData;
}

export namespace ImuData {
  export type AsObject = {
    accX: number,
    accY: number,
    accZ: number,
    gyroX: number,
    gyroY: number,
    gyroZ: number,
  }
}

export class BaseStatus extends jspb.Message {
  getCpuUsage(): number;
  setCpuUsage(value: number): void;

  getMemoryUsage(): number;
  setMemoryUsage(value: number): void;

  getDiskUsage(): number;
  setDiskUsage(value: number): void;

  hasCurrentPose(): boolean;
  clearCurrentPose(): void;
  getCurrentPose(): Pose | undefined;
  setCurrentPose(value?: Pose): void;

  hasCurrentTwist(): boolean;
  clearCurrentTwist(): void;
  getCurrentTwist(): Twist | undefined;
  setCurrentTwist(value?: Twist): void;

  getNavigationStatus(): NavigationStatusMap[keyof NavigationStatusMap];
  setNavigationStatus(value: NavigationStatusMap[keyof NavigationStatusMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BaseStatus.AsObject;
  static toObject(includeInstance: boolean, msg: BaseStatus): BaseStatus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BaseStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BaseStatus;
  static deserializeBinaryFromReader(message: BaseStatus, reader: jspb.BinaryReader): BaseStatus;
}

export namespace BaseStatus {
  export type AsObject = {
    cpuUsage: number,
    memoryUsage: number,
    diskUsage: number,
    currentPose?: Pose.AsObject,
    currentTwist?: Twist.AsObject,
    navigationStatus: NavigationStatusMap[keyof NavigationStatusMap],
  }
}

export class Response extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): Header | undefined;
  setHeader(value?: Header): void;

  getCode(): number;
  setCode(value: number): void;

  getReason(): string;
  setReason(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    header?: Header.AsObject,
    code: number,
    reason: string,
  }
}

export interface MessageTypeMap {
  ACK: 0;
  NOTIFY: 1;
}

export const MessageType: MessageTypeMap;

export interface NavigationStatusMap {
  IDLE: 0;
  MAPPING: 1;
  LOCATION: 2;
}

export const NavigationStatus: NavigationStatusMap;

