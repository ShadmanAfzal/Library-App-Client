import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/strings";
import { BookTable } from "./BookTable";
import { Dropdown } from "../../utils/Dropdown";
import { BOOK_CATEGORY } from "../../utils/BookGenre";
import { Pagination } from "@mui/material";

export const Books = () => {

    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [filter, setFilter] = useState();
    const [page, setPage] = useState(1);

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

    async function fetchBooks(page) {

        const response = await fetch(`${BASE_URL}/books?page=${page}`);

        const responseBody = await response.json();

        const books = responseBody.data;

        setTotalPage(responseBody.totalPage);

        setBooks(books);
    }

    const fetchFilterBooks = async (page) => {

        const response = await fetch(`${BASE_URL}/books/filter?page=${page}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    'filter': filter
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
        );

        const responseBody = await response.json();

        const books = responseBody.data;

        setTotalPage(responseBody.totalPage);

        setBooks(books);
    }

    const filterHandler = async (filter) => {
        setFilter(filter);
        setPage(1);
    }

    useEffect(() => {
        fetchFilterBooks(1);
    }, [filter]);

    useEffect(() => {
        fetchBooks(1);
    }, []);

    return <div className="container my-2">
        <Dropdown filterHandler={filterHandler} values={BOOK_CATEGORY} />
        <BookTable books={books} onDelete={onDeleteHanlder} />
        <div className="d-flex justify-content-center">
            <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={(_, page) => {
                    setPage(page);
                    if (filter) {
                        fetchFilterBooks(page);
                    }
                    else {
                        fetchBooks(page);
                    }
                }} />
        </div>
    </div>
}