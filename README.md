# NgxFormGenerator

NgxFormGenerator is an Angular ReactiveForms helper that will makes your form cleaner and safer.

## Installation

```
npm install --save @recursyve/ngx-form-generator
```

## Usage example

NgxFormGenerator will generate an implementation of FormGroup for you. We use decorators to describe our FormGroup.

```typescript
import { Control } from "@recursyve/ngx-form-generator"

class TestDto {
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

If you want to use validators on your controls, you can add them on top of each properties

```typescript
import { Control, Required } from "@recursyve/ngx-form-generator"

class TestDto {
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

The next step is load TestDto in your module

```typescript
@Module({
    import: [
        BrowserModule,
        NgxFormGeneratorModule.forFeature([
            {
                provide: "Test",
                useValue: TestDto
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
    constructor(@Inject("Test") public formGroup: GeneratedFormGroup<TestDto>) {}
}
```

You can also provide your Dto directly in the components

```typescript
@Component({
    selector: "app-root",
    templateUrl: "app.template.html",
    providers: NgxFormGeneratorProvider.forFeature([TestDto)]
})
class AppCompnent {
    constructor(public formGroup: GeneratedFormGroup<TestDto>) {}
}
```

GeneratedFormGroup is an implementation of FormGroup. Everything that you used to do with a FormGroup will still works.
