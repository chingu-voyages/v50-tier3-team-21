import { ChangeEvent} from "react";

interface RadioButtonProps {
  name: string;
  label: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean
}


export const CheckboxElement = ({name, label, handleChange, isChecked}: RadioButtonProps) => {
  return (
    <li>
      <input
        type="checkbox"
        name={name}
        id={name}
        value={name}
        className="appearance-none w-4 h-4 border-2 border-white rounded cursor-pointer checked:bg-secondary"
        style={{ boxShadow: "0 0 0 1px lightGrey" }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}   
        checked={isChecked}
        />
      <label htmlFor={name} className="ml-3 text-lg cursor-pointer">
        {label}
      </label>
    </li>
  );
};

