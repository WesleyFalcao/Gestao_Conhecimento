import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarGrupoComponent } from './adicionar-grupo/adicionar-grupo.component';
import { ComponentsModule } from '../components/components.module';
import { AdicionarUsersComponent } from './adicionar-users/adicionar-users.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAdicionarComponent } from './categoria-adicionar/categoria-adicionar.component';
import { CategoriaEditarComponent } from './categoria-editar/categoria-editar.component';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { ConteudoAdicionarComponent } from './conteudo-adicionar/conteudo-adicionar.component';
import { ConteudoEditarComponent } from './conteudo-editar/conteudo-editar.component';
import { EditarUserComponent } from './editar-user/editar-user.component';
import { HomeComponent } from './home/home.component';
import { MeusEstudosComponent } from './meus-estudos/meus-estudos.component';
import { SugestoesComponent } from './sugestoes/sugestoes.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConteudoEditarListaComponent } from './conteudo-editar-lista/conteudo-editar-lista.component';
import { SugestoesListaComponent } from './sugestoes-lista/sugestoes-lista.component';
import { FilterModule } from '../pipes/filtros/filter.module';

@NgModule({
  declarations: [
    AdicionarGrupoComponent,
    AdicionarUsersComponent,
    CategoriaComponent,
    CategoriaAdicionarComponent,
    CategoriaEditarComponent,
    ConteudoComponent,
    ConteudoAdicionarComponent,
    ConteudoEditarComponent,
    EditarUserComponent,
    HomeComponent,
    MeusEstudosComponent,
    SugestoesComponent,
    UsersComponent,
    LoginComponent,
    ConteudoEditarListaComponent,
    SugestoesListaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FilterModule
  ],
  exports:[
    AdicionarGrupoComponent,
    AdicionarUsersComponent,
    CategoriaComponent,
    CategoriaAdicionarComponent,
    ConteudoComponent,
    ConteudoAdicionarComponent,
    ConteudoEditarComponent,
    EditarUserComponent,
    HomeComponent,
    MeusEstudosComponent,
    SugestoesComponent,
    UsersComponent,
    LoginComponent,
    ConteudoEditarListaComponent
  ]
})
export class PagesModule { }
