import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from 'src/app/sermaluc/hero/interfaces/heroe.interface';

@Component({
  selector: 'app-dialog-response',
  templateUrl: './dialog-response.component.html',
  styleUrls: ['./dialog-response.component.scss']
})
export class DialogResponseComponent {

  name! : string

  constructor(
    public dialogRef: MatDialogRef<DialogResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
    ) {
      this.name = data.superhero
    }

    onNoClick():void{
      this.dialogRef.close(false);
    }
    onConfirm():void{
      this.dialogRef.close(true);
    }
}
