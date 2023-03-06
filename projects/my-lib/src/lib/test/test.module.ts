import {NgModule} from '@angular/core';
import {TestComponent} from './test.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        TestComponent
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        TestComponent
    ]
})
class TestModule {
}
export {TestModule};
