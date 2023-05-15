import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { GatewaysComponent } from './pages/gateways/gateways.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { AppRouting } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { NewGatewayComponent } from './pages/gateways/new-gateway/new-gateway.component';
import { FormsModule } from '@angular/forms';
import { NewDeviceComponent } from './pages/devices/new-device/new-device.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    GatewaysComponent,
    DevicesComponent,
    NewGatewayComponent,
    NewDeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
