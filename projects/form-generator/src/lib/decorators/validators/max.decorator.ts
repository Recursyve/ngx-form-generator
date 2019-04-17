import { Validators } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function Max(max: number): PropertyDecorator {
    return ValidatorsHandler.setup(Validators.max(max));
}
