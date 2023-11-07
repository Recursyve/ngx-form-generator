import { AbstractControl } from "@angular/forms";
import { Observable, startWith } from "rxjs";
import { startWithCurrentControlValue } from "./start-with-current-control-value.operator";

/**
 * Returns an observable that listen on the valueChanges of a form control. By default, it will start with the current value
 * in the form control.
 * @param control The AbstractControl to listen on valueChanges
 * @param options If a startWith is provided, it will use this value instead of the current value of the AbstractControl
 */
export const controlValueChangesListener = <T>(control: AbstractControl<T>, options?: { startWith?: T }): Observable<T> => {
    if (options && "startWith" in options) {
        return control.valueChanges.pipe(startWith(options.startWith as T));
    }

    return control.valueChanges.pipe(startWithCurrentControlValue(control));
};
