import { useState } from "react";

export const Dropdown = ({ filterHandler, values, title }) => {

    const [label, setLabel] = useState();

    return <div className="d-flex justify-content-end">
        <div class="dropdown">
            <a class="btn btn-dark dropdown-toggle btn-sm" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                {title} {label && `${label}`}
            </a>
            <div class="dropdown-menu">
                {
                    values.map((val) => <a
                        class="dropdown-item"
                        key={val.title}
                        onClick={
                            () => {
                                filterHandler(val.action);
                                setLabel(val.title);
                            }}>
                        {val.title}</a>)
                }
            </div>
        </div>
    </div>;
}