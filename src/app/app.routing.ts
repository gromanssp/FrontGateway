import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GatewaysComponent } from './pages/gateways/gateways.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { NewGatewayComponent } from './pages/gateways/new-gateway/new-gateway.component';
import { NewDeviceComponent } from './pages/devices/new-device/new-device.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gateways', component: GatewaysComponent },
  { path: 'gateway/:id', component: NewGatewayComponent },
  { path: 'devices/:id', component: DevicesComponent },
  { path: 'device/:gatewayId/:deviceId', component: NewDeviceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}
