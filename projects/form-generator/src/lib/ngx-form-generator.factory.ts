import { GeneratedFormGroup } from "./forms";
import { NgxFormGeneratorScanner } from "./ngx-form-generator.scanner";

export function ngxFormGeneratorFactory(provider: () => void) {
    return (scanner: NgxFormGeneratorScanner) => {
        return new GeneratedFormGroup(scanner.getControls(provider));
    };
}
