import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

    @Input() text: string | undefined;
    @Output() click: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onclick(){
        this.click.emit();
    }
}
