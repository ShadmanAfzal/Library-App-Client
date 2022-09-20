import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/strings";
import { BookTable } from "./components/BookTable";
import { Dropdown } from "../../utils/Dropdown";
import { Pagination } from "@mui/material";
import { BOOK_CATEGORY, SORT_BY } from "../../utils/enum";

export const Books = () => {

    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [filter, setFilter] = useState();
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState();

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

        let response;

        if (sortBy) {
            response = await fetch(`${BASE_URL}/books?sortBy=${sortBy}&page=${page}`);
        } else {
            response = await fetch(`${BASE_URL}/books?page=${page}`);
        }


        const responseBody = await response.json();

        const books = responseBody.data;

        setTotalPage(responseBody.totalPage);

        setBooks(books);
    }

    const fetchFilterBooks = async (page) => {

        if(!filter) return;

        let uri;

        if (sortBy) {
            uri = `${BASE_URL}/books/filter?sortBy=${sortBy}&page=${page}`;
        }
        else {
            uri = `${BASE_URL}/books/filter?page=${page}`;
        }

        const response = await fetch(uri,
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

    const filterHandler = (filter) => {
        setFilter(filter);
        setPage(1);
    }

    const sortHandler = (sortBy) => {
        setSortBy(sortBy);
        setPage(1);
    }

    useEffect(() => {
        if (filter) {
            fetchFilterBooks(1);
        }
        else {
            fetchBooks(1);
        }
    }, [sortBy]);

    useEffect(() => {
        fetchFilterBooks(1);
    }, [filter]);

    useEffect(() => {
        fetchBooks(1);
    }, []);

    return <div className="container my-2">
        <div className="d-flex justify-content-end">
            <div className="d-flex gap-2">
                <Dropdown title={'Sort By'} filterHandler={sortHandler} values={SORT_BY} />
                <Dropdown title={'Filter By'} filterHandler={filterHandler} values={BOOK_CATEGORY} />
            </div>
        </div>
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