import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component:LayoutComponent,
  children: [

    { path: '', redirectTo: 'filtro', pathMatch: 'full' },
    {
      path: 'filtro',
      loadChildren: () =>
        import('src/app/sinapsis/filtro/filtro.module').then((m) => m.HeroModule),
       //canActivate: [AuthGuard],
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
