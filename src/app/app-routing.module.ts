import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConteudoEditarComponent } from './pages/conteudo-editar/conteudo-editar.component';
import { ConteudoComponent } from './pages/conteudo/conteudo.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'conteudo', component: ConteudoComponent },
  { path: 'conteudo-editar', component: ConteudoEditarComponent },
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
