import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { OptionsComponent } from './options/options.component';
import { RouterModule } from '@angular/router';
import { WorkerAutocompleteComponent } from './worker-autocomplete/worker-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { DialogResponseComponent } from './dialog-response/dialog-response.component';



@NgModule({
  declarations: [
    OptionsComponent,
    WorkerAutocompleteComponent,
    SnackbarComponent,
    DialogResponseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    OptionsComponent,
    WorkerAutocompleteComponent,
    SnackbarComponent
  ]
})
export class ComponentsModule { }
