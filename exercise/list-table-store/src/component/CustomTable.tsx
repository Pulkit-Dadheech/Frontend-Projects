import React from "react";
import {Table} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

type TCustomTableProps<T> = {
    store: any;
    data: T[] | undefined;
    allHeaders: string[];
    handlePrev: (e: React.MouseEvent<HTMLElement>, store: any) => void;
    handleNext: (e: React.MouseEvent<HTMLElement>, store: any) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>, store: any) => void;
}

export function CustomTable<T>({store, data, allHeaders, handlePrev, handleNext, handleSearch}: TCustomTableProps<T>) {
    const allDataInfo = data?.map((dataEntity: T, index: number) => {
        return (
            <tbody className={"text-center"} key={index}>
            <tr key={index}>
                {
                    Object.keys(dataEntity as Record<string, any>).map((singleEntity, innerIndex) => {
                        let found = false;

                        allHeaders.forEach((entity) => {
                            if (entity === singleEntity) {
                                found = true;
                                return;
                            }
                        });

                        if (found) {
                            return <td key={innerIndex}>{(dataEntity as Record<string, any>)[singleEntity]}</td>;
                        } else {
                            return null;
                        }
                    })
                }
            </tr>
            </tbody>
        );
    });
    return (
        <>
            <div className={"d-flex align-items-center justify-content-center"}>
            <input placeholder={"Search..."} onChange={(e) => handleSearch(e, store)} className={"m-lg-2 px-4 py-2"} />
            </div>
            <Table
                bordered
                responsive
                striped
            >
                <thead>
                <tr className={"text-center"}>
                    {allHeaders.map((entity, index) => <th key={index}>{entity.toUpperCase()}</th>)}
                </tr>
                </thead>
                {allDataInfo}
            </Table>
            <span className={"d-flex align-content-center justify-content-center"}>
            <button disabled={store.skip === 0} onClick={(e) => handlePrev(e, store)}>Prev</button>
            <span className={"p-2"}> {(store.skip/10)+1} </span>
            <button disabled={store.skip+ 10 === store.total } onClick={(e) => handleNext(e, store)}>Next</button>
            </span>
            <br/>
            <br/>
        </>
    )
}