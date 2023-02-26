import { NgModule } from '@angular/core';
import { MyLibComponent } from './my-lib.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    MyLibComponent,
    ButtonComponent
  ],
  imports: [
  ],
  exports: [
    MyLibComponent
  ]
})
export class MyLibModule { }
