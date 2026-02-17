import { connect } from "react-redux";
import { Formiz, useForm } from "@formiz/core";
import { isRequired } from "@formiz/validations";
import * as selectors from "../../stores/rootSelectors";
import * as actions from "../../stores/rootActions";
import type { AppDispatch, RootState } from "../../stores";
import { RVInput, RVLoadingButton } from "../../components";
import { BthForm, Container, Form} from "../../components/RVLayout/styles";
import type { User } from "../../stores/user/interfaces";

const Index = ({ dispatch, userLoading }: UserProps) => {

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    } as User,
    onSubmit: (values) => {
      handleSubmitLogin(values);
      form.reset();
    }
  });

 
  const handleSubmitLogin = (values: User) => {
    dispatch(
      actions.user.userLogin({
        data: values,
      }),
    );
  };


  return (
    <Container>
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
                disabled={userLoading} 
                loading={userLoading} 
              />
            </BthForm>
          </Form>
        </Formiz>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    userLoading: selectors.user.userLoadingSelector(state),
  };
};

interface UserProps {
  userLoading: boolean;
  dispatch: AppDispatch;
}

// export default App
export default connect(mapStateToProps)(Index);
