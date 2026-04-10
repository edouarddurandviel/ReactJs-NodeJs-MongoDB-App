import { connect } from "react-redux";
import * as selectors from "../../stores/rootSelectors";
import * as actions from "../../stores/rootActions";
import type { AppDispatch, RootState } from "../../stores";
import { RVMeta } from "../../components";
import { Container } from "../../components/RVLayout/styles";
import type { User } from "../../stores/user/interfaces";
import { type Path, useForm, Controller, type UseFormRegister, type SubmitHandler, useController } from "react-hook-form";
import React from "react";

const Index = ({ dispatch, user, userLoading }: UserProps) => {

  const meta = {
    title: "DesignPatterns",
    description: "Search for the best design pattern",
    url: "/design-pattern",
  };

  //const { field, fieldState } = useController(props)

  const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      FirstName: "",
      LastName: "",
      Age: 0,
      Gender: GenderEnum.male,
      Comments: ""
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    console.log(data)
    // dispatch(
    //       actions.user.addOneUser({
    //         data: data,
    //       }),
    //     );
  }


  // component
  const Input = ({ label, register, required, onChange, onBlur, value, name }: InputProps & any) => (
  <>
    <label>{label}</label>
    <input name={name} value={value} onChange={onChange} onBlur={onBlur} />
  </>
  )

  // Integrating an existing form should be simple. The important step is to 
  // register the component's ref and assign relevant props to your input.
  const Select = React.forwardRef<HTMLSelectElement, { label: string } & ReturnType<UseFormRegister<IFormValues>>>(
    ({ onChange, onBlur, name, label }, ref) => 
      (
        <>
          <label>{label}</label>
          <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </>
      ))

  return (
    <><RVMeta metaData={meta} />
    <Container>
      <p>Best design patterns</p>
       <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <Input label="FirstName" register={register} required maxLength={20} />
        <input {...register("LastName", { pattern: /^[A-Za-z]+$/i })} aria-invalid={errors.LastName ? "true" : "false"} />
        <input type="number" {...register("Age", { min: 18, max: 99 })} />
        {errors.LastName && "Does not accept numbers"}
          {/* <p>{fieldState.isTouched && "Touched"}</p>
          <p>{fieldState.isDirty && "Dirty"}</p>
          <p>{fieldState.invalid ? "invalid" : "valid"}</p> */}
        <label>Gender Selection</label>
        <Select label="Age" {...register("Age")} />
        <Controller 
          name="Comments" 
          control={control}
          rules={{ required: true, maxLength: 20 }}
          render={({field}) => (
            <Input {...field}/>
          )}
        />
        <input type="submit" />
      </form>
      {user && <code>{user.email}</code>}
    </Container>
  </>);
};

const mapStateToProps = (state: RootState) => {
  return {
    user: selectors.user.userSelector(state),
    userLoading: selectors.user.userLoadingSelector(state),
  };
};

interface UserProps {
  user: User | null;
  userLoading: boolean;
  dispatch: AppDispatch;
}

interface IFormInput {
  FirstName: string
  LastName: string
  Age: number
  Gender: GenderEnum
  Comments: string
}

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormValues {
  FirstName: string
  Age: number
}

type InputProps = {
  label: Path<IFormInput>
  register: UseFormRegister<IFormInput>
  required: boolean
}

// export default App
export default connect(mapStateToProps)(Index);
