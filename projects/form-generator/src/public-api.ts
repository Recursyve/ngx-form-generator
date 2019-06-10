/*
 * Public API Surface of form-generator
 */

import { ModuleWithProviders, NgModule, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ngxFormGeneratorFactory } from "./lib/ngx-form-generator.factory";
import { NgxFormGeneratorScanner } from "./lib/ngx-form-generator.scanner";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule]
})
export class NgxFormGeneratorModule {
    public static forFeature(...providers: ValueProvider[]): ModuleWithProviders {
        const p = providers.map(x => {
            return {
                provide: x.provide,
                useFactory: ngxFormGeneratorFactory(x.useValue),
                deps: [NgxFormGeneratorScanner]
            };
        });
        return {
            ngModule: NgxFormGeneratorModule,
            providers: [
                NgxFormGeneratorScanner,
                ...p
            ]
        };
    }
}

export * from "./lib/decorators";
export * from "./lib/forms";
