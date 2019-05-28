import { FormControl } from "@angular/forms";
import { ControlModel } from "../models/control.model";

export class GeneratedFormControl extends FormControl {
    constructor(control: ControlModel) {
        super(control.defaultValue, control.validators);
    }
}
