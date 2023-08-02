import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModuleModule } from './material-module/material-module.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AppMaterialModuleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
