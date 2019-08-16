/*
 * Public API Surface of form-generator
 */

import { ModuleWithProviders, NgModule, Provider, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GeneratedFormGroup } from "./lib/forms";
import { ngxFormGeneratorFactory } from "./lib/ngx-form-generator.factory";
import { NgxFormGeneratorScanner } from "./lib/ngx-form-generator.scanner";

// @dynamic
@NgModule({
    imports: [FormsModule, ReactiveFormsModule]
})
export class NgxFormGeneratorModule {
    public static forFeature(providers: Provider[]): ModuleWithProviders {
        return {
            ngModule: NgxFormGeneratorModule,
            providers: [
                NgxFormGeneratorScanner,
                ...providers.map(provider => {
                    return {
                        provide: (provider as ValueProvider).provide || GeneratedFormGroup,
                        useFactory: ngxFormGeneratorFactory((provider as ValueProvider).useValue || provider),
                        deps: [NgxFormGeneratorScanner]
                    };
                })
            ]
        };
    }
}

// @dynamic
export class NgxFormGeneratorProvider {
    public static forFeature(providers: Provider[]): Provider[] {
        return [
                ...providers.map(provider => ({
                provide: (provider as ValueProvider).provide || GeneratedFormGroup,
                useFactory: ngxFormGeneratorFactory((provider as ValueProvider).useValue || provider),
                deps: [NgxFormGeneratorScanner]
            })),
            NgxFormGeneratorScanner
        ];
    }
}

export * from "./lib/decorators";
export * from "./lib/forms";
