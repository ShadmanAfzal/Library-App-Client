import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/strings";
import { BookTable } from "./BookTable";
import { Pagination } from "@mui/material";

export const Books = () => {

    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState();

    const onDeleteHanlder = async (id) => {

        const deleteResult = await fetch(`${BASE_URL}/books/${id}`, { method: 'DELETE' })

        const jsonResult = await deleteResult.json();

        if (jsonResult.success) {
            const filteredBooks = books.filter(book => book.id !== id);
            setBooks(filteredBooks);
            return alert("Book deleted successfully");
        }

        alert(jsonResult.message)
    }

    async function fetchBooks(pageNumber) {
        const response = await fetch(`${BASE_URL}/books?page=${pageNumber}`);

        const responseBody = await response.json();

        const books = responseBody.data;

        setTotalPage(responseBody.totalPage);

        setBooks(books);
    }

    useEffect(() => {
        fetchBooks(1);
    }, []);

    return <div className="container my-2">
        <BookTable books={books} onDelete={onDeleteHanlder} />
        <div className="d-flex justify-content-center">
            <Pagination count={totalPage} onChange={(_,page)=> fetchBooks(page)}/>
        </div>
    </div>
}