import React from 'react'
import {InterInputProps,} from './InterfaceTypes'

const InputForm = ({
       label,
       name,
       type,
       placeholder,
       onChange,
       className,
       value,
   }:InterInputProps) => {
    return (
        <React.Fragment>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={className}
            />
        </React.Fragment>
    )
};

export default InputForm