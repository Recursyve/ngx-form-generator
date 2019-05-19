import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
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
                formControl = this.generateGroup((control as GroupModel).children, this.builder.group({}));
            } else {
                formControl = this.builder.control(control.defaultValue, ...(control as ControlModel).validators);
            }
            group.addControl(control.name, formControl);
        }

        return group;
    }
}
