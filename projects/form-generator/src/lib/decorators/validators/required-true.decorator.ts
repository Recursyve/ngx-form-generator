import { Validators } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function RequiredTrue(): PropertyDecorator {
    return ValidatorsHandler.setup(Validators.requiredTrue);
}
