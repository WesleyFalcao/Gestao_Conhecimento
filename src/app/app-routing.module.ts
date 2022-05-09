import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarUsersComponent } from './pages/adicionar-users/adicionar-users.component';
import { ConteudoEditarComponent } from './pages/conteudo-editar/conteudo-editar.component';
import { ConteudoComponent } from './pages/conteudo/conteudo.component';
import { EditarUserComponent } from './pages/editar-user/editar-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SugestoesComponent } from './pages/sugestoes/sugestoes.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'conteudo', component: ConteudoComponent },
  { path: 'conteudo-editar', component: ConteudoEditarComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'adicionar-user', component: AdicionarUsersComponent },
  { path: 'editar-user', component: EditarUserComponent },
  { path: 'sugestoes', component: SugestoesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
