/*
 * Public API Surface of form-generator
 */

import { ClassProvider, FactoryProvider, ModuleWithProviders, NgModule, Provider, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GeneratedFormGroup } from "./lib/forms";
import { ngxFormGeneratorFactory } from "./lib/ngx-form-generator.factory";
import { NGX_FORM_GENERATOR_ASYNC_VALIDATORS } from "./lib/validators";
import { NgxFormGroupsService } from "./lib/services/ngx-form-groups.service";

export interface NgxFormGeneratorOptions {
    asyncValidators?: Provider[];
}

// @dynamic
@NgModule({
    imports: [FormsModule, ReactiveFormsModule],
    providers: [NgxFormGroupsService]
})
export class NgxFormGeneratorModule {
    public static forRoot(options: NgxFormGeneratorOptions = {}): ModuleWithProviders<NgxFormGeneratorModule> {
        return {
            ngModule: NgxFormGeneratorModule,
            providers: options?.asyncValidators?.map((provider) => {
                const p = {
                    provide: NGX_FORM_GENERATOR_ASYNC_VALIDATORS,
                    multi: true
                } as Provider;
                if ((provider as FactoryProvider).useFactory) {
                    (p as FactoryProvider).useFactory = (provider as FactoryProvider).useFactory;
                    (p as FactoryProvider).deps = (provider as FactoryProvider).deps;
                } else {
                    (p as ClassProvider).useClass = (provider as ClassProvider).useClass ?? provider as any;
                }
                return p;
            }) ?? [
                {
                    provide: NGX_FORM_GENERATOR_ASYNC_VALIDATORS,
                    useValue: null,
                    multi: true
                }
            ]
        };
    }

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
            useFactory: ngxFormGeneratorFactory((provider as ValueProvider).useValue || provider),
            deps: [NGX_FORM_GENERATOR_ASYNC_VALIDATORS]
        }));
    }
}

export * from "./lib/decorators";
export * from "./lib/forms";
export * from "./lib/validators";
export * from "./lib/ngx-form-generator.factory";
export * from "./lib/handlers/validators.handler";
export * from "./lib/rxjs/start-with-control-current-value.operator";
export * from "./lib/services/ngx-form-groups.service";
