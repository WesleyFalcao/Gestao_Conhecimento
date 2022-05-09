import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarModule } from './components/search-bar/searchbar.module';
import { LoginModule } from './pages/login/login.module';
import { GraphQLModule } from './graphql.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ConteudoComponent } from './pages/conteudo/conteudo.component';
import { ConteudoEditarComponent } from './pages/conteudo-editar/conteudo-editar.component';
import { InputComponent } from './components/input/input.component';
import { Header2Component } from './components/header2/header2.component';
import { UsersComponent } from './pages/users/users.component';
import { PaginatorModule } from './components/paginator/paginator.module';
import { VersionComponent } from './components/version/version.component';
import { AdicionarUsersComponent } from './pages/adicionar-users/adicionar-users.component';
import { EditarUserComponent } from './pages/editar-user/editar-user.component';
import { SugestoesComponent } from './pages/sugestoes/sugestoes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConteudoComponent,
    HeaderComponent,
    ConteudoEditarComponent,
    InputComponent,
    Header2Component,
    UsersComponent,
    VersionComponent,
    AdicionarUsersComponent,
    EditarUserComponent,
    SugestoesComponent,
  ],
  imports: [
    PaginatorModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    SearchBarModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
