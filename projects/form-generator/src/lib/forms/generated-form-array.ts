import { AbstractControl, FormArray } from "@angular/forms";
import { ArrayModel } from "../models/array.model";
import { GeneratedFormGroup } from "./generated-form-group";
import { GeneratedFormControl } from "./generated-form-control";
import { GeneratedControl } from "./generated-control";

export class GeneratedFormArray<T> extends FormArray implements GeneratedControl {
    public controls: GeneratedControl[];

    constructor(private model: ArrayModel) {
        super([]);
    }

    public push(): void {
        super.push(this.getControl());
    }

    public insert(index: number): void {
        super.insert(index, this.getControl());
    }

    public getRawValue(): T[] {
        return this.controls.map(x => x.getRawValue());
    }

    private getControl(): AbstractControl {
        return this.model.children ? new GeneratedFormGroup(this.model.children) : new GeneratedFormControl(this.model);
    }
}
