import React, {Dispatch, SetStateAction} from "react";
import './pagination.css'
import {usePagination} from "../../customHooks";

export default function Paginate({totalProducts, currentPage, setCurrentPage}: {
    totalProducts: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>,
}) {
    const {itemsPerPage} = usePagination();
    const totalPages = Math.ceil((totalProducts ? totalProducts : 0) / itemsPerPage);
    if (currentPage > totalPages && totalPages !== 0) {
        setCurrentPage(totalPages);
    }
    return (
        <>
            {totalProducts ? (<div className="pagination">
                <span className="pagination-button-block">
                    <button className={currentPage !== 1 ? "active" : ""}
                            onClick={() => currentPage !== 1 && setCurrentPage(1)}>{"<<"}</button>
                    <button className={currentPage !== 1 ? "active" : ""}
                            onClick={() => setCurrentPage(currentPage !== 1 ? currentPage - 1 : 1)}>Prev</button>
                    <button className="active">{currentPage}</button>
                    <button className={currentPage !== totalPages ? "active" : ""}
                            onClick={() => setCurrentPage(currentPage !== totalPages ? currentPage + 1 : totalPages)}>Next</button>
                    <button className={currentPage !== totalPages ? "active" : ""}
                            onClick={() => currentPage !== totalPages && setCurrentPage(totalPages)}>{">>"}</button>
                </span>
                    <div>Pages {currentPage} out of {totalPages}</div>
                </div>) :
                (<h1>FetchingProducts...</h1>)}

        </>
    )
}