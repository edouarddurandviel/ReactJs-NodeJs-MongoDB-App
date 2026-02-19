import { connect } from "react-redux";
import { Formiz, useForm } from "@formiz/core";
import { isRequired } from "@formiz/validations";
import * as selectors from "../../../stores/rootSelectors";
import * as actions from "../../../stores/rootActions";
import type { AppDispatch, RootState } from "../../../stores";
import { RVInput, RVLoadingButton } from "../../../components";
import { BthForm, Container, Form } from "../../../components/RVLayout/styles";
import type { User } from "../../../stores/user/interfaces";

const Index = ({ dispatch, u, userLoading }: UserProps) => {

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    } as User,
    onSubmit: (values) => {
      handleSubmitCreateUser(values);
      form.reset();
    },
  });

  const handleSubmitCreateUser = (values: User) => {
    dispatch(
      actions.user.addOneUser({
        data: values,
      }),
    );
  };

  return (
    <Container>
      <p>Create new user</p>
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
            <RVLoadingButton type="submit" content="Submit" disabled={userLoading} loading={userLoading} />
          </BthForm>
        </Form>
      </Formiz>
      {u && (
        <code>{u.email}</code>
      )}
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    u: selectors.user.userSelector(state),
    userLoading: selectors.user.userLoadingSelector(state),
  };
};

interface UserProps {
  u: User | null;
  userLoading: boolean;
  dispatch: AppDispatch;
}

// export default App
export default connect(mapStateToProps)(Index);
