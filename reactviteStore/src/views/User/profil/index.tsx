import { connect, useDispatch, useSelector } from "react-redux";
 import { Formik } from 'formik';
import * as selectors from "../../../stores/rootSelectors";
import * as actions from "../../../stores/rootActions";
import type { AppDispatch, RootState } from "../../../stores";
import { RVAlerts, RVLoadingButton } from "../../../components";
import { BthForm, Container, Form, Message } from "../../../components/RVLayout/styles";
import { Input } from "../../../components/Formik";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";
import { useCallback, useEffect, useState } from "react";



const Index = ({profil, dispatch}: UserProps) => {
  
  const appDispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const [open, setOpen] = useState<boolean>(false)

  const submitProfil = (values: any) => {
    // userId from incoming user list
    appDispatch(
      actions.user.addProfilThunk({
        params: {
          userId: '69943794ffc1d6220bd5e7c1'
        },
        data: values
      }),
    );
  };

  const closeModal = useCallback(() => {
    dispatch(
      actions.user.reset(["profil"]),
    );
  }, [profil])


  useEffect(() => {
    (profil && profil.data) ? setOpen(true) : setOpen(false) 
  }, [profil])



  return (
    <Container>
      {profil && <RVAlerts data={profil} open={open} closeModal={closeModal} />}

      <Message>Add information about each user</Message>
      <Message>Cookies available for one hour. At expiry delete user token from token mongo table</Message>

      <Formik
       initialValues={{ 
        firstName: 'Edouard',
        lastName: 'Durand',
        address: '44 chemin du petit four',
        postCode: '06600',
        city: 'Antibes',
        phone: '54654656546'
      }}
       validate={(values) => {
       
       }}
       onSubmit={(values) => {
        submitProfil(values)
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         setFieldValue,
         setFieldError,
         setFieldTouched,
         setErrors,
         setValues,
         setTouched
       }) => (
        <Form onSubmit={handleSubmit}>
          <Input
            name="firstName"
            type="text"
            id="1"
            label="First name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          <Input
            name="lastName"
            id="2"
            label="Last name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          <Input
            name="address"
            id="3"
            label="Address"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
          />
          <Input
            name="postCode"
            id="4"
            label="Post code"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.postCode}
          />
          <Input
            name="city"
            id="5"
            label="City"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
          <Input
            name="phone"
            id="6"
            label="Phone"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          {errors.firstName && touched.firstName && errors.firstName}
   
          <BthForm>
            <RVLoadingButton type="submit" content="Submit" disabled={isSubmitting}/>
          </BthForm>
        </Form>
      )}
      </Formik>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    profil: selectors.user.profilSelector(state),
    profilLoading: selectors.user.profilLoadingSelector(state),
  };
};

interface UserProps {
  profil: any;
  uprofilLoading: boolean;
  dispatch: AppDispatch;
}

// export default App
export default connect(mapStateToProps)(Index);
