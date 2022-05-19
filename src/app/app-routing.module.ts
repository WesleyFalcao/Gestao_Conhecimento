import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarGrupoComponent } from './pages/adicionar-grupo/adicionar-grupo.component';
import { AdicionarUsersComponent } from './pages/usuario/usuario-adicionar/usuario-adicionar.component';
import { CategoriaAdicionarComponent } from './pages/categorias/categoria-adicionar/categoria-adicionar.component';
import { CategoriaEditarComponent } from './pages/categorias/categoria-editar/categoria-editar.component';
import { CategoriaComponent } from './pages/categorias/categorias-lista/categoria.component';
import { ConteudoAdicionarComponent } from './pages/conteudo/conteudo-adicionar/conteudo-adicionar.component';
import { ConteudoEditarListaComponent } from './pages/conteudo/conteudo-lista/conteudo-lista.component';
import { ConteudoEditarComponent } from './pages/conteudo/conteudo-editar/conteudo-editar.component';
import { ConteudoComponent } from './pages/conteudo/conteudo-card/conteudo.component';
import { EditarUserComponent } from './pages/usuario/usuario-editar/usuario-editar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MeusEstudosComponent } from './pages/meus-estudos/meus-estudos.component';
import { SugestoesListaComponent } from './pages/sugestoes/sugestoes-lista/sugestoes-lista.component';
import { SugestoesComponent } from './pages/sugestoes/sugestoes-card/sugestoes.component';
import { UsersComponent } from './pages/usuario/usuarios-lista/usuarios-lista.component';
import { SugestaoAdicionarComponent } from './pages/sugestoes/sugestao-adicionar/sugestao-adicionar.component';
import { SendSuggestionComponent } from './components/send-suggestion/send-suggestion.component';

const routes: Routes = [
  { 
    path: '', component: LoginComponent,
    data: { animation: "LoginPage" },
  },
  { 
    path: 'home', component: HomeComponent,
    data: { animation: "HomePage" },
  },
  { path: 'meus-estudos', component: MeusEstudosComponent },
  { path: 'grupo-adicionar', component: AdicionarGrupoComponent },
  { path: 'conteudo', component: ConteudoComponent },
  { path: 'conteudo-editar', component: ConteudoEditarComponent },
  { path: 'conteudo-lista', component: ConteudoEditarListaComponent },
  { path: 'conteudo-adicionar', component: ConteudoAdicionarComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'adicionar-usuario', component: AdicionarUsersComponent },
  { path: 'editar-usuario', component: EditarUserComponent },
  { path: 'sugestoes', component: SugestoesComponent },
  { path: 'sugestoes-lista', component: SugestoesListaComponent },
  { path: 'sugestao-adicionar', component: SugestaoAdicionarComponent },
  { path: 'categorias', component: CategoriaComponent },
  { path: 'categoria-adicionar', component: CategoriaAdicionarComponent },
  { path: 'categoria-editar', component: CategoriaEditarComponent },
  { path: 'send-sugestion', component: SendSuggestionComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
