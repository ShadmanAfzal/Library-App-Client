import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/strings";
import { BookTable } from "./BookTable";
import { Pagination } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AppBar } from "./Appbar";

export const SearchBooks = () => {

    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const location = useLocation();

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

        const body = JSON.stringify({
            "searchQuery": location.state
        });

        console.log(body);

        const response = await fetch(`${BASE_URL}/books/search?page=${pageNumber}`, {
            method: 'POST',
            body: body,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });


        const responseBody = await response.json();
        console.log(responseBody);

        const books = responseBody.data;

        setTotalPage(responseBody.totalPage);

        setBooks(books);
    }

    useEffect(() => {
        fetchBooks(1);
    }, []);

    return <>
        <AppBar />
        <div className="container my-2">
            {books && books.length != 0
                ? <>
                    <BookTable books={books} onDelete={onDeleteHanlder} />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            count={totalPage}
                            variant="outlined"
                            shape="rounded"
                            onChange={(_, page) => fetchBooks(page)} />
                    </div>
                </>
                : <div className="d-flex aligns-items-center justify-content-center">
                    <h4>No Books found</h4>
                </div>}

        </div>
    </>
}