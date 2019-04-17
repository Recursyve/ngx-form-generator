import { Validators } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function MinLength(min: number): PropertyDecorator {
    return ValidatorsHandler.setup(Validators.minLength(min));
}
