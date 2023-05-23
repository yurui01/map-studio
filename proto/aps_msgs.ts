/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "aps";

export enum MessageType {
  /** SET - js发送-c++接收 */
  SET = 0,
  /** ACK - c++发送-js接收 */
  ACK = 1,
  UNRECOGNIZED = -1,
}

export function messageTypeFromJSON(object: any): MessageType {
  switch (object) {
    case 0:
    case "SET":
      return MessageType.SET;
    case 1:
    case "ACK":
      return MessageType.ACK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageType.UNRECOGNIZED;
  }
}

export function messageTypeToJSON(object: MessageType): string {
  switch (object) {
    case MessageType.SET:
      return "SET";
    case MessageType.ACK:
      return "ACK";
    case MessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ProcessStatus {
  /** SUCCESS - 处理成功 */
  SUCCESS = 0,
  /** FAILED - 处理失败 */
  FAILED = 1,
  UNRECOGNIZED = -1,
}

export function processStatusFromJSON(object: any): ProcessStatus {
  switch (object) {
    case 0:
    case "SUCCESS":
      return ProcessStatus.SUCCESS;
    case 1:
    case "FAILED":
      return ProcessStatus.FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProcessStatus.UNRECOGNIZED;
  }
}

export function processStatusToJSON(object: ProcessStatus): string {
  switch (object) {
    case ProcessStatus.SUCCESS:
      return "SUCCESS";
    case ProcessStatus.FAILED:
      return "FAILED";
    case ProcessStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** 三维向量 */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** 四元数 */
export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

/** 位姿 */
export interface Pose {
  /** 位置 */
  position:
    | Vec3
    | undefined;
  /** 姿态 */
  orientation: Quaternion | undefined;
}

/** 处理反馈 */
export interface ProcessReturn {
  /** 状态 */
  status: ProcessStatus;
  /** 消息，如果失败，返回失败消息 */
  msg: string;
}

/** 边 */
export interface Edge {
  refScanId: number;
  curScanId: number;
  refScanTime: number;
  curScanTime: number;
  initMatchPq: Pose | undefined;
}

export interface apsConvertImportParam {
  dataDir: string;
  amapName: string;
  bagName: string;
  imgInfoFileName: string;
  cfgName: string;
}

export interface apsConvertExportParam {
  dataDir: string;
  amapName: string;
}

export interface apsSaveProjectParam {
  dataDir: string;
  amapName: string;
}

export interface apsLoopManualSelectParam {
  dataDir: string;
  amapName: string;
  refScanId: number;
  curScanId: number;
  refScanTime: number;
  curScanTime: number;
  processReturn: ProcessReturn | undefined;
}

export interface apsLoopManualMatchParam {
  dataDir: string;
  amapName: string;
  edge: Edge | undefined;
  processReturn: ProcessReturn | undefined;
}

export interface apsLoopManualOptimizeParam {
  dataDir: string;
  amapName: string;
  edgeName: string;
  processReturn: ProcessReturn | undefined;
}

export interface apsLoopAutoSearchParam {
  dataDir: string;
  amapName: string;
  edgeName: string;
  processReturn: ProcessReturn | undefined;
}

export interface apsGlobalControlParam {
  dataDir: string;
  amapName: string;
  controlName: string;
  processReturn: ProcessReturn | undefined;
}

export interface apsGlobalRTKParam {
  dataDir: string;
  amapName: string;
  bagName: string;
  cfgName: string;
}

export interface apsColorizeAutoParam {
  dataDir: string;
  amapName: string;
  bagName: string;
  cfgName: string;
  processReturn: ProcessReturn | undefined;
}

export interface apsFullMsg {
  topicName: string;
  topicType: MessageType;
  convertImportParam?: apsConvertImportParam | undefined;
  convertExportParam?: apsConvertExportParam | undefined;
  savePrjectParam?: apsSaveProjectParam | undefined;
  loopManuelSelectParam?: apsLoopManualSelectParam | undefined;
  loopManuelMatchParam?: apsLoopManualMatchParam | undefined;
  loopManuelOptimizeParam?: apsLoopManualOptimizeParam | undefined;
  loopAutoSearchParam?: apsLoopAutoSearchParam | undefined;
  globalControlParam?: apsGlobalControlParam | undefined;
  globalRtkParam?: apsGlobalRTKParam | undefined;
  colorizeAutoParam?: apsColorizeAutoParam | undefined;
  processStatus?: string | undefined;
  processRatio?: number | undefined;
}

function createBaseVec3(): Vec3 {
  return { x: 0, y: 0, z: 0 };
}

export const Vec3 = {
  encode(message: Vec3, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(25).double(message.z);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vec3 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVec3();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.x = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.y = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.z = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Vec3 {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
    };
  },

  toJSON(message: Vec3): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    return obj;
  },

  create<I extends Exact<DeepPartial<Vec3>, I>>(base?: I): Vec3 {
    return Vec3.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Vec3>, I>>(object: I): Vec3 {
    const message = createBaseVec3();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.z = object.z ?? 0;
    return message;
  },
};

function createBaseQuaternion(): Quaternion {
  return { x: 0, y: 0, z: 0, w: 0 };
}

export const Quaternion = {
  encode(message: Quaternion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(9).double(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(17).double(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(25).double(message.z);
    }
    if (message.w !== 0) {
      writer.uint32(33).double(message.w);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Quaternion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuaternion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.x = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.y = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.z = reader.double();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.w = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Quaternion {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      z: isSet(object.z) ? Number(object.z) : 0,
      w: isSet(object.w) ? Number(object.w) : 0,
    };
  },

  toJSON(message: Quaternion): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.z !== undefined && (obj.z = message.z);
    message.w !== undefined && (obj.w = message.w);
    return obj;
  },

  create<I extends Exact<DeepPartial<Quaternion>, I>>(base?: I): Quaternion {
    return Quaternion.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Quaternion>, I>>(object: I): Quaternion {
    const message = createBaseQuaternion();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.z = object.z ?? 0;
    message.w = object.w ?? 0;
    return message;
  },
};

function createBasePose(): Pose {
  return { position: undefined, orientation: undefined };
}

export const Pose = {
  encode(message: Pose, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      Vec3.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.orientation !== undefined) {
      Quaternion.encode(message.orientation, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pose {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.position = Vec3.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orientation = Quaternion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pose {
    return {
      position: isSet(object.position) ? Vec3.fromJSON(object.position) : undefined,
      orientation: isSet(object.orientation) ? Quaternion.fromJSON(object.orientation) : undefined,
    };
  },

  toJSON(message: Pose): unknown {
    const obj: any = {};
    message.position !== undefined && (obj.position = message.position ? Vec3.toJSON(message.position) : undefined);
    message.orientation !== undefined &&
      (obj.orientation = message.orientation ? Quaternion.toJSON(message.orientation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Pose>, I>>(base?: I): Pose {
    return Pose.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Pose>, I>>(object: I): Pose {
    const message = createBasePose();
    message.position = (object.position !== undefined && object.position !== null)
      ? Vec3.fromPartial(object.position)
      : undefined;
    message.orientation = (object.orientation !== undefined && object.orientation !== null)
      ? Quaternion.fromPartial(object.orientation)
      : undefined;
    return message;
  },
};

function createBaseProcessReturn(): ProcessReturn {
  return { status: 0, msg: "" };
}

export const ProcessReturn = {
  encode(message: ProcessReturn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.msg !== "") {
      writer.uint32(18).string(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessReturn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessReturn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.msg = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProcessReturn {
    return {
      status: isSet(object.status) ? processStatusFromJSON(object.status) : 0,
      msg: isSet(object.msg) ? String(object.msg) : "",
    };
  },

  toJSON(message: ProcessReturn): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = processStatusToJSON(message.status));
    message.msg !== undefined && (obj.msg = message.msg);
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessReturn>, I>>(base?: I): ProcessReturn {
    return ProcessReturn.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProcessReturn>, I>>(object: I): ProcessReturn {
    const message = createBaseProcessReturn();
    message.status = object.status ?? 0;
    message.msg = object.msg ?? "";
    return message;
  },
};

function createBaseEdge(): Edge {
  return { refScanId: 0, curScanId: 0, refScanTime: 0, curScanTime: 0, initMatchPq: undefined };
}

export const Edge = {
  encode(message: Edge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refScanId !== 0) {
      writer.uint32(8).int32(message.refScanId);
    }
    if (message.curScanId !== 0) {
      writer.uint32(16).int32(message.curScanId);
    }
    if (message.refScanTime !== 0) {
      writer.uint32(25).double(message.refScanTime);
    }
    if (message.curScanTime !== 0) {
      writer.uint32(33).double(message.curScanTime);
    }
    if (message.initMatchPq !== undefined) {
      Pose.encode(message.initMatchPq, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Edge {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.refScanId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.curScanId = reader.int32();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.refScanTime = reader.double();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.curScanTime = reader.double();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.initMatchPq = Pose.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Edge {
    return {
      refScanId: isSet(object.refScanId) ? Number(object.refScanId) : 0,
      curScanId: isSet(object.curScanId) ? Number(object.curScanId) : 0,
      refScanTime: isSet(object.refScanTime) ? Number(object.refScanTime) : 0,
      curScanTime: isSet(object.curScanTime) ? Number(object.curScanTime) : 0,
      initMatchPq: isSet(object.initMatchPq) ? Pose.fromJSON(object.initMatchPq) : undefined,
    };
  },

  toJSON(message: Edge): unknown {
    const obj: any = {};
    message.refScanId !== undefined && (obj.refScanId = Math.round(message.refScanId));
    message.curScanId !== undefined && (obj.curScanId = Math.round(message.curScanId));
    message.refScanTime !== undefined && (obj.refScanTime = message.refScanTime);
    message.curScanTime !== undefined && (obj.curScanTime = message.curScanTime);
    message.initMatchPq !== undefined &&
      (obj.initMatchPq = message.initMatchPq ? Pose.toJSON(message.initMatchPq) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Edge>, I>>(base?: I): Edge {
    return Edge.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Edge>, I>>(object: I): Edge {
    const message = createBaseEdge();
    message.refScanId = object.refScanId ?? 0;
    message.curScanId = object.curScanId ?? 0;
    message.refScanTime = object.refScanTime ?? 0;
    message.curScanTime = object.curScanTime ?? 0;
    message.initMatchPq = (object.initMatchPq !== undefined && object.initMatchPq !== null)
      ? Pose.fromPartial(object.initMatchPq)
      : undefined;
    return message;
  },
};

function createBaseapsConvertImportParam(): apsConvertImportParam {
  return { dataDir: "", amapName: "", bagName: "", imgInfoFileName: "", cfgName: "" };
}

export const apsConvertImportParam = {
  encode(message: apsConvertImportParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    if (message.bagName !== "") {
      writer.uint32(26).string(message.bagName);
    }
    if (message.imgInfoFileName !== "") {
      writer.uint32(34).string(message.imgInfoFileName);
    }
    if (message.cfgName !== "") {
      writer.uint32(42).string(message.cfgName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsConvertImportParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsConvertImportParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bagName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.imgInfoFileName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.cfgName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsConvertImportParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
      bagName: isSet(object.bagName) ? String(object.bagName) : "",
      imgInfoFileName: isSet(object.imgInfoFileName) ? String(object.imgInfoFileName) : "",
      cfgName: isSet(object.cfgName) ? String(object.cfgName) : "",
    };
  },

  toJSON(message: apsConvertImportParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    message.bagName !== undefined && (obj.bagName = message.bagName);
    message.imgInfoFileName !== undefined && (obj.imgInfoFileName = message.imgInfoFileName);
    message.cfgName !== undefined && (obj.cfgName = message.cfgName);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsConvertImportParam>, I>>(base?: I): apsConvertImportParam {
    return apsConvertImportParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsConvertImportParam>, I>>(object: I): apsConvertImportParam {
    const message = createBaseapsConvertImportParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    message.bagName = object.bagName ?? "";
    message.imgInfoFileName = object.imgInfoFileName ?? "";
    message.cfgName = object.cfgName ?? "";
    return message;
  },
};

function createBaseapsConvertExportParam(): apsConvertExportParam {
  return { dataDir: "", amapName: "" };
}

export const apsConvertExportParam = {
  encode(message: apsConvertExportParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsConvertExportParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsConvertExportParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsConvertExportParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
    };
  },

  toJSON(message: apsConvertExportParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsConvertExportParam>, I>>(base?: I): apsConvertExportParam {
    return apsConvertExportParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsConvertExportParam>, I>>(object: I): apsConvertExportParam {
    const message = createBaseapsConvertExportParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    return message;
  },
};

function createBaseapsSaveProjectParam(): apsSaveProjectParam {
  return { dataDir: "", amapName: "" };
}

export const apsSaveProjectParam = {
  encode(message: apsSaveProjectParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsSaveProjectParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsSaveProjectParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsSaveProjectParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
    };
  },

  toJSON(message: apsSaveProjectParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsSaveProjectParam>, I>>(base?: I): apsSaveProjectParam {
    return apsSaveProjectParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsSaveProjectParam>, I>>(object: I): apsSaveProjectParam {
    const message = createBaseapsSaveProjectParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    return message;
  },
};

function createBaseapsLoopManualSelectParam(): apsLoopManualSelectParam {
  return {
    dataDir: "",
    amapName: "",
    refScanId: 0,
    curScanId: 0,
    refScanTime: 0,
    curScanTime: 0,
    processReturn: undefined,
  };
}

export const apsLoopManualSelectParam = {
  encode(message: apsLoopManualSelectParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    if (message.refScanId !== 0) {
      writer.uint32(24).int32(message.refScanId);
    }
    if (message.curScanId !== 0) {
      writer.uint32(32).int32(message.curScanId);
    }
    if (message.refScanTime !== 0) {
      writer.uint32(41).double(message.refScanTime);
    }
    if (message.curScanTime !== 0) {
      writer.uint32(49).double(message.curScanTime);
    }
    if (message.processReturn !== undefined) {
      ProcessReturn.encode(message.processReturn, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsLoopManualSelectParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsLoopManualSelectParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.refScanId = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.curScanId = reader.int32();
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.refScanTime = reader.double();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.curScanTime = reader.double();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.processReturn = ProcessReturn.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsLoopManualSelectParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
      refScanId: isSet(object.refScanId) ? Number(object.refScanId) : 0,
      curScanId: isSet(object.curScanId) ? Number(object.curScanId) : 0,
      refScanTime: isSet(object.refScanTime) ? Number(object.refScanTime) : 0,
      curScanTime: isSet(object.curScanTime) ? Number(object.curScanTime) : 0,
      processReturn: isSet(object.processReturn) ? ProcessReturn.fromJSON(object.processReturn) : undefined,
    };
  },

  toJSON(message: apsLoopManualSelectParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    message.refScanId !== undefined && (obj.refScanId = Math.round(message.refScanId));
    message.curScanId !== undefined && (obj.curScanId = Math.round(message.curScanId));
    message.refScanTime !== undefined && (obj.refScanTime = message.refScanTime);
    message.curScanTime !== undefined && (obj.curScanTime = message.curScanTime);
    message.processReturn !== undefined &&
      (obj.processReturn = message.processReturn ? ProcessReturn.toJSON(message.processReturn) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsLoopManualSelectParam>, I>>(base?: I): apsLoopManualSelectParam {
    return apsLoopManualSelectParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsLoopManualSelectParam>, I>>(object: I): apsLoopManualSelectParam {
    const message = createBaseapsLoopManualSelectParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    message.refScanId = object.refScanId ?? 0;
    message.curScanId = object.curScanId ?? 0;
    message.refScanTime = object.refScanTime ?? 0;
    message.curScanTime = object.curScanTime ?? 0;
    message.processReturn = (object.processReturn !== undefined && object.processReturn !== null)
      ? ProcessReturn.fromPartial(object.processReturn)
      : undefined;
    return message;
  },
};

function createBaseapsLoopManualMatchParam(): apsLoopManualMatchParam {
  return { dataDir: "", amapName: "", edge: undefined, processReturn: undefined };
}

export const apsLoopManualMatchParam = {
  encode(message: apsLoopManualMatchParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    if (message.edge !== undefined) {
      Edge.encode(message.edge, writer.uint32(26).fork()).ldelim();
    }
    if (message.processReturn !== undefined) {
      ProcessReturn.encode(message.processReturn, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsLoopManualMatchParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsLoopManualMatchParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.edge = Edge.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.processReturn = ProcessReturn.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsLoopManualMatchParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
      edge: isSet(object.edge) ? Edge.fromJSON(object.edge) : undefined,
      processReturn: isSet(object.processReturn) ? ProcessReturn.fromJSON(object.processReturn) : undefined,
    };
  },

  toJSON(message: apsLoopManualMatchParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    message.edge !== undefined && (obj.edge = message.edge ? Edge.toJSON(message.edge) : undefined);
    message.processReturn !== undefined &&
      (obj.processReturn = message.processReturn ? ProcessReturn.toJSON(message.processReturn) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsLoopManualMatchParam>, I>>(base?: I): apsLoopManualMatchParam {
    return apsLoopManualMatchParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsLoopManualMatchParam>, I>>(object: I): apsLoopManualMatchParam {
    const message = createBaseapsLoopManualMatchParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    message.edge = (object.edge !== undefined && object.edge !== null) ? Edge.fromPartial(object.edge) : undefined;
    message.processReturn = (object.processReturn !== undefined && object.processReturn !== null)
      ? ProcessReturn.fromPartial(object.processReturn)
      : undefined;
    return message;
  },
};

function createBaseapsLoopManualOptimizeParam(): apsLoopManualOptimizeParam {
  return { dataDir: "", amapName: "", edgeName: "", processReturn: undefined };
}

export const apsLoopManualOptimizeParam = {
  encode(message: apsLoopManualOptimizeParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    if (message.edgeName !== "") {
      writer.uint32(26).string(message.edgeName);
    }
    if (message.processReturn !== undefined) {
      ProcessReturn.encode(message.processReturn, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsLoopManualOptimizeParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsLoopManualOptimizeParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.edgeName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.processReturn = ProcessReturn.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsLoopManualOptimizeParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
      edgeName: isSet(object.edgeName) ? String(object.edgeName) : "",
      processReturn: isSet(object.processReturn) ? ProcessReturn.fromJSON(object.processReturn) : undefined,
    };
  },

  toJSON(message: apsLoopManualOptimizeParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    message.edgeName !== undefined && (obj.edgeName = message.edgeName);
    message.processReturn !== undefined &&
      (obj.processReturn = message.processReturn ? ProcessReturn.toJSON(message.processReturn) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsLoopManualOptimizeParam>, I>>(base?: I): apsLoopManualOptimizeParam {
    return apsLoopManualOptimizeParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsLoopManualOptimizeParam>, I>>(object: I): apsLoopManualOptimizeParam {
    const message = createBaseapsLoopManualOptimizeParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    message.edgeName = object.edgeName ?? "";
    message.processReturn = (object.processReturn !== undefined && object.processReturn !== null)
      ? ProcessReturn.fromPartial(object.processReturn)
      : undefined;
    return message;
  },
};

function createBaseapsLoopAutoSearchParam(): apsLoopAutoSearchParam {
  return { dataDir: "", amapName: "", edgeName: "", processReturn: undefined };
}

export const apsLoopAutoSearchParam = {
  encode(message: apsLoopAutoSearchParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    if (message.edgeName !== "") {
      writer.uint32(26).string(message.edgeName);
    }
    if (message.processReturn !== undefined) {
      ProcessReturn.encode(message.processReturn, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsLoopAutoSearchParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsLoopAutoSearchParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.edgeName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.processReturn = ProcessReturn.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsLoopAutoSearchParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
      edgeName: isSet(object.edgeName) ? String(object.edgeName) : "",
      processReturn: isSet(object.processReturn) ? ProcessReturn.fromJSON(object.processReturn) : undefined,
    };
  },

  toJSON(message: apsLoopAutoSearchParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    message.edgeName !== undefined && (obj.edgeName = message.edgeName);
    message.processReturn !== undefined &&
      (obj.processReturn = message.processReturn ? ProcessReturn.toJSON(message.processReturn) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsLoopAutoSearchParam>, I>>(base?: I): apsLoopAutoSearchParam {
    return apsLoopAutoSearchParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsLoopAutoSearchParam>, I>>(object: I): apsLoopAutoSearchParam {
    const message = createBaseapsLoopAutoSearchParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    message.edgeName = object.edgeName ?? "";
    message.processReturn = (object.processReturn !== undefined && object.processReturn !== null)
      ? ProcessReturn.fromPartial(object.processReturn)
      : undefined;
    return message;
  },
};

function createBaseapsGlobalControlParam(): apsGlobalControlParam {
  return { dataDir: "", amapName: "", controlName: "", processReturn: undefined };
}

export const apsGlobalControlParam = {
  encode(message: apsGlobalControlParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    if (message.controlName !== "") {
      writer.uint32(26).string(message.controlName);
    }
    if (message.processReturn !== undefined) {
      ProcessReturn.encode(message.processReturn, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsGlobalControlParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsGlobalControlParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.controlName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.processReturn = ProcessReturn.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsGlobalControlParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
      controlName: isSet(object.controlName) ? String(object.controlName) : "",
      processReturn: isSet(object.processReturn) ? ProcessReturn.fromJSON(object.processReturn) : undefined,
    };
  },

  toJSON(message: apsGlobalControlParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    message.controlName !== undefined && (obj.controlName = message.controlName);
    message.processReturn !== undefined &&
      (obj.processReturn = message.processReturn ? ProcessReturn.toJSON(message.processReturn) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsGlobalControlParam>, I>>(base?: I): apsGlobalControlParam {
    return apsGlobalControlParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsGlobalControlParam>, I>>(object: I): apsGlobalControlParam {
    const message = createBaseapsGlobalControlParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    message.controlName = object.controlName ?? "";
    message.processReturn = (object.processReturn !== undefined && object.processReturn !== null)
      ? ProcessReturn.fromPartial(object.processReturn)
      : undefined;
    return message;
  },
};

function createBaseapsGlobalRTKParam(): apsGlobalRTKParam {
  return { dataDir: "", amapName: "", bagName: "", cfgName: "" };
}

export const apsGlobalRTKParam = {
  encode(message: apsGlobalRTKParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    if (message.bagName !== "") {
      writer.uint32(26).string(message.bagName);
    }
    if (message.cfgName !== "") {
      writer.uint32(34).string(message.cfgName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsGlobalRTKParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsGlobalRTKParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bagName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cfgName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsGlobalRTKParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
      bagName: isSet(object.bagName) ? String(object.bagName) : "",
      cfgName: isSet(object.cfgName) ? String(object.cfgName) : "",
    };
  },

  toJSON(message: apsGlobalRTKParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    message.bagName !== undefined && (obj.bagName = message.bagName);
    message.cfgName !== undefined && (obj.cfgName = message.cfgName);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsGlobalRTKParam>, I>>(base?: I): apsGlobalRTKParam {
    return apsGlobalRTKParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsGlobalRTKParam>, I>>(object: I): apsGlobalRTKParam {
    const message = createBaseapsGlobalRTKParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    message.bagName = object.bagName ?? "";
    message.cfgName = object.cfgName ?? "";
    return message;
  },
};

function createBaseapsColorizeAutoParam(): apsColorizeAutoParam {
  return { dataDir: "", amapName: "", bagName: "", cfgName: "", processReturn: undefined };
}

export const apsColorizeAutoParam = {
  encode(message: apsColorizeAutoParam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDir !== "") {
      writer.uint32(10).string(message.dataDir);
    }
    if (message.amapName !== "") {
      writer.uint32(18).string(message.amapName);
    }
    if (message.bagName !== "") {
      writer.uint32(26).string(message.bagName);
    }
    if (message.cfgName !== "") {
      writer.uint32(34).string(message.cfgName);
    }
    if (message.processReturn !== undefined) {
      ProcessReturn.encode(message.processReturn, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsColorizeAutoParam {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsColorizeAutoParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDir = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amapName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bagName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cfgName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.processReturn = ProcessReturn.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsColorizeAutoParam {
    return {
      dataDir: isSet(object.dataDir) ? String(object.dataDir) : "",
      amapName: isSet(object.amapName) ? String(object.amapName) : "",
      bagName: isSet(object.bagName) ? String(object.bagName) : "",
      cfgName: isSet(object.cfgName) ? String(object.cfgName) : "",
      processReturn: isSet(object.processReturn) ? ProcessReturn.fromJSON(object.processReturn) : undefined,
    };
  },

  toJSON(message: apsColorizeAutoParam): unknown {
    const obj: any = {};
    message.dataDir !== undefined && (obj.dataDir = message.dataDir);
    message.amapName !== undefined && (obj.amapName = message.amapName);
    message.bagName !== undefined && (obj.bagName = message.bagName);
    message.cfgName !== undefined && (obj.cfgName = message.cfgName);
    message.processReturn !== undefined &&
      (obj.processReturn = message.processReturn ? ProcessReturn.toJSON(message.processReturn) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsColorizeAutoParam>, I>>(base?: I): apsColorizeAutoParam {
    return apsColorizeAutoParam.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsColorizeAutoParam>, I>>(object: I): apsColorizeAutoParam {
    const message = createBaseapsColorizeAutoParam();
    message.dataDir = object.dataDir ?? "";
    message.amapName = object.amapName ?? "";
    message.bagName = object.bagName ?? "";
    message.cfgName = object.cfgName ?? "";
    message.processReturn = (object.processReturn !== undefined && object.processReturn !== null)
      ? ProcessReturn.fromPartial(object.processReturn)
      : undefined;
    return message;
  },
};

function createBaseapsFullMsg(): apsFullMsg {
  return {
    topicName: "",
    topicType: 0,
    convertImportParam: undefined,
    convertExportParam: undefined,
    savePrjectParam: undefined,
    loopManuelSelectParam: undefined,
    loopManuelMatchParam: undefined,
    loopManuelOptimizeParam: undefined,
    loopAutoSearchParam: undefined,
    globalControlParam: undefined,
    globalRtkParam: undefined,
    colorizeAutoParam: undefined,
    processStatus: undefined,
    processRatio: undefined,
  };
}

export const apsFullMsg = {
  encode(message: apsFullMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topicName !== "") {
      writer.uint32(10).string(message.topicName);
    }
    if (message.topicType !== 0) {
      writer.uint32(16).int32(message.topicType);
    }
    if (message.convertImportParam !== undefined) {
      apsConvertImportParam.encode(message.convertImportParam, writer.uint32(26).fork()).ldelim();
    }
    if (message.convertExportParam !== undefined) {
      apsConvertExportParam.encode(message.convertExportParam, writer.uint32(34).fork()).ldelim();
    }
    if (message.savePrjectParam !== undefined) {
      apsSaveProjectParam.encode(message.savePrjectParam, writer.uint32(42).fork()).ldelim();
    }
    if (message.loopManuelSelectParam !== undefined) {
      apsLoopManualSelectParam.encode(message.loopManuelSelectParam, writer.uint32(50).fork()).ldelim();
    }
    if (message.loopManuelMatchParam !== undefined) {
      apsLoopManualMatchParam.encode(message.loopManuelMatchParam, writer.uint32(58).fork()).ldelim();
    }
    if (message.loopManuelOptimizeParam !== undefined) {
      apsLoopManualOptimizeParam.encode(message.loopManuelOptimizeParam, writer.uint32(66).fork()).ldelim();
    }
    if (message.loopAutoSearchParam !== undefined) {
      apsLoopAutoSearchParam.encode(message.loopAutoSearchParam, writer.uint32(74).fork()).ldelim();
    }
    if (message.globalControlParam !== undefined) {
      apsGlobalControlParam.encode(message.globalControlParam, writer.uint32(82).fork()).ldelim();
    }
    if (message.globalRtkParam !== undefined) {
      apsGlobalRTKParam.encode(message.globalRtkParam, writer.uint32(90).fork()).ldelim();
    }
    if (message.colorizeAutoParam !== undefined) {
      apsColorizeAutoParam.encode(message.colorizeAutoParam, writer.uint32(98).fork()).ldelim();
    }
    if (message.processStatus !== undefined) {
      writer.uint32(106).string(message.processStatus);
    }
    if (message.processRatio !== undefined) {
      writer.uint32(113).double(message.processRatio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): apsFullMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseapsFullMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topicName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.topicType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.convertImportParam = apsConvertImportParam.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.convertExportParam = apsConvertExportParam.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.savePrjectParam = apsSaveProjectParam.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.loopManuelSelectParam = apsLoopManualSelectParam.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.loopManuelMatchParam = apsLoopManualMatchParam.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.loopManuelOptimizeParam = apsLoopManualOptimizeParam.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.loopAutoSearchParam = apsLoopAutoSearchParam.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.globalControlParam = apsGlobalControlParam.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.globalRtkParam = apsGlobalRTKParam.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.colorizeAutoParam = apsColorizeAutoParam.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.processStatus = reader.string();
          continue;
        case 14:
          if (tag !== 113) {
            break;
          }

          message.processRatio = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): apsFullMsg {
    return {
      topicName: isSet(object.topicName) ? String(object.topicName) : "",
      topicType: isSet(object.topicType) ? messageTypeFromJSON(object.topicType) : 0,
      convertImportParam: isSet(object.convertImportParam)
        ? apsConvertImportParam.fromJSON(object.convertImportParam)
        : undefined,
      convertExportParam: isSet(object.convertExportParam)
        ? apsConvertExportParam.fromJSON(object.convertExportParam)
        : undefined,
      savePrjectParam: isSet(object.savePrjectParam) ? apsSaveProjectParam.fromJSON(object.savePrjectParam) : undefined,
      loopManuelSelectParam: isSet(object.loopManuelSelectParam)
        ? apsLoopManualSelectParam.fromJSON(object.loopManuelSelectParam)
        : undefined,
      loopManuelMatchParam: isSet(object.loopManuelMatchParam)
        ? apsLoopManualMatchParam.fromJSON(object.loopManuelMatchParam)
        : undefined,
      loopManuelOptimizeParam: isSet(object.loopManuelOptimizeParam)
        ? apsLoopManualOptimizeParam.fromJSON(object.loopManuelOptimizeParam)
        : undefined,
      loopAutoSearchParam: isSet(object.loopAutoSearchParam)
        ? apsLoopAutoSearchParam.fromJSON(object.loopAutoSearchParam)
        : undefined,
      globalControlParam: isSet(object.globalControlParam)
        ? apsGlobalControlParam.fromJSON(object.globalControlParam)
        : undefined,
      globalRtkParam: isSet(object.globalRtkParam) ? apsGlobalRTKParam.fromJSON(object.globalRtkParam) : undefined,
      colorizeAutoParam: isSet(object.colorizeAutoParam)
        ? apsColorizeAutoParam.fromJSON(object.colorizeAutoParam)
        : undefined,
      processStatus: isSet(object.processStatus) ? String(object.processStatus) : undefined,
      processRatio: isSet(object.processRatio) ? Number(object.processRatio) : undefined,
    };
  },

  toJSON(message: apsFullMsg): unknown {
    const obj: any = {};
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.topicType !== undefined && (obj.topicType = messageTypeToJSON(message.topicType));
    message.convertImportParam !== undefined && (obj.convertImportParam = message.convertImportParam
      ? apsConvertImportParam.toJSON(message.convertImportParam)
      : undefined);
    message.convertExportParam !== undefined && (obj.convertExportParam = message.convertExportParam
      ? apsConvertExportParam.toJSON(message.convertExportParam)
      : undefined);
    message.savePrjectParam !== undefined &&
      (obj.savePrjectParam = message.savePrjectParam ? apsSaveProjectParam.toJSON(message.savePrjectParam) : undefined);
    message.loopManuelSelectParam !== undefined && (obj.loopManuelSelectParam = message.loopManuelSelectParam
      ? apsLoopManualSelectParam.toJSON(message.loopManuelSelectParam)
      : undefined);
    message.loopManuelMatchParam !== undefined && (obj.loopManuelMatchParam = message.loopManuelMatchParam
      ? apsLoopManualMatchParam.toJSON(message.loopManuelMatchParam)
      : undefined);
    message.loopManuelOptimizeParam !== undefined && (obj.loopManuelOptimizeParam = message.loopManuelOptimizeParam
      ? apsLoopManualOptimizeParam.toJSON(message.loopManuelOptimizeParam)
      : undefined);
    message.loopAutoSearchParam !== undefined && (obj.loopAutoSearchParam = message.loopAutoSearchParam
      ? apsLoopAutoSearchParam.toJSON(message.loopAutoSearchParam)
      : undefined);
    message.globalControlParam !== undefined && (obj.globalControlParam = message.globalControlParam
      ? apsGlobalControlParam.toJSON(message.globalControlParam)
      : undefined);
    message.globalRtkParam !== undefined &&
      (obj.globalRtkParam = message.globalRtkParam ? apsGlobalRTKParam.toJSON(message.globalRtkParam) : undefined);
    message.colorizeAutoParam !== undefined && (obj.colorizeAutoParam = message.colorizeAutoParam
      ? apsColorizeAutoParam.toJSON(message.colorizeAutoParam)
      : undefined);
    message.processStatus !== undefined && (obj.processStatus = message.processStatus);
    message.processRatio !== undefined && (obj.processRatio = message.processRatio);
    return obj;
  },

  create<I extends Exact<DeepPartial<apsFullMsg>, I>>(base?: I): apsFullMsg {
    return apsFullMsg.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<apsFullMsg>, I>>(object: I): apsFullMsg {
    const message = createBaseapsFullMsg();
    message.topicName = object.topicName ?? "";
    message.topicType = object.topicType ?? 0;
    message.convertImportParam = (object.convertImportParam !== undefined && object.convertImportParam !== null)
      ? apsConvertImportParam.fromPartial(object.convertImportParam)
      : undefined;
    message.convertExportParam = (object.convertExportParam !== undefined && object.convertExportParam !== null)
      ? apsConvertExportParam.fromPartial(object.convertExportParam)
      : undefined;
    message.savePrjectParam = (object.savePrjectParam !== undefined && object.savePrjectParam !== null)
      ? apsSaveProjectParam.fromPartial(object.savePrjectParam)
      : undefined;
    message.loopManuelSelectParam =
      (object.loopManuelSelectParam !== undefined && object.loopManuelSelectParam !== null)
        ? apsLoopManualSelectParam.fromPartial(object.loopManuelSelectParam)
        : undefined;
    message.loopManuelMatchParam = (object.loopManuelMatchParam !== undefined && object.loopManuelMatchParam !== null)
      ? apsLoopManualMatchParam.fromPartial(object.loopManuelMatchParam)
      : undefined;
    message.loopManuelOptimizeParam =
      (object.loopManuelOptimizeParam !== undefined && object.loopManuelOptimizeParam !== null)
        ? apsLoopManualOptimizeParam.fromPartial(object.loopManuelOptimizeParam)
        : undefined;
    message.loopAutoSearchParam = (object.loopAutoSearchParam !== undefined && object.loopAutoSearchParam !== null)
      ? apsLoopAutoSearchParam.fromPartial(object.loopAutoSearchParam)
      : undefined;
    message.globalControlParam = (object.globalControlParam !== undefined && object.globalControlParam !== null)
      ? apsGlobalControlParam.fromPartial(object.globalControlParam)
      : undefined;
    message.globalRtkParam = (object.globalRtkParam !== undefined && object.globalRtkParam !== null)
      ? apsGlobalRTKParam.fromPartial(object.globalRtkParam)
      : undefined;
    message.colorizeAutoParam = (object.colorizeAutoParam !== undefined && object.colorizeAutoParam !== null)
      ? apsColorizeAutoParam.fromPartial(object.colorizeAutoParam)
      : undefined;
    message.processStatus = object.processStatus ?? undefined;
    message.processRatio = object.processRatio ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
