import { connect } from "react-redux";
import { Formiz, useForm } from "@formiz/core";
import { isRequired } from "@formiz/validations";
import * as selectors from "../../stores/rootSelectors";
import * as actions from "../../stores/rootActions";
import type { AppDispatch, RootState } from "../../stores";
import { RVInput, RVLoadingButton } from "../../components";
import { BthForm, Container, Form, LoginForm, Message } from "../../components/RVLayout/styles";
import type { User } from "../../stores/user/interfaces";

const Index = ({ dispatch, authLoading }: UserProps) => {

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    } as User,
    onSubmit: (values) => {
      handleSubmitLogin(values);
      form.reset();
    },
  });

  const handleSubmitLogin = (values: User) => {
    dispatch(
      actions.auth.userLogin({
        query: {
          email: values.email,
          password: values.password,
        },
      }),
    );
  };

  return (
    <Container>
      <LoginForm>
        <Message>
          <strong>user:</strong> test1@test1.com, <strong>password:</strong> password
        </Message>
        <Message>Cookies available for one hour. At expiry delete user token from token mongo table</Message>
        <Formiz connect={form}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              form.submit();
            }}
          >
            <RVInput
              name="email"
              type="text"
              id="1"
              label="Email"
              required="Email is required"
              validations={[
                {
                  handler: isRequired(),
                  message: "Email is required",
                },
              ]}
            />
            <RVInput
              name="password"
              type="text"
              id="2"
              label="Password"
              required="Password is required"
              validations={[
                {
                  handler: isRequired(),
                  message: "Password is required",
                },
              ]}
            />
            <BthForm>
              <RVLoadingButton 
                type="submit" 
                content="Submit" 
                disabled={authLoading} 
                loading={authLoading} 
              />
            </BthForm>
          </Form>
        </Formiz>
      </LoginForm>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    authLoading: selectors.auth.authLoadingSelector(state),
  };
};

interface UserProps {
  authLoading: boolean;
  dispatch: AppDispatch;
}

// export default App
export default connect(mapStateToProps)(Index);
