import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [{
  path: '',
  children: [
    {path : 'list', component : ListComponent},
    {path : 'register', component : RegisterComponent},
    {path : 'edit/:id', component : RegisterComponent},
    { path: '**', redirectTo: 'list' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }
