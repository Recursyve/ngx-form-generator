import { FormControl } from "@angular/forms";
import { ControlModel } from "../models/control.model";
import { GeneratedControl } from "./generated-control";

export class GeneratedFormControl extends FormControl implements GeneratedControl {
    constructor(private model: ControlModel) {
        super(model.defaultValue, model.validators);
    }

    public getRawValue(): unknown {
        switch (this.model.type) {
            case "Number":
                return +this.value;
            case "Date":
                return new Date(this.value).toISOString();
            default:
                return this.value;
        }
    }
}
