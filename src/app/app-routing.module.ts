import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { AuthGuard } from './guards/auth-guard';


const routes: Routes = [

  { path: 'home', component: HomeComponent,
    data: { animation: "HomePage" },
    canActivate: [AuthGuard],
  },
  { path: 'meus-estudos', component: MeusEstudosComponent,
    canActivate: [AuthGuard]
  },
  { path: 'conteudo/:id', component: ConteudoComponent,
    canActivate: [AuthGuard]
  },
  { path: 'conteudo-editar/:id', component: ConteudoEditarComponent,
    data: {b_only_admin: true},
    canActivate: [AuthGuard]
  },
  { path: 'conteudo-lista', component: ConteudoEditarListaComponent,
    canActivate: [AuthGuard]
  },
  { path: 'conteudo-adicionar', component: ConteudoAdicionarComponent,
    data: {b_only_admin: true},
    canActivate: [AuthGuard]  
  },
  { path: 'usuarios', component: UsersComponent,
  data: {b_only_admin: true},
  canActivate: [AuthGuard]  
  },
  { path: 'adicionar-usuario', component: AdicionarUsersComponent,
  data: {b_only_admin: true},
  canActivate: [AuthGuard]
  },
  { path: 'editar-usuario/:id', component: EditarUserComponent,
  data: {b_only_admin: true},
  canActivate: [AuthGuard]  
  },
  { path: 'sugestoes', component: SugestoesComponent,
  canActivate: [AuthGuard]  
  },
  { path: 'sugestoes-lista', component: SugestoesListaComponent,
  data: {b_only_admin: true},
  canActivate: [AuthGuard] 
  },
  { path: 'sugestao-adicionar', component: SugestaoAdicionarComponent,
  canActivate: [AuthGuard]
  },
  { path: 'categorias', component: CategoriaComponent,
  data: {b_only_admin: true},
  canActivate: [AuthGuard]  
  },
  { path: 'categoria-adicionar', component: CategoriaAdicionarComponent,
  data: {b_only_admin: true},
  canActivate: [AuthGuard]
  },
  { path: 'categoria-editar/:id', component: CategoriaEditarComponent,
  data: {b_only_admin: true},
  canActivate: [AuthGuard]  
  },
  { path: '', component: LoginComponent,
    data: { animation: "LoginPage" },
  },
  { path: '**', component: LoginComponent,
    data: { animation: "LoginPage" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
