import { AbstractControl } from "@angular/forms";
import { defer, MonoTypeOperatorFunction, startWith } from "rxjs";

/**
 * Returns an observable that, at the moment of subscription, will emit the current value of the AbstractControl
 */
export function startWithCurrentControlValue<T>(control: AbstractControl): MonoTypeOperatorFunction<T> {
    return source => defer(() => {
        return source.pipe(startWith(control.value));
    });
}
