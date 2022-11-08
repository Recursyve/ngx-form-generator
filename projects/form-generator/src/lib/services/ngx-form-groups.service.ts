import { Inject, Injectable, Optional, Type } from "@angular/core";
import { AsyncValidator, NGX_FORM_GENERATOR_ASYNC_VALIDATORS } from "../validators";
import { GeneratedFormGroup } from "../forms";
import { NgxFormGeneratorScanner } from "../ngx-form-generator.scanner";
import { GroupModel } from "../models/group.model";

@Injectable()
export class NgxFormGroupsService {
    constructor(@Optional() @Inject(NGX_FORM_GENERATOR_ASYNC_VALIDATORS) private asyncValidators: AsyncValidator[] = []) {}

    public generate<T>(formGroupType: Type<T>): GeneratedFormGroup<T> {
        const formGroup = new GeneratedFormGroup<T>(this.asyncValidators);
        formGroup.setConfig({
            instance: formGroupType,
            children: NgxFormGeneratorScanner.getControls(formGroupType)
        } as GroupModel);
        return formGroup;
    }
}
