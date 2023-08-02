import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [MatButtonModule, BrowserAnimationsModule],
})
export class AppMaterialModuleModule {}
