import {ChangeDetectionStrategy, Component, Input, DoCheck} from '@angular/core';

@Component({
    selector:        'test',
    templateUrl:     './test.component.html',
    styleUrls:       ['./test.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent implements DoCheck {
    @Input() text1InputMode = 'need to update'
    text2NoInputMode = 'need to update'

    ngDoCheck(): void {
        this.initBadge();
    }

    initBadge(): void {
        this.text1InputMode ="Updated"
        this.text1InputMode ="Updated"
    }
}

export {TestComponent};
