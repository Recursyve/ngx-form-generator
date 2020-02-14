/*
 * Public API Surface of form-generator
 */

import { ModuleWithProviders, NgModule, Provider, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GeneratedFormGroup } from "./lib/forms";
import { ngxFormGeneratorFactory } from "./lib/ngx-form-generator.factory";

// @dynamic
@NgModule({
    imports: [FormsModule, ReactiveFormsModule]
})
export class NgxFormGeneratorModule {
    public static forFeature(providers: Provider[]): ModuleWithProviders<NgxFormGeneratorModule> {
        return {
            ngModule: NgxFormGeneratorModule,
            providers: providers.map(provider => ({
                provide: (provider as ValueProvider).provide || GeneratedFormGroup,
                useFactory: ngxFormGeneratorFactory((provider as ValueProvider).useValue || provider)
            }))
        };
    }
}

// @dynamic
export class NgxFormGeneratorProvider {
    public static forFeature(providers: Provider[]): Provider[] {
        return providers.map(provider => ({
            provide: (provider as ValueProvider).provide || GeneratedFormGroup,
            useFactory: ngxFormGeneratorFactory((provider as ValueProvider).useValue || provider)
        }));
    }
}

export * from "./lib/decorators";
export * from "./lib/forms";
export * from "./lib/ngx-form-generator.factory";
export * from "./lib/handlers/validators.handler";
