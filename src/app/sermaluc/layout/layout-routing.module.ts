import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component:LayoutComponent,
  children: [

    { path: '', redirectTo: 'hero', pathMatch: 'full' },
    {
      path: 'hero',
      loadChildren: () =>
        import('src/app/sermaluc/hero/hero.module').then((m) => m.HeroModule),
       //canActivate: [AuthGuard],
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
