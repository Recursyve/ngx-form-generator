import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ControlModel } from "./models/control.model";
import { GroupModel } from "./models/group.model";
import { NgxFormGenerator } from "./ngx-form-generator";

@Injectable()
export class GeneratedFormGroup<T> extends FormGroup {
    constructor(private generator: NgxFormGenerator, private models: (ControlModel | GroupModel)[]) {
        super(generator.generateGroup(models).controls);
    }

    public patchValue(value: { [p: string]: any }, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    }

    public markAsDirty(): void {
    }

    public getRawValue(): T {
        return {} as T;
    }

    public copy(): FormGroup {
        return this.generator.generateGroup(this.models);
    }
}
