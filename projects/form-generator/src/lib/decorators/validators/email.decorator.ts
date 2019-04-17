import { Validators } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function Email(): PropertyDecorator {
    return ValidatorsHandler.setup(Validators.email);
}
