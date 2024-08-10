import React , {createContext , ReactElement , useContext} from "react";


interface MultiSelectContextType<T> {
    value: T;
    onChange: (value: T) => void;
}

const MultiSelectContext = createContext<MultiSelectContextType<any> >({} as MultiSelectContextType<any>);

type MultiSelectPropsType<T> = {
    value: T;
    onChange: (value: T) => void;
} & React.PropsWithChildren<{}>;

export const SingleSelect = <T,>({ children, value, onChange }: MultiSelectPropsType<T>): ReactElement => {
    return (
        <MultiSelectContext.Provider value={{ value, onChange }}>
            <div className="w-full flex flex-col justify-center  space-y-4">
                {children}
            </div>
        </MultiSelectContext.Provider>
    );
};



type SingleSelectLabelType = {
    id: string,
    label: string
}
export const SingleSelectLabel = ({ id , label}: SingleSelectLabelType) => {
    return (
        <label htmlFor={id} className="block text-gray-700 font-medium">
            { label }
        </label>
    )
}


type SelectType = {
    children: React.ReactNode,
    name: string
}
export const Select = ({children, name}: SelectType) => {
    const { value, onChange} = useContext<MultiSelectContextType<string>>(MultiSelectContext);
    return (
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                name={name} onChange={(e) => onChange(e.target.value)} value={value}  >
            { children }
        </select>
    )
}

type SingleSelectOptionType = {
    value: unknown,
    name: string
}
export  const SingleSelectOption = ({value, name }: SingleSelectOptionType) => {
    return (
        <option value={value as string} className="text-gray-900">
            { name }
        </option>
    )
}


SingleSelect.Select = Select;
SingleSelect.SingleSelectOption = SingleSelectOption;
SingleSelect.SingleSelectLabel = SingleSelectLabel;



