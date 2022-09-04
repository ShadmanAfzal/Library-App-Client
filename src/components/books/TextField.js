import React from "react";
import { useField, ErrorMessage } from "formik";
import './index.css';

export const TextField = ({ label, useTextArea, ...props }) => {
    const [field, meta] = useField(props);

    if (useTextArea) {
        return <div className="mb-2">
            <label htmlFor={field.name} className='text-field-header'>
                {label}
            </label>
            <textarea
                className={`form-control shadow-none w-75 ${meta.touched && meta.error && 'is-invalid'}`}
                rows={3}
                {...field} {...props}
            >
            </textarea>
            <ErrorMessage name={field.name} component="div" className="errorMessage" />
        </div>
    }

    return <div className="mb-2">
        <label htmlFor={field.name} className='text-field-header'>
            {label}
        </label>
        <input
            className={`form-control shadow-none w-75 ${meta.touched && meta.error && 'is-invalid'}`}
            {...field} {...props}
        >
        </input>
        <ErrorMessage name={field.name} component="div" className="errorMessage" />
    </div>
}