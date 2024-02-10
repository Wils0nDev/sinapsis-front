import { Component, Input, OnInit } from '@angular/core';
import { MenuOptions } from 'src/shared/interfaces/menu-option.interface';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent  {

  @Input() option! : any
  public listOptions : MenuOptions[] = [
    {label: 'Listado',icon: 'label',url: './hero/list', },
    {label: 'Registrar',icon: 'label',url: './hero/register'},
   ]

 

  hideSideNav() {
    this.option.toggle()
  }


   



   
   
}
