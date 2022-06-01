import React from "react";

interface FunctionProps {
    children: JSX.Element
}

interface InputProps {
    placeholder: string;
    value: string;
    onChange(e: React.SyntheticEvent): void;
}

export default function Form({ children }: FunctionProps) {
    return (
        <form className="form">{children}</form>
    )
}

export const FormInput = ({ ...props }: InputProps) => {
    return (
        <input {...props} />
    )
}

export const FormBtn = ({ title }: {title: string}) => {
    return (
        <button className="form-btn">{title}</button>
    )
}