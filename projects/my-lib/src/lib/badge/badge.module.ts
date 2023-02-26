import {NgModule} from '@angular/core';
import {BadgeComponent} from './badge.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        BadgeComponent
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        BadgeComponent
    ]
})
class BadgeModule {
}
export {BadgeModule};
