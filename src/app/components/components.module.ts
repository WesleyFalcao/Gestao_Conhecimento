import { PopoverComponent } from './popover/popover.component';
import { VersionComponent } from './version/version.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { InputComponent } from './input/input.component';
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
import { HeaderNoSearchComponent } from './header-no-search/header-no-search.component';

@NgModule({
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    HeaderComponent,
    InputComponent,
    InputConteudoComponent,
    LoadingComponent,
    SearchBarComponent,
    SnackbarComponent,
    TitleComponent,
    VersionComponent,
    PopoverComponent,
    SelectionModalComponent,
    SelectionInputComponent,
    FilterModalComponent,
    AlertModalComponent,
    HeaderNoSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FilterModule
  ],
  exports: [
    ButtonComponent,
    CheckboxComponent,
    HeaderComponent,
    InputComponent,
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
    HeaderNoSearchComponent
  ]
})
export class ComponentsModule { }
