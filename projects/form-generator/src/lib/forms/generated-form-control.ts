import { FormControl } from "@angular/forms";
import { ControlModel } from "../models/control.model";
import { GeneratedControl } from "./generated-control";

export class GeneratedFormControl<T> extends FormControl implements GeneratedControl {
    constructor(private model: ControlModel) {
        super(model.defaultValue, model.validators);
    }

    public getRawValue(): T {
        switch (this.model.type) {
            case "Number":
                return +this.value as any;
            case "Date":
                const date = this.value as Date;
                return new Date(Date.UTC(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    date.getUTCHours(),
                    date.getUTCMinutes(),
                    date.getUTCSeconds(),
                    date.getUTCMilliseconds()
                )) as any;
            default:
                return this.value;
        }
    }
}
