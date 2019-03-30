import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { AlertService } from './services/alert.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component'
@NgModule({
  declarations: [
    MenuComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule

  ],
  exports: [
    MenuComponent,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent
  ],
  providers: [
    AlertService
  ]
})
export class SharedsModule { }
