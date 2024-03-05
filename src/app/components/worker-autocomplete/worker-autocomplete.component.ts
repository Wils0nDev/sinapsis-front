import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import * as util from 'src/shared/utils/utils';
import { Cliente } from 'src/app/sinapsis/filtro/interfaces/cliente.interface';
import { ClienteService } from 'src/app/sinapsis/filtro/services/cliente.service';

@Component({
  selector: 'app-worker-autocomplete',
  templateUrl: './worker-autocomplete.component.html',
  styleUrls: ['./worker-autocomplete.component.scss']
})
export class WorkerAutocompleteComponent implements OnInit {
  @Input() data: any;
  @Input() label: string = '';
  @Input() formulario!: FormGroup;
  @Input() name: string = '';

  @Output() changeAutoComplete: EventEmitter<Cliente> = new EventEmitter();

  Tools: any;
  filteredCliete: Observable<any[]> | undefined;
  listClient: Cliente[] = [];

  permissionUser: string = '';
  isKeyLocal! : boolean 
  constructor(
    private clienteService : ClienteService,
  ) {
    this.Tools = util
  }

  

  ngOnInit(): void {
    
    this.loadClientes()

  }

  ngAfterViewInit(): void {
    this.filteredCliete = this.formulario.get(this.name)?.valueChanges.pipe(
      startWith(''),
      map((Key) => {
        return this._filterWorker(Key)
      })
    );
  }

  loadClientes = ()=> {
    this.clienteService.getClientes()
    .subscribe({
      next:(clientes)=>{
        this.listClient = clientes
        console.log(this.listClient)
      },
      complete : ()=> {
        console.log('completado')
      },
    })
  }

  clienteChange = (cliente: Cliente) => {
    this.changeAutoComplete.emit(cliente);
  };

  private _filterWorker(value: any) {
    value = value == null ? '' : value;
    if (value.length > 2) {
      return this.listClient.filter(
        (d:any) => {
        
          return this.filterClient(d.nombre, value)
        }    );
    } else {
      return [];
    }
  }

  
  filterClient(name: string, value: string) {
    let splitNames = name.split(' ');
    let splitValues = value.split(' ');
    let exist = false;
    for (let index = 0; index < splitValues.length; index++) {
      let element = splitNames.filter((x) =>
        x.toLowerCase().trim().includes(splitValues[index].toLowerCase().trim())
      );
      if (element.length > 0) {
        exist = true;
      } else {
        return false;
      }
    }
    return exist;
  }


}
