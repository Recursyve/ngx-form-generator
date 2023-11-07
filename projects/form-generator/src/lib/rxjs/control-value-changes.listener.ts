import { AbstractControl } from "@angular/forms";
import { Observable, startWith } from "rxjs";
import { startWithCurrentControlValue } from "./start-with-current-control-value.operator";

export const controlValueChangesListener = <T>(control: AbstractControl<T>, options?: { startWith?: T }): Observable<T> => {
    if (options?.startWith) {
        return control.valueChanges.pipe(startWith(options.startWith));
    }

    return control.valueChanges.pipe(startWithCurrentControlValue(control));
};
