import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarUsersComponent } from './pages/adicionar-users/adicionar-users.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ConteudoAdicionarComponent } from './pages/conteudo-adicionar/conteudo-adicionar.component';
import { ConteudoEditarComponent } from './pages/conteudo-editar/conteudo-editar.component';
import { ConteudoComponent } from './pages/conteudo/conteudo.component';
import { EditarUserComponent } from './pages/editar-user/editar-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MeusEstudosComponent } from './pages/meus-estudos/meus-estudos.component';
import { SugestoesComponent } from './pages/sugestoes/sugestoes.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'conteudo', component: ConteudoComponent },
  { path: 'conteudo-editar', component: ConteudoEditarComponent },
  { path: 'conteudo-adicionar', component: ConteudoAdicionarComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'adicionar-usuario', component: AdicionarUsersComponent },
  { path: 'editar-usuario', component: EditarUserComponent },
  { path: 'sugestoes', component: SugestoesComponent },
  { path: 'meus-estudos', component: MeusEstudosComponent },
  { path: 'categorias', component: CategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
