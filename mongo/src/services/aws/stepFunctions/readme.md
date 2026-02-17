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
    const numberToFormat = event.multipliedValue ?? 0;
    const formatted = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(numberToFormat);

    return { euroValue: formatted };
};

```

## transforming data: query language
JSONata: using JSONPath

Intrinsic functions (States.MathAdd), WorkflowStatesState, MachinesState, QueryLanguage, input/output configuration

## Service integration
any aws services

## Service integration type
AWS SDK
Optimized with state 

## Service integration patterns
- Express workflow: Request a response: default http response
- Standard workflow: Run a job (.sync) step functions and jobs
- Standard workflow: callbacks with associated tasks tokens (.waitForTaskToken)

#### Execution
State machine executions are instances where you run your workflow to perform tasks.

```bash
aws stepfunctions test-state \
    --definition '{"Type": "Pass", "InputPath": "$.payload", "Parameters": {"data": 1}, "ResultPath": "$.result", "OutputPath": "$.result.data", "Next": "Another State"}' \
    --role-arn arn:aws:iam::account-id:role/myRole \
    --input '{"payload": {"foo": "bar"}}' \
    --inspection-level DEBUG
```