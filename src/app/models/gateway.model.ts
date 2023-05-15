import { DeviceModel } from "./device.model";

export class GatewayModel {
  constructor(
    public serialNumber: number,
    public ipv4Address: string,
    public fullName?: string,
    public _id?: number,
    public devices?: DeviceModel[],
  ) { }
}
