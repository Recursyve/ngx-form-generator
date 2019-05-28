import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { GeneratedFormControl } from "./forms/generated-form-control";
import { GeneratedFormGroup } from "./forms/generated-form-group";
import { ControlModel } from "./models/control.model";
import { GroupModel } from "./models/group.model";

@Injectable()
export class NgxFormGenerator {
    constructor(private builder: FormBuilder) {}

    public generateGroup(controls: (ControlModel | GroupModel)[], group?: FormGroup): FormGroup {
        if (!group) {
            group = this.builder.group({});
        }

        for (const control of controls) {
            let formControl: AbstractControl;
            if (control.type === "Array") {
                formControl = this.builder.array([]);
            } else if ((control as GroupModel).children) {
                formControl = new GeneratedFormGroup(this, (control as GroupModel).children);
            } else {
                formControl = new GeneratedFormControl(control);
            }
            group.addControl(control.name, formControl);
        }

        return group;
    }
}
