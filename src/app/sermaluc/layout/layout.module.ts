import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    ComponentsModule,
  ]
})
export class LayoutModule { }
