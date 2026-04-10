## Step functions

- deploy or not state machines.
- test state machines befores
- check workflow

==> build topologie of state machine craft

==> use ui and define each state using forms

UI workflow definition => right button test (user permissions defined in IAM)
state input textarea for body (data).
=> level inspection selector.
take each results and provide data to each test sequencies.
==> then save button

Wait for callback: usefull to wait for external data before execution. for example validation ...
provided with token

==> Definition (read-only)

# lambda up to 10 concurrently

tmp, glogal variables cache.

- add tenant defined id for customers

### Lambda: MultiplyValue

```javascript
exports.handler = async event => {
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
exports.handler = async event => {
  const numberToFormat = event.multipliedValue ?? 0;
  const formatted = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(numberToFormat);

  return { euroValue: formatted };
};
```

## transforming data: query language

JSONata: using JSONPath

- Intrinsic functions (States.MathAdd),
- WorkflowStatesState,
- MachinesState,
- QueryLanguage,
- input/output configuration

## Service integration

- any aws services

## Service integration type

- AWS SDK
- Optimized with state

## Service integration patterns

- Express workflow: Request a response: default http response. Cannot exceed 5 minutes
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
