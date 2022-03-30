import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { AsyncValidator } from "../../../projects/form-generator/src/public-api";
import { Observable } from "rxjs";
import { registerAsyncValidatorDecorator } from "../../../projects/form-generator/src/lib/decorators";

export function AsyncValidation() {
    return registerAsyncValidatorDecorator({
        name: "AsyncValidation"
    });
}

@Injectable()
export class AsyncValidationValidator extends AsyncValidator {
    public name = "AsyncValidation";

    constructor(private httpClient: HttpClient) {
        super();
    }

    public validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        console.log(this.httpClient);
        return Promise.resolve({ test: "TEST" });
    }
}
