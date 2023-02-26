import {waitFor} from './rx-utils';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TestScheduler} from 'rxjs/testing';

describe('waitFor operator', () => {
    const boolValues = {
        t: true,
        f: false
    };

    let testScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should not emit if condition$ has not emitted "true"', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const condition = 'f---------';
            const src =       'abcde';
            const expected =  '';

            const condition$ = hot(condition, boolValues);
            const src$ = hot(src);
            const result$ = src$.pipe(waitFor(condition$));

            expectObservable(result$).toBe(expected);
        });
    });

    it('should start from the last value of src$ once condition$ emits true', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const condition = 'f-------t-----';
            const src =       'a----b----c----d----e';
            const expected =  '--------b-c----d----e';

            const condition$ = hot(condition, boolValues);
            const src$ =       hot(src);
            const result$ = src$.pipe(waitFor(condition$));

            expectObservable(result$).toBe(expected);
        });
    });

    it('should just emit src$ if condition$ is already "true"', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const condition = 't-----';
            const src =       '---abcde';
            const expected =  '---abcde';

            const condition$ = hot(condition, boolValues);
            const src$ = hot(src);
            const result$ = src$.pipe(waitFor(condition$));

            expectObservable(result$).toBe(expected);
        });
    });

    it('should continue emitting src$ if condition$ turns from "true" to "false"', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const condition = 't-f-f-';
            const src =       '---abcde';
            const expected =  '---abcde';

            const condition$ = hot(condition, boolValues);
            const src$ = hot(src);
            const result$ = src$.pipe(waitFor(condition$));

            expectObservable(result$).toBe(expected);
        });

    });

    describe('side effects (e.g. "tap")', () => {
        describe('"tap" before "waitFor"', () => {
            it('side effects should not wait for condition', () => {
                testScheduler.run(({hot, expectObservable}) => {
                    const subject = new Subject();
                    const fromSubject$ = subject.asObservable();

                    const condition =           'f-------t-----';
                    const src =                 'a----b----c----d----e--';
                    const expectedSideEffect =  'a----b----c----d----e--';

                    const condition$ = hot(condition, boolValues);
                    const src$ = hot(src);

                    src$.pipe(
                        tap(val => {
                            subject.next(val);
                        }),
                        waitFor(condition$)
                    ).subscribe();

                    expectObservable(fromSubject$).toBe(expectedSideEffect);
                });
            });
        });
        describe('"waitFor" before "tap" ', () => {
            it('side effects should wait for condition', () => {
                testScheduler.run(({hot, expectObservable}) => {
                    const subject = new Subject();
                    const fromSubject$ = subject.asObservable();

                    const condition =           'f-------t-----';
                    const src =                 'a----b----c----d----e--';
                    const expectedSideEffect =  '--------b-c----d----e--';

                    const condition$ = hot(condition, boolValues);
                    const src$ = hot(src);

                    src$.pipe(
                        waitFor(condition$),
                        tap(val => {
                            subject.next(val);
                        })
                    ).subscribe();

                    expectObservable(fromSubject$).toBe(expectedSideEffect);
                });
            });
        });
    });
});
