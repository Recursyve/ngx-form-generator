import { Validators } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function MatchesPattern(pattern: string | RegExp): PropertyDecorator {
    return ValidatorsHandler.setup(Validators.pattern(pattern));
}
