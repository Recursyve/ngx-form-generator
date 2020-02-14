import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export abstract class AsyncValidator {
    public abstract name: string;
    public abstract validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}
