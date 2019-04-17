import { Validators } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function Min(min: number): PropertyDecorator {
    return ValidatorsHandler.setup(Validators.min(min));
}
