import React , {createContext} from "react";


const MultiSelectContext = createContext({})

type MultiSelectPropsType = React.PropsWithChildren
export const MultiSelect = ({ children }: MultiSelectPropsType) => {
    return (
      <MultiSelectContext.Provider value={}>
          { children }
      </MultiSelectContext.Provider>
    )
}

const MultiSelectLabel = ({ children, id , label}) => {
    return (
        <label htmlFor={id}>
            { label }
        </label>
    )
}

const Select = ({children, name}) => {
    return (
        <select name={name}>
            { children }
        </select>
    )
}
const MultiSelectOption = ({value, name }) => {
    return (
        <option value={value}>
            { name }
        </option>
    )
}
MultiSelect.Select = Select;
MultiSelect.MultiSelectOption = MultiSelectOption;
MultiSelect.MultiSelectLabel = MultiSelectLabel;



