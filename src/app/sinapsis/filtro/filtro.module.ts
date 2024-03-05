import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltroRoutingModule } from './filtro-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { MessageControlService } from 'src/shared/services/message-control.service';


@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    FiltroRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  providers: [MessageControlService]
})
export class HeroModule { }
