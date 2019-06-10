import { GeneratedFormGroup } from "./forms";
import { NgxFormGeneratorScanner } from "./ngx-form-generator.scanner";

export function ngxFormGeneratorFactory(provider: () => void) {
    return (scanner: NgxFormGeneratorScanner) => {
        const group = new GeneratedFormGroup();
        group.models = scanner.getControls(provider);
        return group;
    };
}
