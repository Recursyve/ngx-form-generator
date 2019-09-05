import { GeneratedFormGroup } from "./forms";
import { GroupModel } from "./models/group.model";
import { NgxFormGeneratorScanner } from "./ngx-form-generator.scanner";

export function ngxFormGeneratorFactory(provider: any) {
    return () => {
        const group = new GeneratedFormGroup();
        group.setConfig({
            children: NgxFormGeneratorScanner.getControls(provider)
        } as GroupModel);
        return group;
    };
}
