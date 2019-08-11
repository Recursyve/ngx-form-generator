/*
 * Public API Surface of form-generator
 */

import { ModuleWithProviders, NgModule, Provider, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GeneratedFormGroup } from "./lib/forms";
import { ngxFormGeneratorFactory } from "./lib/ngx-form-generator.factory";
import { NgxFormGeneratorScanner } from "./lib/ngx-form-generator.scanner";

@NgModule({
    imports: [FormsModule, ReactiveFormsModule]
})
export class NgxFormGeneratorModule {
    public static forFeature(...providers: Provider[]): ModuleWithProviders {
        const p = providers.map(x => {
            const value = (x as ValueProvider).useValue || x;
            const provide = (x as ValueProvider).provide || GeneratedFormGroup;
            return {
                provide: provide,
                useFactory: ngxFormGeneratorFactory(value),
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

export class NgxFormGeneratorProvider {
    public static forFeature(...providers: Provider[]): Provider[] {
        const res: Provider[] = [NgxFormGeneratorScanner];
        for (const provider of providers) {
            const value = (provider as ValueProvider).useValue || provider;
            const provide = (provider as ValueProvider).provide || GeneratedFormGroup;
            res.push({
                provide: provide,
                useFactory: ngxFormGeneratorFactory(value),
                deps: [NgxFormGeneratorScanner]
            })
        }
        return res;
    }
}

export * from "./lib/decorators";
export * from "./lib/forms";
