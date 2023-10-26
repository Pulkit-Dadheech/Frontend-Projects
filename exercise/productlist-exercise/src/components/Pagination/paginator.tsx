import React, {useEffect} from "react";
import './pagination.css'

interface PaginationState {
    totalProducts: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setQuery: (prevState: { p: string }) => void
}

export default function Paginator({totalProducts, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, setQuery}: PaginationState) {
    const totalPages = Math.ceil((totalProducts ? totalProducts : 0) / itemsPerPage);


    if (currentPage > totalPages && totalPages !== 0) {
        setCurrentPage(totalPages);
    }
    setItemsPerPage(6);

    useEffect(() => {
        setQuery({p: currentPage.toString()})
    }, [currentPage, setQuery]);

    return (
        <>
            {totalProducts ? (<div className="pagination">
                <span className="pagination-button-block">
                    <button className={currentPage !== 1 ? "active" : ""}
                            onClick={() => currentPage !== 1 && setCurrentPage(1)}>{"<<"}</button>
                    <button className={currentPage !== 1 ? "active" : ""}
                            onClick={() => setCurrentPage(currentPage !== 1 ? currentPage - 1 : 1)}>Prev</button>
                    <span className="pagination-page-text">{currentPage}</span>
                    <button className={currentPage !== totalPages ? "active" : ""}
                            onClick={() => setCurrentPage(currentPage !== totalPages ? currentPage + 1 : totalPages)}>Next</button>
                    <button className={currentPage !== totalPages ? "active" : ""}
                            onClick={() => currentPage !== totalPages && setCurrentPage(totalPages)}>{">>"}</button>
                </span>
                    <div>Pages {currentPage} out of {totalPages}</div>
                </div>) :
                (<h1>Products Not found</h1>)}

        </>
    )
}