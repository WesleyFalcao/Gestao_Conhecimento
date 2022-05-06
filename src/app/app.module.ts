import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarModule } from './components/search-bar/searchbar.module';
import { LoginModule } from './pages/login/login.module';
import { GraphQLModule } from './graphql.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
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
