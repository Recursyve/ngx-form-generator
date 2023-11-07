import { AbstractControl } from "@angular/forms";
import { defer, MonoTypeOperatorFunction, startWith } from "rxjs";

export function startWithControlCurrentValue<T>(control: AbstractControl): MonoTypeOperatorFunction<T> {
    return source => defer(() => {
        return source.pipe(startWith(control.value));
    });
}
