import { provideHttpClient } from "@angular/common/http";
import type { ApplicationConfig } from "@angular/core";
import { provideZoneChangeDetection } from "@angular/core";
import { provideNgxFormGenerator } from "../../projects/form-generator/src/lib/providers";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(),

        provideNgxFormGenerator()
    ]
};
