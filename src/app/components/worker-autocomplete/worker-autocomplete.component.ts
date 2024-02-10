import { Observable, forkJoin } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { LocalService } from 'src/shared/services/local.service';
import * as util from 'src/shared/utils/utils';

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

  @Output() changeAutoComplete: EventEmitter<String> = new EventEmitter();

  Tools: any;
  filteredHero: Observable<any[]> | undefined;
  listHero: any[] = [];

  permissionUser: string = '';
  isKeyLocal! : boolean 
  constructor(
    private localService : LocalService
  ) {
    this.Tools = util
  }

  

  ngOnInit(): void {
    
    this.loadHero()

  }

  ngAfterViewInit(): void {
    this.filteredHero = this.formulario.get(this.name)?.valueChanges.pipe(
      startWith(''),
      map((Key) => this._filterWorker(Key))
    );
  }

  loadHero =  () => {
   setTimeout(() => {
    this.listHero = this.localService.getJsonValue('name-heros')
   }, 1000);
    
   
  };

  heroChange = (d: any) => {
    this.changeAutoComplete.emit(d);
  };

  private _filterWorker(value: any) {
    value = value == null ? '' : value;
    if (value.length > 2) {
      const valueArr = this.listHero.filter(
        (name:any) => this.filterHero(name,value)
      );
      return valueArr
    } else {
      return [];
    }
  }

  filterHero(name: string, value: string) {
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
