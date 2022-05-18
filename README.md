# NgxFormGenerator

NgxFormGenerator is an Angular ReactiveForms helper that will make your form cleaner and safer.

## Installation

```
npm install --save @recursyve/ngx-form-generator
```

## Usage example

NgxFormGenerator will generate an implementation of FormGroup for you. We use decorators to describe our FormGroup.

```typescript
import { Control } from "@recursyve/ngx-form-generator"

class TestForm {
    @Control()
    example: string;
    
    @Control()
    date: Date;
    
    @Control()
    year: number;
}
```

This will generate a FormGroup that is equivalent to this FormBuilder example

```typescript
const group = builder.group({
    example: [''],
    date: [null],
    year: [null]
});
```

If you want to use validators on your controls, you can add them on top of each property

```typescript
import { Control, Required } from "@recursyve/ngx-form-generator"

class TestForm {
    @Control()
    @Required()
    example: string;
    
    @Control()
    @Required()
    date: Date;
    
    @Control()
    @Required()
    year: number;
}
```

The next step is load TestForm in your module

```typescript
@Module({
    import: [
        BrowserModule,
        NgxFormGeneratorModule.forFeature([
            {
                provide: "Test",
                useValue: TestForm
            }
        ]),
    ]
})
class AppModule {
}
```

You can now load your generated FormGroup in your component

```typescript
@Component({
    selector: "app-root",
    templateUrl: "app.template.html"
})
class AppCompnent {
    constructor(@Inject("Test") public formGroup: GeneratedFormGroup<TestForm>) {}
}
```

You can also provide your form directly in the components

```typescript
@Component({
    selector: "app-root",
    templateUrl: "app.template.html",
    providers: NgxFormGeneratorProvider.forFeature([TestForm])
})
class AppCompnent {
    constructor(public formGroup: GeneratedFormGroup<TestForm>) {}
}
```

GeneratedFormGroup is an implementation of FormGroup. Everything that you used to do with a FormGroup will still work.
