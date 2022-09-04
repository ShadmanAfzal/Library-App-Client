import React from 'react';
import { AppBar } from './Appbar';
import { Formik, Form } from "formik";
import { TextField } from './TextField';
import { useNavigate } from "react-router-dom";
import { GenreSelector } from './GenreSelector';
import { BASE_URL } from "../../utils/strings.js"
import bookImage from '../../assets/book.jpg';
import * as Yup from "yup";

export const AddBook = () => {

    const navigate = useNavigate();

    const validator = Yup.object({
        title: Yup.string()
            .required('Title is required'),
        author: Yup.string()
            .required('Author name required'),
        description: Yup.string().required('Description is required'),
        photo_url: Yup.string().url('Invalid url').required('Image url is required'),
    })

    const initialValue = {
        title: "",
        author: "",
        description: "",
        photo_url: "",
        genre: ""
    }

    const onSubmitHandler = async (values) => {
        console.log(JSON.stringify(values));

        const fetchResult = await fetch(`${BASE_URL}/books`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        const jsonResult = await fetchResult.json();

        if (jsonResult.success) {
            alert('Book added successfully');
            return navigate('/');
        }

        alert(jsonResult.message);
    }

    return <div>
        <AppBar />
        <div className='container'>
            <div className='row'>
                <div className='col-md-7'>
                    <h2 className="my-4 font-weight-bold-display-4"> Add books Details</h2>
                    <Formik
                        initialValues={initialValue}
                        validationSchema={validator}
                    >
                        {(formik) => {
                            return <Form onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    if (formik.isValid) {
                                        onSubmitHandler(formik.values)
                                    }
                                }
                            }>
                                <TextField label="Title" name="title" type="text" />
                                <TextField label="Author" name="author" type="text" />
                                <TextField useTextArea label="Description" name="description" type="text" />
                                <TextField label="Image" name="photo_url" type="url" />
                                <GenreSelector onGenreChange={(genre) => formik.values.genre = genre} />
                                <button className={`btn w-75 my-2 btn-dark`}>Submit</button>
                            </Form>
                        }}
                    </Formik>
                </div>
                <div className='col-md-5'>
                    <img src={bookImage} className='img-fluid my-auto' alt='bookImage' />
                </div>

            </div>
        </div>
    </div>
}