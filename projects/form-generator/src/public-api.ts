/*
 * Public API Surface of form-generator
 */

import { ModuleWithProviders, NgModule, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxFormGenerator } from "./lib/ngx-form-generator";
import { ngxFormGeneratorFactory } from "./lib/ngx-form-generator.factory";
import { NgxFormGeneratorScanner } from "./lib/ngx-form-generator.scanner";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule]
})
export class NgxFormGeneratorModule {
    public static forFeature(...providers: ValueProvider[]): ModuleWithProviders {
        return {
            ngModule: NgxFormGeneratorModule,
            providers: [
                NgxFormGenerator,
                NgxFormGeneratorScanner,
                ...providers.map(x => {
                    return {
                        provide: x.provide,
                        useFactory: ngxFormGeneratorFactory(x.useValue as () => void),
                        deps: [NgxFormGenerator, NgxFormGeneratorScanner]
                    };
                })
            ]
        };
    }
}

export * from "./lib";
export * from "./lib/decorators";
