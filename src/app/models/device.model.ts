export class DeviceModel {
  constructor(
    public uid: number,
    public status: DeviceStatus,
    public vendor: string,
    public date?: string,
    public _id?: number,
  ) { }
}

export enum DeviceStatus {
  Online = 'online',
  Offline = 'offline'
}
