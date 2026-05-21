tests managed service behaviors, cloud configuration, security policies, and the integration with your code.
Behavior testing, also known as black box testing, verifies a system works as expected without knowing all the internals.

- Run unit tests to check business logic inside Lambda functions.

- Verify integrated services are actually invoked, and input parameters are correct.

- Check that an event goes through all expected services end-to-end in a workflow.

#### Execution

State machine executions are instances where you run your workflow to perform tasks.

```bash
aws stepfunctions test-state \
    --definition '{"Type": "Pass", "InputPath": "$.payload", "Parameters": {"data": 1}, "ResultPath": "$.result", "OutputPath": "$.result.data", "Next": "Another State"}' \
    --role-arn arn:aws:iam::account-id:role/myRole \
    --input '{"payload": {"foo": "bar"}}' \
    --inspection-level DEBUG
```
