## Step functions

### passing data: between states with variables

```json
{
  "Comment": "Set initial values, multiply, then format currency",
  "StartAt": "SetInitialValues",
  "States": {
    "SetInitialValues": {
      "Type": "Pass",
      "Result": {
        "inputValue": 2000,
        "multiplier": 10
      },
      "ResultPath": "$.initial",
      "Next": "MultiplyValue" // lambda
    },
    "MultiplyValue": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:REGION:ACCOUNT_ID:function:MultiplyValue",
      "InputPath": "$.initial",
      "ResultPath": "$.multiplied",
      "Next": "FormatCurrency" // lambda
    },
    "FormatCurrency": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:REGION:ACCOUNT_ID:function:FormatCurrency",
      "InputPath": "$.multiplied",
      "ResultPath": "$.formatted",
      "End": true
    }
  }
}
```

### Lambda: MultiplyValue
```javascript
exports.handler = async (event) => {
    // event.inputValue expected, e.g. { "inputValue": 2000 }
    const value = event.inputValue || 0;
    const multiplied = value * 10;

    return {
        multipliedValue: multiplied
    };
};
```

### Lambda: FormatCurrency
```javascript
exports.handler = async (event) => {
    // event.inputValue expected, e.g. { "inputValue": 2000 }
    const value = event.inputValue || 0;
    const multiplied = value * 10;

    return {
        multipliedValue: multiplied
    };
};
```

### transforming data: query language
JSONata: using JSONPath

Intrinsic functions (States.MathAdd), WorkflowStatesState, MachinesState, QueryLanguage, input/output configuration

#### Service integration
any aws services

#### Service integration type
AWS SDK
Optimized with state 

#### Service integration patterns
- Express workflow: Request a response: default hhtp response
- Std workflow: Run a job (.sync) stepfunctions and jobs
- Std workflow: callbacks with associated tasks tokens (.waitForTaskToken)

#### Execution
State machine executions are instances where you run your workflow to perform tasks.