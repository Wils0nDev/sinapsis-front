import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroService } from '../../services/filtro.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MessageControlService } from '../../../../../shared/services/message-control.service';
import { MatSort } from '@angular/material/sort';
import * as util from 'src/shared/utils/utils';
import { State, StateEnvio } from '../../interfaces/state-send.interface';
import { Mensaje, sendFilter } from '../../interfaces/mensaje.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

   //public mensajeFilter: MensajeFilter[] = [];
   public cliente : Cliente[] = []
   searchForm: any;
   isHidden = false;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatTable) table!: any;

   displayedColumns: string[] = [
    'id',
    'superhero',
    'publisher',
    'alter_ego',
    'first_appearance',
    'characters',
  ];

  lstStateEnvio : StateEnvio[]  = [
    {description : 'Pendiente', value: 1 },
    {description : 'Enviado', value: 2 },
    {description : 'Error', value: 3 }
  ]

  lstState : State[]  = [
    {description : 'Inactivo', value: 0 },
    {description : 'Activo', value: 1 },
  ]
    selected! : number;
    Tools: any;
    dateSend : Date;
    clienteId! : number 
    
   dataSource!: MatTableDataSource<Mensaje>;
   constructor(
    private filtroService : FiltroService,
    private messageControlService : MessageControlService

   ){
    this.Tools = util
    this.dateSend = new Date();
   
    
   }


  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchCliente: new FormControl(null),
      searchDateStart: new FormControl( this.dateSend, [Validators.required]),
      typeState: new FormControl( 1, [Validators.required]),
      statusSendMessage: new FormControl( 1, [Validators.required]),

    });
    this.search()
    
  }

  ngAfterViewInit(): void {
    this.selected = 1
  }

  search(){
    const { valid, value } = this.searchForm;
    
    if (valid) {

      const filerMessage : sendFilter = {
        estado: value.typeState,
        estadoEnvio: value.statusSendMessage,
        fechaHoraEnvio: value.searchDateStart,
        cliente: this.clienteId 
      }
     this.filtroService.getMessages(filerMessage).subscribe({
      next: (data: Mensaje[]) => {
        console.log(data)
        this.getDataSource(data)
      },
      complete: () =>  console.log('Completado'),
      error: ()=>  this.messageControlService.ShowError('Ocurrio un error')
    });
    }
   
  }
  getEstadoEnvio(estado:number) : string {
    if(estado ===  1 ) return 'Pendiente'
    if(estado === 2 ) return 'Enviado'
    if(estado ===  3 ) return 'Error'
    return ''
  }

  getEstado(estado:number) : string {
    if(estado ===  0 ) return 'Inactivo'
    if(estado === 1 ) return 'Activo'
    return ''
  }

  getDataSource(mensajes:Mensaje[]){
    this.dataSource = new MatTableDataSource(mensajes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clienteSelect(cliente:Cliente){
    
    this.clienteId = cliente.id
   
  }




}
