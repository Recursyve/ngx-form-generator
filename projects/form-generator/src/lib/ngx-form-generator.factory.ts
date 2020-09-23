import { GeneratedFormGroup } from "./forms";
import { GroupModel } from "./models/group.model";
import { NgxFormGeneratorScanner } from "./ngx-form-generator.scanner";
import { AsyncValidator } from "./validators/async.validator";

export function ngxFormGeneratorFactory(provider: any) {
    return (asyncValidators: AsyncValidator[]) => {
        const group = new GeneratedFormGroup(asyncValidators);
        group.setConfig({
            instance: provider,
            children: NgxFormGeneratorScanner.getControls(provider)
        } as GroupModel);
        return group;
    };
}
