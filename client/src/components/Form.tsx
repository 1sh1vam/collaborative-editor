import React from "react";

interface FunctionProps {
    children: JSX.Element[];
}

interface InputProps {
    placeholder: string;
    value: string;
    type?: string;
    onChange(e: React.SyntheticEvent): void;
}

interface BtnProps {
    children: JSX.Element;
    onClick(e: React.SyntheticEvent): void;
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

export const FormBtn = ({ children, ...props }: BtnProps) => {
    return (
        <button {...props} className="form-btn">{children}</button>
    )
}