import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [BrowserAnimationsModule, MatButtonModule, MatToolbarModule],
})
export class AppMaterialModuleModule {}
