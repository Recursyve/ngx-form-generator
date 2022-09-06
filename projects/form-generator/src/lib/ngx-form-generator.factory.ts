import { GeneratedFormGroup } from "./forms";
import { GroupModel } from "./models/group.model";
import { NgxFormGeneratorScanner } from "./ngx-form-generator.scanner";
import { AsyncValidator } from "./validators/async.validator";

export function ngxFormGeneratorFactory(provider: any) {
    return (asyncValidators: AsyncValidator[]) => {
        const updateOn = NgxFormGeneratorScanner.getUpdateOn(provider);
        const group = new GeneratedFormGroup(asyncValidators, { updateOn: updateOn ?? "change" });
        group.setConfig({
            instance: provider,
            children: NgxFormGeneratorScanner.getControls(provider)
        } as GroupModel);
        return group;
    };
}
