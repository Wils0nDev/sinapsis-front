import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/heroe.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LocalService } from 'src/shared/services/local.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponseComponent } from 'src/app/components/dialog-response/dialog-response.component';
import { MessageControlService } from '../../../../../shared/services/message-control.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

   public heroes: Hero[] = [];
   searchForm: any;
   isHidden = false;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatTable) table!: MatTable<Hero>;

   displayedColumns: string[] = [
    'action',
    'id',
    'superhero',
    'publisher',
    'alter_ego',
    'first_appearance',
    'characters',
    'foto'
  ];

   dataSource!: MatTableDataSource<Hero>;
   constructor(
    private heroService : HeroService,
    private localService: LocalService,
    private router : Router,
    private dialog: MatDialog,
    private messageControlService : MessageControlService

   ){}


  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchHero: new FormControl(null),
    });
    this.getHeros()
    
  }


  getHeros = ()=> {
    this.heroService.getHeroes()
    .subscribe({
      next:(heroes)=>{
        this.heroes = heroes
        this.getDataSource(this.heroes )
        this.getHeroName(heroes)
      },
      complete : ()=> {
        console.log('completado')
      },
      error: ()=> this.messageControlService.ShowError('Ocurrio un error')
    })
  }

  getHeroName = (heroes:Hero[]) => {
    const nameHeros = heroes.map((heroe)=>heroe.superhero)
    this.localService.setJsonValue('name-heros',nameHeros)
  }

  search(){
    const { value} = this.searchForm;
    if(value.searchHero){
      const newHeroes = this.heroes.filter((heroe)=> heroe.superhero === value.searchHero)
      this.getDataSource(newHeroes)
    }else{
      this.getHeros()
    }
   
  }

  getDataSource(heroes:Hero[]){
    this.dataSource = new MatTableDataSource(heroes);
    this.dataSource.paginator = this.paginator;
  }

  deleteHero(hero:Hero){
    console.log(hero)

      const dialogRef = this.dialog.open(DialogResponseComponent, {
        disableClose: true,
        data : hero,
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(r => {
        if (r) {
          this.heroService.deleteHero(hero.id!).subscribe({
            next: (data)=>{
            
            },
            complete: ()=>{
              this.getHeros()
              this.messageControlService.ShowSuccess('Se elimino Correctamente')
            },
            error: ()=> this.messageControlService.ShowError('Ocurrio un error')
          })
        }
      });
      
  }



  navitateEdit(id:string){
    this.router.navigateByUrl(`hero/edit/${id}`);
  }
}
