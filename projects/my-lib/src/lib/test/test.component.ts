import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

@Component({
    selector:        'test',
    templateUrl:     './test.component.html',
    styleUrls:       ['./test.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent implements OnInit {
    @Input() text1InputMode     = ''
    text2NoInputMode   = 'need to update'

    ngOnInit(): void {
        this.text2NoInputMode ="Updated"
    }

}

export {TestComponent};
