import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/heroe.interface';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  switchMap } from 'rxjs';
import { MessageControlService } from 'src/shared/services/message-control.service';
import { LocalService } from 'src/shared/services/local.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  public heroForm! : FormGroup

  constructor(
    private heroService : HeroService,
    private router : Router,
    private activeRoute : ActivatedRoute,
    private messageService:  MessageControlService,
    private localService: LocalService,

  ){}

  ngOnInit(): void {
    
    this.heroForm= new FormGroup({
      id: new FormControl<string>('')    ,   
      superhero: new FormControl<string>('',[Validators.required]),
      publisher: new FormControl<string>('', [Validators.required]),
      alter_ego: new FormControl<Publisher>(Publisher.DCComics,[Validators.required]),
      first_appearance: new FormControl('',[Validators.required]),
      characters: new FormControl('',[Validators.required]),
      alt_image: new FormControl('')
    })

    this.isExistHero()


  }

  get currentHero():Hero {
    const hero = this.heroForm.value as Hero;
    return hero
  }
  onSubmit(){

    const {value, valid, invalid} = this.heroForm
    
    if(invalid) {
      this.heroForm.markAllAsTouched();
      return;
    };

    if(this.currentHero.id){
      this.updateHero(this.currentHero)
    }else{
      this.createHero(this.currentHero)
    }
  }

  isExistHero():void{
    if(!this.router.url.includes('edit')) return;

    this.activeRoute.params
    .pipe(
      switchMap(({id}) => this.getHeroById(id) )
    ).subscribe( (hero) => {
      if(!hero) return this.router.navigateByUrl('/');
      this.heroForm.reset(hero)
      return;
    })
  }

  getHeroById(id:string){
    return this.heroService.getHeroById(id)
  }

  updateHero(hero:Hero){
    this.heroService.updateHero(hero).subscribe({
      next : (data)=>{
        if (data) {
          this.messageService.ShowSuccess('Se actualizo correctamente');
        }
      },
      complete : () => {
        this.router.navigate(['/hero/list'])
      },
      error: ()=> this.messageService.ShowError('Ocurrio un error')
    })
  }

  createHero(hero:Hero){
    
    this.heroService.addHeroes(hero).subscribe({
      next : (data)=>{
        if (data) {

          const heros = this.localService.getJsonValue('name-heros')
          this.localService.clearKey('name-heros')
          this.messageService.ShowSuccess('Se registro correctamente');
        }
      },
      complete : () => {
        this.router.navigate(['/hero/list'])
      },
      error: ()=> this.messageService.ShowError('Ocurrio un error')
    })
  }

  clear(){
    this.heroForm.reset({
      alter_ego : Publisher.DCComics
    })
  }

  getErrorMessage() {
    if (this.heroForm.controls['superheroe'].hasError('required')) {
      return 'You must enter a value';
    }

   return this.heroForm.controls['superheroe'].hasError('required') ? 'Not a valid email' : '';
  }

  
}
