import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom";

export const BookTable = ({ books, onDelete }) => {

    const naviator = useNavigate();

    const editBook = (book) => {
        naviator('/edit', { state: book })
    }

    return <table className="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {
                books.map((book, index) =>
                    <tr key={book.id}>
                        <td scope="row">{index + 1}</td>
                        <td scope="row">{book.title}</td>
                        <td scope="row">{book.author}</td>
                        <td scope="row">{book.description.substring(0, 70)} {book.description.length >= 70 && '...'}</td>
                        <td scope="row">
                            <FiEdit onClick={() => editBook(book)} className="mx-3" />
                            <FiTrash2 onClick={() => onDelete(book.id)} className="deleteIcon" />
                        </td>
                    </tr>
                )
            }
        </tbody>
    </table>
}