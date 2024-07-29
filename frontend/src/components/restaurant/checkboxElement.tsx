import { ChangeEvent, FC } from "react";

interface RadioButtonProps {
  name: string;
  label: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}


export const CheckboxElement: FC<RadioButtonProps> = ({name, label, handleChange}) => {
  return (
    <li>
      <input
        type="checkbox"
        name={name}
        value={name}
        className="appearance-none w-4 h-4 border-2 border-white rounded cursor-pointer checked:bg-secondary"
        style={{ boxShadow: "0 0 0 1px lightGrey" }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
      />
      <label htmlFor="appetizers" className="ml-3 text-lg">
        {label[0].toUpperCase() + label.slice(1)}
      </label>
    </li>
  );
};

