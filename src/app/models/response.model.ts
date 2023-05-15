import { DeviceModel } from "./device.model";
import { GatewayModel } from "./gateway.model";

export class ResponseModel {
  constructor(
    public ok: boolean,
    public total?: number,
    public gateways?: GatewayModel[],
    public gateway?: GatewayModel,
    public devices?: DeviceModel[],
    public device?: DeviceModel,
  ){}
}
