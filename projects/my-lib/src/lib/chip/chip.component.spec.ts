import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ChipComponent} from './chip.component';
import {TestUtils} from '../utils/utils';
import {ChangeDetectionStrategy, Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

const CSS_SELECTOR_CHIP_CONTAINER = 'spt-chip';
const CSS_SELECTOR_DELETE_BUTTON  = 'mat-icon';
const CSS_SELECTOR_LABEL          = '.label';
const CSS_SELECTOR_CHIP_DIV_CONTAINER = '.spt-chip';

describe('ChipComponent', () => {
    let fixture: ComponentFixture<ChipHostComponent>;
    let chipDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ChipHostComponent, ChipComponent]

        }).compileComponents();
    }));

    it('should create', () => {
        const template = '<spt-chip label="test"></spt-chip>';

        fixture          = TestUtils.createHostComponent<ChipHostComponent>(template, ChipHostComponent);
        chipDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_CHIP_CONTAINER));

        expect(chipDebugElement).toBeTruthy();
    });

    it('should display label', () => {
        const template = '<spt-chip label="test"></spt-chip>';

        fixture          = TestUtils.createHostComponent<ChipHostComponent>(template, ChipHostComponent);
        chipDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_LABEL));

        expect(chipDebugElement.nativeElement.innerText).toBe('test:');
    });

    it('should emit on click of close icon and doubleClick', () => {
        const template = '<spt-chip label="test" (deleteClick)="increment()" (doubleClick)="incrementDblClick()"></spt-chip>';

        fixture          = TestUtils.createHostComponent<ChipHostComponent>(template, ChipHostComponent);
        const closeIconDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_DELETE_BUTTON));
        const chipDivContainerDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_CHIP_DIV_CONTAINER));
        const DOUBLE_CLICK_EVENT_NAME = 'dblclick';

        TestUtils.click<ChipHostComponent>(fixture, closeIconDebugElement.nativeElement);
        chipDivContainerDebugElement.triggerEventHandler(DOUBLE_CLICK_EVENT_NAME, new MouseEvent(DOUBLE_CLICK_EVENT_NAME));
        fixture.detectChanges();

        expect(fixture.debugElement.componentInstance.clickCount).toBe(1);
        expect(fixture.debugElement.componentInstance.dblClickCount).toBe(1);
    });

    it('should handle content projection', () => {
        const PROJECTED_CONTENT_TEXT = 'Projected Content';
        const template = `<spt-chip label="test"><div>${PROJECTED_CONTENT_TEXT}</div></spt-chip>`;

        fixture          = TestUtils.createHostComponent<ChipHostComponent>(template, ChipHostComponent);
        const projectedContentDebugElement = fixture.debugElement.query(By.css(`${CSS_SELECTOR_CHIP_DIV_CONTAINER} div`));

        expect(projectedContentDebugElement.nativeElement.textContent).toBe(PROJECTED_CONTENT_TEXT);
    });

    describe('should apply correct classes and show/hide close icon', () => {
        it('should handle non-removable chip', () => {
            const template = '<spt-chip [isRemovable]="false"></spt-chip>';

            fixture          = TestUtils.createHostComponent<ChipHostComponent>(template, ChipHostComponent);
            const chipDivContainerDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_CHIP_DIV_CONTAINER));
            const iconDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_DELETE_BUTTON));

            expect(iconDebugElement).toBeNull();
            expect(chipDivContainerDebugElement.nativeElement).toHaveClass('spt-chip');
        });

        it('should handle a disabled chip', () => {
            const template = '<spt-chip [isDisabled]="true"></spt-chip>';

            fixture          = TestUtils.createHostComponent<ChipHostComponent>(template, ChipHostComponent);
            const chipDivContainerDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_CHIP_DIV_CONTAINER));
            const iconDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_DELETE_BUTTON));

            expect(iconDebugElement).toBeNull();
            expect(chipDivContainerDebugElement.nativeElement).toHaveClass('disabled');
        });

        it('should handle a read only chip', () => {
            const template = '<spt-chip [isReadOnly]="true"></spt-chip>';

            fixture          = TestUtils.createHostComponent<ChipHostComponent>(template, ChipHostComponent);
            const chipDivContainerDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_CHIP_DIV_CONTAINER));
            const iconDebugElement = fixture.debugElement.query(By.css(CSS_SELECTOR_DELETE_BUTTON));

            expect(iconDebugElement).toBeNull();
            expect(chipDivContainerDebugElement.nativeElement).toHaveClass('readOnly');
        });
    });
});

@Component({
    selector:        'spt-host-for-test',
    template:        '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
class ChipHostComponent {
	clickCount = 0;

    dblClickCount = 0;

    increment() {
	    this.clickCount++;
    }

    incrementDblClick() {
        this.dblClickCount++;
    }
}
