/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "ars.v1";

export enum MessageType {
  ACK = 0,
  NOTIFY = 1,
  UNRECOGNIZED = -1,
}

export function messageTypeFromJSON(object: any): MessageType {
  switch (object) {
    case 0:
    case "ACK":
      return MessageType.ACK;
    case 1:
    case "NOTIFY":
      return MessageType.NOTIFY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageType.UNRECOGNIZED;
  }
}

export function messageTypeToJSON(object: MessageType): string {
  switch (object) {
    case MessageType.ACK:
      return "ACK";
    case MessageType.NOTIFY:
      return "NOTIFY";
    case MessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum NavigationStatus {
  IDLE = 0,
  MAPPING = 1,
  LOCATION = 2,
  UNRECOGNIZED = -1,
}

export function navigationStatusFromJSON(object: any): NavigationStatus {
  switch (object) {
    case 0:
    case "IDLE":
      return NavigationStatus.IDLE;
    case 1:
    case "MAPPING":
      return NavigationStatus.MAPPING;
    case 2:
    case "LOCATION":
      return NavigationStatus.LOCATION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NavigationStatus.UNRECOGNIZED;
  }
}

export function navigationStatusToJSON(object: NavigationStatus): string {
  switch (object) {
    case NavigationStatus.IDLE:
      return "IDLE";
    case NavigationStatus.MAPPING:
      return "MAPPING";
    case NavigationStatus.LOCATION:
      return "LOCATION";
    case NavigationStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** 字符串 */
export interface BasicString {
  data: string;
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

/** 速度 */
export interface Twist {
  /** 线速度 */
  linear: number;
  /** 角速度 */
  angular: number;
}

/** 消息头 */
export interface Header {
  /** 序列号，它随着消息的发送而自动增加 */
  seq: number;
  /** 时间戳, 格式为Unix纪元时间。eg: 1655200508 == 2022-06-14 17:55:08(中国标准时间) */
  timestamp: number;
  /** 消息类型 */
  type: MessageType;
}

/** 点云 */
export interface PointCloud {
  header:
    | Header
    | undefined;
  /** 点云数据, 格式为Draco */
  data: Uint8Array;
}

/** imu */
export interface ImuData {
  accX: number;
  accY: number;
  accZ: number;
  gyroX: number;
  gyroY: number;
  gyroZ: number;
}

/** 基础状态 */
export interface BaseStatus {
  /** cup 使用率 */
  cpuUsage: number;
  /** 内存使用率 */
  memoryUsage: number;
  /** 磁盘使用率 */
  diskUsage: number;
  /** 当前位置 */
  currentPose:
    | Pose
    | undefined;
  /** 当前速度 */
  currentTwist:
    | Twist
    | undefined;
  /** 导航模块状态 */
  navigationStatus: NavigationStatus;
}

/** 响应 */
export interface Response {
  header: Header | undefined;
  code: number;
  reason: string;
}

function createBaseBasicString(): BasicString {
  return { data: "" };
}

export const BasicString = {
  encode(message: BasicString, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicString {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasicString();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BasicString {
    return { data: isSet(object.data) ? String(object.data) : "" };
  },

  toJSON(message: BasicString): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },

  create<I extends Exact<DeepPartial<BasicString>, I>>(base?: I): BasicString {
    return BasicString.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BasicString>, I>>(object: I): BasicString {
    const message = createBaseBasicString();
    message.data = object.data ?? "";
    return message;
  },
};

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

function createBaseTwist(): Twist {
  return { linear: 0, angular: 0 };
}

export const Twist = {
  encode(message: Twist, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.linear !== 0) {
      writer.uint32(9).double(message.linear);
    }
    if (message.angular !== 0) {
      writer.uint32(17).double(message.angular);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Twist {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTwist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.linear = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.angular = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Twist {
    return {
      linear: isSet(object.linear) ? Number(object.linear) : 0,
      angular: isSet(object.angular) ? Number(object.angular) : 0,
    };
  },

  toJSON(message: Twist): unknown {
    const obj: any = {};
    message.linear !== undefined && (obj.linear = message.linear);
    message.angular !== undefined && (obj.angular = message.angular);
    return obj;
  },

  create<I extends Exact<DeepPartial<Twist>, I>>(base?: I): Twist {
    return Twist.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Twist>, I>>(object: I): Twist {
    const message = createBaseTwist();
    message.linear = object.linear ?? 0;
    message.angular = object.angular ?? 0;
    return message;
  },
};

function createBaseHeader(): Header {
  return { seq: 0, timestamp: 0, type: 0 };
}

export const Header = {
  encode(message: Header, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seq !== 0) {
      writer.uint32(9).double(message.seq);
    }
    if (message.timestamp !== 0) {
      writer.uint32(16).int64(message.timestamp);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.seq = reader.double();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.timestamp = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Header {
    return {
      seq: isSet(object.seq) ? Number(object.seq) : 0,
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      type: isSet(object.type) ? messageTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.seq !== undefined && (obj.seq = message.seq);
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    message.type !== undefined && (obj.type = messageTypeToJSON(message.type));
    return obj;
  },

  create<I extends Exact<DeepPartial<Header>, I>>(base?: I): Header {
    return Header.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Header>, I>>(object: I): Header {
    const message = createBaseHeader();
    message.seq = object.seq ?? 0;
    message.timestamp = object.timestamp ?? 0;
    message.type = object.type ?? 0;
    return message;
  },
};

function createBasePointCloud(): PointCloud {
  return { header: undefined, data: new Uint8Array() };
}

export const PointCloud = {
  encode(message: PointCloud, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PointCloud {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePointCloud();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.header = Header.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PointCloud {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
    };
  },

  toJSON(message: PointCloud): unknown {
    const obj: any = {};
    message.header !== undefined && (obj.header = message.header ? Header.toJSON(message.header) : undefined);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<PointCloud>, I>>(base?: I): PointCloud {
    return PointCloud.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PointCloud>, I>>(object: I): PointCloud {
    const message = createBasePointCloud();
    message.header = (object.header !== undefined && object.header !== null)
      ? Header.fromPartial(object.header)
      : undefined;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseImuData(): ImuData {
  return { accX: 0, accY: 0, accZ: 0, gyroX: 0, gyroY: 0, gyroZ: 0 };
}

export const ImuData = {
  encode(message: ImuData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accX !== 0) {
      writer.uint32(13).float(message.accX);
    }
    if (message.accY !== 0) {
      writer.uint32(21).float(message.accY);
    }
    if (message.accZ !== 0) {
      writer.uint32(29).float(message.accZ);
    }
    if (message.gyroX !== 0) {
      writer.uint32(37).float(message.gyroX);
    }
    if (message.gyroY !== 0) {
      writer.uint32(45).float(message.gyroY);
    }
    if (message.gyroZ !== 0) {
      writer.uint32(53).float(message.gyroZ);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImuData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImuData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.accX = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.accY = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.accZ = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.gyroX = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }

          message.gyroY = reader.float();
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }

          message.gyroZ = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImuData {
    return {
      accX: isSet(object.accX) ? Number(object.accX) : 0,
      accY: isSet(object.accY) ? Number(object.accY) : 0,
      accZ: isSet(object.accZ) ? Number(object.accZ) : 0,
      gyroX: isSet(object.gyroX) ? Number(object.gyroX) : 0,
      gyroY: isSet(object.gyroY) ? Number(object.gyroY) : 0,
      gyroZ: isSet(object.gyroZ) ? Number(object.gyroZ) : 0,
    };
  },

  toJSON(message: ImuData): unknown {
    const obj: any = {};
    message.accX !== undefined && (obj.accX = message.accX);
    message.accY !== undefined && (obj.accY = message.accY);
    message.accZ !== undefined && (obj.accZ = message.accZ);
    message.gyroX !== undefined && (obj.gyroX = message.gyroX);
    message.gyroY !== undefined && (obj.gyroY = message.gyroY);
    message.gyroZ !== undefined && (obj.gyroZ = message.gyroZ);
    return obj;
  },

  create<I extends Exact<DeepPartial<ImuData>, I>>(base?: I): ImuData {
    return ImuData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ImuData>, I>>(object: I): ImuData {
    const message = createBaseImuData();
    message.accX = object.accX ?? 0;
    message.accY = object.accY ?? 0;
    message.accZ = object.accZ ?? 0;
    message.gyroX = object.gyroX ?? 0;
    message.gyroY = object.gyroY ?? 0;
    message.gyroZ = object.gyroZ ?? 0;
    return message;
  },
};

function createBaseBaseStatus(): BaseStatus {
  return {
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    currentPose: undefined,
    currentTwist: undefined,
    navigationStatus: 0,
  };
}

export const BaseStatus = {
  encode(message: BaseStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cpuUsage !== 0) {
      writer.uint32(13).float(message.cpuUsage);
    }
    if (message.memoryUsage !== 0) {
      writer.uint32(21).float(message.memoryUsage);
    }
    if (message.diskUsage !== 0) {
      writer.uint32(29).float(message.diskUsage);
    }
    if (message.currentPose !== undefined) {
      Pose.encode(message.currentPose, writer.uint32(34).fork()).ldelim();
    }
    if (message.currentTwist !== undefined) {
      Twist.encode(message.currentTwist, writer.uint32(42).fork()).ldelim();
    }
    if (message.navigationStatus !== 0) {
      writer.uint32(48).int32(message.navigationStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.cpuUsage = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.memoryUsage = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.diskUsage = reader.float();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.currentPose = Pose.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.currentTwist = Twist.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.navigationStatus = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BaseStatus {
    return {
      cpuUsage: isSet(object.cpuUsage) ? Number(object.cpuUsage) : 0,
      memoryUsage: isSet(object.memoryUsage) ? Number(object.memoryUsage) : 0,
      diskUsage: isSet(object.diskUsage) ? Number(object.diskUsage) : 0,
      currentPose: isSet(object.currentPose) ? Pose.fromJSON(object.currentPose) : undefined,
      currentTwist: isSet(object.currentTwist) ? Twist.fromJSON(object.currentTwist) : undefined,
      navigationStatus: isSet(object.navigationStatus) ? navigationStatusFromJSON(object.navigationStatus) : 0,
    };
  },

  toJSON(message: BaseStatus): unknown {
    const obj: any = {};
    message.cpuUsage !== undefined && (obj.cpuUsage = message.cpuUsage);
    message.memoryUsage !== undefined && (obj.memoryUsage = message.memoryUsage);
    message.diskUsage !== undefined && (obj.diskUsage = message.diskUsage);
    message.currentPose !== undefined &&
      (obj.currentPose = message.currentPose ? Pose.toJSON(message.currentPose) : undefined);
    message.currentTwist !== undefined &&
      (obj.currentTwist = message.currentTwist ? Twist.toJSON(message.currentTwist) : undefined);
    message.navigationStatus !== undefined && (obj.navigationStatus = navigationStatusToJSON(message.navigationStatus));
    return obj;
  },

  create<I extends Exact<DeepPartial<BaseStatus>, I>>(base?: I): BaseStatus {
    return BaseStatus.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BaseStatus>, I>>(object: I): BaseStatus {
    const message = createBaseBaseStatus();
    message.cpuUsage = object.cpuUsage ?? 0;
    message.memoryUsage = object.memoryUsage ?? 0;
    message.diskUsage = object.diskUsage ?? 0;
    message.currentPose = (object.currentPose !== undefined && object.currentPose !== null)
      ? Pose.fromPartial(object.currentPose)
      : undefined;
    message.currentTwist = (object.currentTwist !== undefined && object.currentTwist !== null)
      ? Twist.fromPartial(object.currentTwist)
      : undefined;
    message.navigationStatus = object.navigationStatus ?? 0;
    return message;
  },
};

function createBaseResponse(): Response {
  return { header: undefined, code: 0, reason: "" };
}

export const Response = {
  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.code !== 0) {
      writer.uint32(16).int32(message.code);
    }
    if (message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.header = Header.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.code = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.reason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      code: isSet(object.code) ? Number(object.code) : 0,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.header !== undefined && (obj.header = message.header ? Header.toJSON(message.header) : undefined);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  create<I extends Exact<DeepPartial<Response>, I>>(base?: I): Response {
    return Response.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.header = (object.header !== undefined && object.header !== null)
      ? Header.fromPartial(object.header)
      : undefined;
    message.code = object.code ?? 0;
    message.reason = object.reason ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
