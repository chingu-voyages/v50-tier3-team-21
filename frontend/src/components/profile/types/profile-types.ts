import {FieldError , UseFormRegister} from "react-hook-form";

// input 
export interface FieldTypes {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  contact: string,
  password: string
}

export interface FormFieldProps {
  label: string,
  name: keyof FieldTypes
  type: string
  register: UseFormRegister<FieldTypes>,
  placeholder: string,
  className?: string,
  errors?: FieldError
  disabled?: boolean
}

// form
export interface ProfileResponse {
  status: string;
  data: UserType;
}
export interface UserType {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
}

export interface ProfileFormProps {
  user: UserType;
  setUser: (user: UserType) => void;
}

// password modal
export interface PasswordInputs {
  password: string;
  confirmPassword: string;
}

export interface PasswordModalProps {
  setViewPasswordModal: (status: boolean) => void;
}