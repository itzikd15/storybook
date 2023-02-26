import {ChangeDetectorRef, Type} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

/**
 * Wrapper Class for testing utils
 */
export class TestUtils {
    static createHostComponent<T>(template: string, hostComponent: Type<T>): ComponentFixture<T> {
        TestBed.overrideComponent(hostComponent, {set: {template}});
        const fixture = TestBed.createComponent(hostComponent);

        fixture.detectChanges();

        return fixture as ComponentFixture<T>;
    }

    static async setInputValue<T>(fixture: ComponentFixture<T>, selector: string, value: string): Promise<void> {
        const input = fixture.debugElement.query(By.css(selector)).nativeElement;

        input.value = value;
        input.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        await fixture.whenStable();
    }

    static async click<T>(fixture: ComponentFixture<T>, nativeElement: HTMLElement): Promise<void> {
        await nativeElement.click();

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    }

    static async runOnPushChangeDetection<T>(fixture: ComponentFixture<T>): Promise<void> {
        const changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);

        changeDetectorRef.detectChanges();

        return fixture.whenStable();
    }
}
