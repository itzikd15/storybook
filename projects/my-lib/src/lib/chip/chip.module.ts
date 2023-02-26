import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {ChipComponent} from '../chip/chip.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [
        ChipComponent
    ],
    imports:      [
        MatIconModule,
        FlexLayoutModule,
        CommonModule
    ],
    exports:      [
        ChipComponent
    ]
})
class ChipModule {

}
export {ChipModule};
