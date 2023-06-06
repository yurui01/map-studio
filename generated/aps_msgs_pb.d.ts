// package: aps
// file: aps_proto/proto/aps_msgs.proto

import * as jspb from "google-protobuf";

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

export class ProcessReturn extends jspb.Message {
  getStatus(): ProcessStatusMap[keyof ProcessStatusMap];
  setStatus(value: ProcessStatusMap[keyof ProcessStatusMap]): void;

  getMsg(): string;
  setMsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProcessReturn.AsObject;
  static toObject(includeInstance: boolean, msg: ProcessReturn): ProcessReturn.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProcessReturn, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProcessReturn;
  static deserializeBinaryFromReader(message: ProcessReturn, reader: jspb.BinaryReader): ProcessReturn;
}

export namespace ProcessReturn {
  export type AsObject = {
    status: ProcessStatusMap[keyof ProcessStatusMap],
    msg: string,
  }
}

export class Edge extends jspb.Message {
  getRefScanId(): number;
  setRefScanId(value: number): void;

  getCurScanId(): number;
  setCurScanId(value: number): void;

  getRefScanTime(): number;
  setRefScanTime(value: number): void;

  getCurScanTime(): number;
  setCurScanTime(value: number): void;

  hasInitMatchPq(): boolean;
  clearInitMatchPq(): void;
  getInitMatchPq(): Pose | undefined;
  setInitMatchPq(value?: Pose): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Edge.AsObject;
  static toObject(includeInstance: boolean, msg: Edge): Edge.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Edge, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Edge;
  static deserializeBinaryFromReader(message: Edge, reader: jspb.BinaryReader): Edge;
}

export namespace Edge {
  export type AsObject = {
    refScanId: number,
    curScanId: number,
    refScanTime: number,
    curScanTime: number,
    initMatchPq?: Pose.AsObject,
  }
}

export class apsConvertImportParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  getBagname(): string;
  setBagname(value: string): void;

  getImginfofilename(): string;
  setImginfofilename(value: string): void;

  getCfgname(): string;
  setCfgname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsConvertImportParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsConvertImportParam): apsConvertImportParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsConvertImportParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsConvertImportParam;
  static deserializeBinaryFromReader(message: apsConvertImportParam, reader: jspb.BinaryReader): apsConvertImportParam;
}

export namespace apsConvertImportParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
    bagname: string,
    imginfofilename: string,
    cfgname: string,
  }
}

export class apsConvertExportParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsConvertExportParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsConvertExportParam): apsConvertExportParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsConvertExportParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsConvertExportParam;
  static deserializeBinaryFromReader(message: apsConvertExportParam, reader: jspb.BinaryReader): apsConvertExportParam;
}

export namespace apsConvertExportParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
  }
}

export class apsSaveProjectParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsSaveProjectParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsSaveProjectParam): apsSaveProjectParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsSaveProjectParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsSaveProjectParam;
  static deserializeBinaryFromReader(message: apsSaveProjectParam, reader: jspb.BinaryReader): apsSaveProjectParam;
}

export namespace apsSaveProjectParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
  }
}

export class apsLoopManualSelectParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  getRefScanId(): number;
  setRefScanId(value: number): void;

  getCurScanId(): number;
  setCurScanId(value: number): void;

  getRefScanTime(): number;
  setRefScanTime(value: number): void;

  getCurScanTime(): number;
  setCurScanTime(value: number): void;

  hasProcessReturn(): boolean;
  clearProcessReturn(): void;
  getProcessReturn(): ProcessReturn | undefined;
  setProcessReturn(value?: ProcessReturn): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsLoopManualSelectParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsLoopManualSelectParam): apsLoopManualSelectParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsLoopManualSelectParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsLoopManualSelectParam;
  static deserializeBinaryFromReader(message: apsLoopManualSelectParam, reader: jspb.BinaryReader): apsLoopManualSelectParam;
}

export namespace apsLoopManualSelectParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
    refScanId: number,
    curScanId: number,
    refScanTime: number,
    curScanTime: number,
    processReturn?: ProcessReturn.AsObject,
  }
}

export class apsLoopManualMatchParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  hasEdge(): boolean;
  clearEdge(): void;
  getEdge(): Edge | undefined;
  setEdge(value?: Edge): void;

  hasProcessReturn(): boolean;
  clearProcessReturn(): void;
  getProcessReturn(): ProcessReturn | undefined;
  setProcessReturn(value?: ProcessReturn): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsLoopManualMatchParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsLoopManualMatchParam): apsLoopManualMatchParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsLoopManualMatchParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsLoopManualMatchParam;
  static deserializeBinaryFromReader(message: apsLoopManualMatchParam, reader: jspb.BinaryReader): apsLoopManualMatchParam;
}

export namespace apsLoopManualMatchParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
    edge?: Edge.AsObject,
    processReturn?: ProcessReturn.AsObject,
  }
}

export class apsLoopManualOptimizeParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  getEdgename(): string;
  setEdgename(value: string): void;

  hasProcessReturn(): boolean;
  clearProcessReturn(): void;
  getProcessReturn(): ProcessReturn | undefined;
  setProcessReturn(value?: ProcessReturn): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsLoopManualOptimizeParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsLoopManualOptimizeParam): apsLoopManualOptimizeParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsLoopManualOptimizeParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsLoopManualOptimizeParam;
  static deserializeBinaryFromReader(message: apsLoopManualOptimizeParam, reader: jspb.BinaryReader): apsLoopManualOptimizeParam;
}

export namespace apsLoopManualOptimizeParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
    edgename: string,
    processReturn?: ProcessReturn.AsObject,
  }
}

export class apsLoopAutoSearchParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  getEdgename(): string;
  setEdgename(value: string): void;

  hasProcessReturn(): boolean;
  clearProcessReturn(): void;
  getProcessReturn(): ProcessReturn | undefined;
  setProcessReturn(value?: ProcessReturn): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsLoopAutoSearchParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsLoopAutoSearchParam): apsLoopAutoSearchParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsLoopAutoSearchParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsLoopAutoSearchParam;
  static deserializeBinaryFromReader(message: apsLoopAutoSearchParam, reader: jspb.BinaryReader): apsLoopAutoSearchParam;
}

export namespace apsLoopAutoSearchParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
    edgename: string,
    processReturn?: ProcessReturn.AsObject,
  }
}

export class apsGlobalControlParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  getControlname(): string;
  setControlname(value: string): void;

  hasProcessReturn(): boolean;
  clearProcessReturn(): void;
  getProcessReturn(): ProcessReturn | undefined;
  setProcessReturn(value?: ProcessReturn): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsGlobalControlParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsGlobalControlParam): apsGlobalControlParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsGlobalControlParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsGlobalControlParam;
  static deserializeBinaryFromReader(message: apsGlobalControlParam, reader: jspb.BinaryReader): apsGlobalControlParam;
}

export namespace apsGlobalControlParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
    controlname: string,
    processReturn?: ProcessReturn.AsObject,
  }
}

export class apsGlobalRTKParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  getBagname(): string;
  setBagname(value: string): void;

  getCfgname(): string;
  setCfgname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsGlobalRTKParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsGlobalRTKParam): apsGlobalRTKParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsGlobalRTKParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsGlobalRTKParam;
  static deserializeBinaryFromReader(message: apsGlobalRTKParam, reader: jspb.BinaryReader): apsGlobalRTKParam;
}

export namespace apsGlobalRTKParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
    bagname: string,
    cfgname: string,
  }
}

export class apsColorizeAutoParam extends jspb.Message {
  getDatadir(): string;
  setDatadir(value: string): void;

  getAmapname(): string;
  setAmapname(value: string): void;

  getBagname(): string;
  setBagname(value: string): void;

  getCfgname(): string;
  setCfgname(value: string): void;

  hasProcessReturn(): boolean;
  clearProcessReturn(): void;
  getProcessReturn(): ProcessReturn | undefined;
  setProcessReturn(value?: ProcessReturn): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsColorizeAutoParam.AsObject;
  static toObject(includeInstance: boolean, msg: apsColorizeAutoParam): apsColorizeAutoParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsColorizeAutoParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsColorizeAutoParam;
  static deserializeBinaryFromReader(message: apsColorizeAutoParam, reader: jspb.BinaryReader): apsColorizeAutoParam;
}

export namespace apsColorizeAutoParam {
  export type AsObject = {
    datadir: string,
    amapname: string,
    bagname: string,
    cfgname: string,
    processReturn?: ProcessReturn.AsObject,
  }
}

export class apsFullMsg extends jspb.Message {
  getTopicName(): string;
  setTopicName(value: string): void;

  getTopicType(): MessageTypeMap[keyof MessageTypeMap];
  setTopicType(value: MessageTypeMap[keyof MessageTypeMap]): void;

  hasConvertImportParam(): boolean;
  clearConvertImportParam(): void;
  getConvertImportParam(): apsConvertImportParam | undefined;
  setConvertImportParam(value?: apsConvertImportParam): void;

  hasConvertExportParam(): boolean;
  clearConvertExportParam(): void;
  getConvertExportParam(): apsConvertExportParam | undefined;
  setConvertExportParam(value?: apsConvertExportParam): void;

  hasSavePrjectParam(): boolean;
  clearSavePrjectParam(): void;
  getSavePrjectParam(): apsSaveProjectParam | undefined;
  setSavePrjectParam(value?: apsSaveProjectParam): void;

  hasLoopManualSelectParam(): boolean;
  clearLoopManualSelectParam(): void;
  getLoopManualSelectParam(): apsLoopManualSelectParam | undefined;
  setLoopManualSelectParam(value?: apsLoopManualSelectParam): void;

  hasLoopManualMatchParam(): boolean;
  clearLoopManualMatchParam(): void;
  getLoopManualMatchParam(): apsLoopManualMatchParam | undefined;
  setLoopManualMatchParam(value?: apsLoopManualMatchParam): void;

  hasLoopManualOptimizeParam(): boolean;
  clearLoopManualOptimizeParam(): void;
  getLoopManualOptimizeParam(): apsLoopManualOptimizeParam | undefined;
  setLoopManualOptimizeParam(value?: apsLoopManualOptimizeParam): void;

  hasLoopAutoSearchParam(): boolean;
  clearLoopAutoSearchParam(): void;
  getLoopAutoSearchParam(): apsLoopAutoSearchParam | undefined;
  setLoopAutoSearchParam(value?: apsLoopAutoSearchParam): void;

  hasGlobalControlParam(): boolean;
  clearGlobalControlParam(): void;
  getGlobalControlParam(): apsGlobalControlParam | undefined;
  setGlobalControlParam(value?: apsGlobalControlParam): void;

  hasGlobalRtkParam(): boolean;
  clearGlobalRtkParam(): void;
  getGlobalRtkParam(): apsGlobalRTKParam | undefined;
  setGlobalRtkParam(value?: apsGlobalRTKParam): void;

  hasColorizeAutoParam(): boolean;
  clearColorizeAutoParam(): void;
  getColorizeAutoParam(): apsColorizeAutoParam | undefined;
  setColorizeAutoParam(value?: apsColorizeAutoParam): void;

  hasProcessStatus(): boolean;
  clearProcessStatus(): void;
  getProcessStatus(): string;
  setProcessStatus(value: string): void;

  hasProcessRatio(): boolean;
  clearProcessRatio(): void;
  getProcessRatio(): number;
  setProcessRatio(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): apsFullMsg.AsObject;
  static toObject(includeInstance: boolean, msg: apsFullMsg): apsFullMsg.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: apsFullMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): apsFullMsg;
  static deserializeBinaryFromReader(message: apsFullMsg, reader: jspb.BinaryReader): apsFullMsg;
}

export namespace apsFullMsg {
  export type AsObject = {
    topicName: string,
    topicType: MessageTypeMap[keyof MessageTypeMap],
    convertImportParam?: apsConvertImportParam.AsObject,
    convertExportParam?: apsConvertExportParam.AsObject,
    savePrjectParam?: apsSaveProjectParam.AsObject,
    loopManualSelectParam?: apsLoopManualSelectParam.AsObject,
    loopManualMatchParam?: apsLoopManualMatchParam.AsObject,
    loopManualOptimizeParam?: apsLoopManualOptimizeParam.AsObject,
    loopAutoSearchParam?: apsLoopAutoSearchParam.AsObject,
    globalControlParam?: apsGlobalControlParam.AsObject,
    globalRtkParam?: apsGlobalRTKParam.AsObject,
    colorizeAutoParam?: apsColorizeAutoParam.AsObject,
    processStatus: string,
    processRatio: number,
  }
}

export interface MessageTypeMap {
  SET: 0;
  ACK: 1;
}

export const MessageType: MessageTypeMap;

export interface ProcessStatusMap {
  SUCCESS: 0;
  FAILED: 1;
}

export const ProcessStatus: ProcessStatusMap;

