import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import { ListComponent } from './pages/list/list.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeroPipe } from './pipe/hero.pipe';
import { MessageControlService } from 'src/shared/services/message-control.service';


@NgModule({
  declarations: [
    ListComponent,
    RegisterComponent,
    HeroPipe
  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  providers: [MessageControlService]
})
export class HeroModule { }
