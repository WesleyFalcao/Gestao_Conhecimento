import { PopoverComponent } from './popover/popover.component';
import { VersionComponent } from './version/version.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { InputConteudoComponent } from './input-conteudo/input-conteudo.component';
import { LoadingComponent } from './loading/loading.component';
import { SearchBarComponent } from './search-bar/searchbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './title/title.component';
import { SelectionModalComponent } from './selection-modal/selection-modal.component';
import { SelectionInputComponent } from './selection-input/selection-input.component';
import { FilterModule } from '../pipes/filter/filter.module';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AnimationNothingFoundComponent } from './animation-nothing-found/animation-nothing-found.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ButtonFilterComponent } from './button-filter/button-filter.component';
import { SendSuggestionComponent } from './send-suggestion/send-suggestion.component';
import { Input2Component } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AnimationNotAllowedComponent } from './animation-not-allowed/animation-not-allowed.component';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    HeaderComponent,
    InputConteudoComponent,
    LoadingComponent,
    SearchBarComponent,
    SnackbarComponent,
    PaginatorComponent,
    TitleComponent,
    VersionComponent,
    PopoverComponent,
    SelectionModalComponent,
    SelectionInputComponent,
    FilterModalComponent,
    AlertModalComponent,
    AnimationNothingFoundComponent,
    ButtonFilterComponent,
    SendSuggestionComponent,
    Input2Component,
    ModalComponent,
    AnimationNotAllowedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NzPopoverModule,
    FilterModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
    PaginatorComponent,
    ButtonComponent,
    CheckboxComponent,
    HeaderComponent,
    InputConteudoComponent,
    LoadingComponent,
    SearchBarComponent,
    PopoverComponent,
    TitleComponent,
    VersionComponent,
    SelectionModalComponent,
    SelectionInputComponent,
    FilterModalComponent,
    AlertModalComponent,
    ButtonFilterComponent,
    SnackbarComponent,
    AnimationNothingFoundComponent,
    SendSuggestionComponent,
    Input2Component,
    ModalComponent
  ]
})
export class ComponentsModule { }
