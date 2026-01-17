export type SimpleInputProps = {
  name: string;
  id: string;
  type: string;
  required?: string;
  placeholder?: string;
  label?: string;
  autoFocus?: boolean;
  validations?: Array<{
    handler: (value: unknown) => boolean;
    message: string;
  }>;
};
