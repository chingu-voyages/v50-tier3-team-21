import React, { ChangeEvent } from 'react';

interface SliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    label?: React.ReactNode;
    className?: string;

}


export const Slider= ({
                                           value,
                                           min,
                                           max,
                                           step = 1,
                                           onChange,
                                           label,
                                           className
                                       }: SliderProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className={`flex flex-col ${className}`}>
            { label && <div className="w-full" >
                {  label }
            </div>}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="slider w-full appearance-none bg-transparent cursor-pointer"
                style={{
                    background: `linear-gradient(to right, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%)`
                }}
            />
            <div className="flex justify-between text-sm text-gray-500">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

