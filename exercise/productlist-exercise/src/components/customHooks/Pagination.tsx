import {useState} from "react";

export function usePagination(queryPage: number) {
    const [currentPage, setCurrentPage] = useState(queryPage);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    return {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage
    };
}