import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/cliente.interface';

@Pipe({
  name: 'HeroImage'
})
export class HeroPipe implements PipeTransform {

  transform(hero: Hero): string {
    
    if(!hero.id && !hero.alt_image){
      return 'assets/no-image.png';
    }

    if(hero.alt_image) return hero.alt_image
    return `assets/heroes/${hero.id}.jpg`

  }

}
