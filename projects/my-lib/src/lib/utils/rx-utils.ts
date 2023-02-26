import {combineLatest, Observable, OperatorFunction} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';

export function waitFor<U>(condition$: Observable<boolean>): OperatorFunction<U, U> {
    return (src$: Observable<U>) => combineLatest([
        src$,
        condition$.pipe(
            filter((condition) => condition),
            take(1)
        )
    ]).pipe(
        map(([src]) => src)
    );
}
