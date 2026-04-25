import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactNode } from "react";

const Index = ({ defaultValues, validationSchema, children }: FormProps) => {
  const methods = useForm<any>({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset, control } = methods;

  return children({ control, reset, handleSubmit });
};

interface FormProps {
  defaultValues: any;
  validationSchema: any;
  onSubmit: SubmitHandler<any>;
  children: ({
    control,
    handleSubmit,
    reset,
  }: {
    control: any;
    handleSubmit: any;
    reset: any;
  }) => ReactNode;
}

export default Index;
