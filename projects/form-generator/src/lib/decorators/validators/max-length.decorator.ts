import { Validators } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function MaxLength(max: number): PropertyDecorator {
    return ValidatorsHandler.setup(Validators.maxLength(max));
}
