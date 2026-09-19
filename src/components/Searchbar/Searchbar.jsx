import { useState } from "react"

export const Searchbar = ({ handleSearch }) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const query = event.currentTarget.elements.query.value;
        handleSearch(query);
        event.currentTarget.reset();
    }
    return <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
            <button type="submit" className="button">
                <span className="button-label">Search</span>
            </button>

            <input
                name="query"
                className="input"
                type="text"
                placeholder="Search images and photos"
            />
        </form>
    </header>
}