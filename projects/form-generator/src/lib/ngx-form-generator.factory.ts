import { GeneratedFormGroup } from "./forms/generated-form-group";
import { NgxFormGenerator } from "./ngx-form-generator";
import { NgxFormGeneratorScanner } from "./ngx-form-generator.scanner";

export function ngxFormGeneratorFactory(provider: () => void) {
    return (generator: NgxFormGenerator, scanner: NgxFormGeneratorScanner) => {
        return new GeneratedFormGroup(generator, scanner.getControls(provider));
    };
}
