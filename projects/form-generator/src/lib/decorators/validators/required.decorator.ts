import { Validators } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function Required(): PropertyDecorator {
    return ValidatorsHandler.setup(Validators.required);
}
