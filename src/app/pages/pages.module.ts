import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { AdicionarUsersComponent } from './usuario/usuario-adicionar/usuario-adicionar.component';
import { CategoriaComponent } from './categorias/categorias-lista/categoria.component';
import { CategoriaAdicionarComponent } from './categorias/categoria-adicionar/categoria-adicionar.component';
import { CategoriaEditarComponent } from './categorias/categoria-editar/categoria-editar.component';
import { ConteudoComponent } from './conteudo/conteudo-card/conteudo.component';
import { ConteudoAdicionarComponent } from './conteudo/conteudo-adicionar/conteudo-adicionar.component';
import { ConteudoEditarComponent } from './conteudo/conteudo-editar/conteudo-editar.component';
import { EditarUserComponent } from './usuario/usuario-editar/usuario-editar.component';
import { HomeComponent } from './home/home.component';
import { MeusEstudosComponent } from './meus-estudos/meus-estudos.component';
import { SugestoesComponent } from './sugestoes/sugestoes-card/sugestoes.component';
import { UsersComponent } from './usuario/usuarios-lista/usuarios-lista.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConteudoEditarListaComponent } from './conteudo/conteudo-lista/conteudo-lista.component';
import { SugestoesListaComponent } from './sugestoes/sugestoes-lista/sugestoes-lista.component';
import { FilterModule } from '../pipes/filter/filter.module';
import { SugestaoAdicionarComponent } from './sugestoes/sugestao-adicionar/sugestao-adicionar.component';

@NgModule({
  declarations: [
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
    SugestoesListaComponent,
    SugestaoAdicionarComponent
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
