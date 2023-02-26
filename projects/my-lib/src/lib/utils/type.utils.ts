/**
 * a typed version of Angular's SimpleChanges,
 * based on: https://netbasal.com/create-a-typed-version-of-simplechanges-in-angular-451f86593003)
 */
export type NgChangesMap<TComponent> = {
    [Key in keyof TComponent]?: NgChange<TComponent, Key>
};

export type NgChange<TComponent, Key extends keyof TComponent> = {
    previousValue: TComponent[Key];
    currentValue: TComponent[Key];
    firstChange: boolean;
    isFirstChange(): boolean;
}

/**
 * constrains that the a specific key of T "points to" a string value,
 * for example:
 * ```
 *     interface Test {
 *        foo: string;
 *        juju: number;
 *        kuku?: string;
 *     }
 *
 *     const key1: StringValueField<Test> = 'foo';  // no error
 *     const key2: StringValueField<Test> = 'juju'; // error
 *     const key3: StringValueField<Test> = 'kuku'; // error if "strictNullChecks" is on
 *     const key4: StringValueField<Test> = 'oops'; // error
 * ```
 */
export type StringValueField<T> = {
    [k in keyof T]: T[k] extends string ? k : never
}[keyof T]

export type PublicInterface<T> = {
    [Prop in keyof T]: T[Prop]
}
