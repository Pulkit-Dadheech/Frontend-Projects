import React from "react";

type TCustomTableProps<T> = {
    store: any;
    data: T[] | undefined;
    allHeaders: string[];
    handlePrev: (e: React.MouseEvent<HTMLElement>, store: any) => void;
    handleNext: (e: React.MouseEvent<HTMLElement>, store: any) => void;
}

export function CustomTable<T>({store, data, allHeaders, handlePrev, handleNext}: TCustomTableProps<T>) {
    const allDataInfo = data?.map((dataEntity: T, index: number) => {
        return (
            <tbody>
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
                            return;
                        }
                    })
                }
            </tr>
            </tbody>
        );
    });
    return (
        <>
            <table>
                <thead>
                <tr>
                    {allHeaders.map((entity) => <th>{entity.toUpperCase()}</th>)}
                </tr>
                </thead>
                {allDataInfo}
            </table>
            <button onClick={(e) => handlePrev(e, store)}>Prev</button>
            <button onClick={(e) => handleNext(e, store)}>Next</button>
        </>
    )
}