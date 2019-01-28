
## cfn-wrap

Takes a cloudformation template file as input and produces a new template value with the specified template parameters

#### Basic Usage

```
cfn-wrap --template ./service.yml --param ImageURI=repo/image:develop --output ./service-wrapped.yml
```