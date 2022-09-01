import React from "react";
import { useField,ErrorMessage } from "formik";

export const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return <div className="mb-3">
        <label htmlFor={field.name}>
            {label}
        </label>
        <input
            className={`form-control shadow-none w-75 ${meta.touched && meta.error && 'is-invalid'}`}
            {...field} {...props}
        >
        </input>
        <ErrorMessage name={field.name} component="div" className="errorMessage"/>
    </div>
}