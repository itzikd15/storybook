import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
    selector:        'test',
    templateUrl:     './test.component.html',
    styleUrls:       ['./test.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent implements OnInit {
    @Input() text1InputMode     = 'need to update'
    text2NoInputMode  = 'need to update'

    constructor(private cdr: ChangeDetectorRef) {}


    ngOnInit(): void {
        this.initBadge();
        this.cdr.detectChanges();

    }

    initBadge(): void {
        this.text1InputMode ="Updated"
        this.text2NoInputMode ="Updated"
    }
}

export {TestComponent};
