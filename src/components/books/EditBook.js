import React from 'react';
import { AppBar } from './Appbar';
import { Formik, Form } from "formik";
import { TextField } from './TextField';
import bookImage from '../../assets/book.jpg';
import * as Yup from "yup";
import { BASE_URL } from '../../utils/strings';
import { useLocation, useNavigate } from "react-router-dom";
import { GenreSelector } from './GenreSelector';

export const EditBook = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const validator = Yup.object({
        title: Yup.string()
            .required('Title is required'),
        author: Yup.string()
            .required('Author name required'),
        description: Yup.string()
            .required('Description is required'),
        photo_url: Yup.string().url('Invalid url').required('Image url is required'),
    })

    const initialValue = {
        title: location.state.title,
        author: location.state.author,
        description: location.state.description,
        photo_url: location.state.photo_url,
        genre: location.state.genre,
    }

    const onSubmitHandler = async (values, id) => {
        console.log(JSON.stringify(values));

        const fetchResult = await fetch(`${BASE_URL}/books/${id}`, {
            method: 'PATCH', body: JSON.stringify(values), headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const jsonResult = await fetchResult.json();

        if (jsonResult.success) {
            alert('Book updated successfully');
            return navigate('/');
        }

        alert(jsonResult.message);
    }

    return <div>
        <AppBar />
        <div className='container'>
            <div className='row'>
                <div className='col-md-7'>
                    <h2 className="my-4 font-weight-bold-display-4"> Update books Details</h2>
                    <Formik
                        initialValues={initialValue}
                        validationSchema={validator}
                    >
                        {(formik) => {
                            return <Form onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    if (formik.isValid) {
                                        onSubmitHandler(formik.values, location.state.id)
                                    }
                                }
                            }>
                                <TextField label="Title" name="title" type="text" />
                                <TextField label="Author" name="author" type="text" />
                                <TextField useTextArea label="Description" name="description" type="text" />
                                <TextField label="Image" name="photo_url" type="url" />
                                <GenreSelector initialValue={formik.values.genre} onGenreChange={(genre) => formik.values.genre = genre} />
                                <button className={`btn w-75 my-2 ${formik.isValid ? 'btn-success' : 'btn-secondary'}`}>Submit</button>
                            </Form>
                        }}
                    </Formik>
                </div>
                <div className='col-md-5'>
                    <img src={bookImage} className='img-fluid my-auto w-100' alt='bookImage' />
                </div>

            </div>
        </div>
    </div>
}