import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarModule } from './components/search-bar/searchbar.module';
import { LoginModule } from './pages/login/login.module';
import { GraphQLModule } from './graphql.module';
import { HomeComponent } from './pages/home/home.component';
import { ConteudoComponent } from './pages/conteudo/conteudo.component';
import { ConteudoEditarComponent } from './pages/conteudo-editar/conteudo-editar.component';
import { InputComponent } from './components/input/input.component';
import { Header2Component } from './components/headers/header2/header2.component';
import { UsersComponent } from './pages/users/users.component';
import { VersionComponent } from './components/version/version.component';
import { AdicionarUsersComponent } from './pages/adicionar-users/adicionar-users.component';
import { EditarUserComponent } from './pages/editar-user/editar-user.component';
import { SugestoesComponent } from './pages/sugestoes/sugestoes.component';
import { ConteudoAdicionarComponent } from './pages/conteudo-adicionar/conteudo-adicionar.component';
import { InputConteudoComponent } from './components/input-conteudo/input-conteudo.component';
import { MeusEstudosComponent } from './pages/meus-estudos/meus-estudos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverComponent } from './components/popover/popover.component';
import { HeaderModule } from './components/headers/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { PopoverModule } from './components/popover/popover.module';
import { CategoriaAdicionarComponent } from './pages/categoria-adicionar/categoria-adicionar.component';
import { AdicionarGrupoComponent } from './pages/adicionar-grupo/adicionar-grupo.component';
import { CategoriaEditarComponent } from './pages/categoria-editar/categoria-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConteudoComponent,
    ConteudoEditarComponent,
    InputComponent,
    UsersComponent,
    VersionComponent,
    AdicionarUsersComponent,
    EditarUserComponent,
    SugestoesComponent,
    ConteudoAdicionarComponent,
    InputConteudoComponent,
    MeusEstudosComponent,
    CategoriaComponent,
    CategoriaAdicionarComponent,
    AdicionarGrupoComponent,
    CategoriaEditarComponent
  ],
  imports: [
    HeaderModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SearchBarModule,
    PopoverModule,
    GraphQLModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
