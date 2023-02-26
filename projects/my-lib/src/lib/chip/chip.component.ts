import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector:        'spt-chip',
    templateUrl:     './chip.component.html',
    styleUrls:       ['./chip.component.scss'],
    encapsulation:   ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class ChipComponent {
    @Input() label: string | undefined;

    @Input() isRemovable = true;

    @Input() isDisabled = false;

    @Input() isReadOnly = false;

    @Output() deleteClick: EventEmitter<MouseEvent>;

    @Output() doubleClick: EventEmitter<void>;

    constructor() {
        this.deleteClick = new EventEmitter<MouseEvent>();
        this.doubleClick = new EventEmitter<void>();
    }

    onClick($event: MouseEvent): void {
        this.deleteClick.emit($event);
    }

    onDoubleClick(): void {
        this.doubleClick.emit();
    }
}

export {ChipComponent};
