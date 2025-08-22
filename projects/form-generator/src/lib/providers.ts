import {
    ClassProvider,
    EnvironmentProviders,
    FactoryProvider,
    makeEnvironmentProviders,
    Provider, ValueProvider
} from "@angular/core";
import { GeneratedFormGroup } from "./forms";
import { ngxFormGeneratorFactory } from "./ngx-form-generator.factory";
import { NgxFormGeneratorOptions } from "./options";
import { NgxFormGroupsService } from "./services/ngx-form-groups.service";
import { NGX_FORM_GENERATOR_ASYNC_VALIDATORS } from "./validators";

export function provideNgxFormGenerator(options: NgxFormGeneratorOptions = {}): EnvironmentProviders {
    if (!options.asyncValidators) {
        return makeEnvironmentProviders([
            NgxFormGroupsService,
            {
                provide: NGX_FORM_GENERATOR_ASYNC_VALIDATORS,
                useValue: null,
                multi: true
            }
        ]);
    }

    return makeEnvironmentProviders([
        NgxFormGroupsService,
        ...provideNgxFormGeneratorAsyncValidators(options.asyncValidators)
    ]);
}

export function provideNgxFormGeneratorAsyncValidators(asyncValidators: Provider[]): Provider[] {
    return asyncValidators.map((provider) => {
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
    });
}

export function provideNgxGeneratedFormGroup(...providers: Provider[]): Provider[] {
    return providers.map(provider => ({
        provide: (provider as ValueProvider).provide || GeneratedFormGroup,
        useFactory: ngxFormGeneratorFactory((provider as ValueProvider).useValue || provider),
        deps: [NGX_FORM_GENERATOR_ASYNC_VALIDATORS]
    }));
}
