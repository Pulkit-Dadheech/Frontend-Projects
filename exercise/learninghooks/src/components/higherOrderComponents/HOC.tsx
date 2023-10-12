import React, {useEffect, useState} from "react";

export type listItemsEntities = {
    id?: number,
    userId?: number,
    name?: string,
    title?: string
}
const HOC = (WrappedComponent: React.FC<{ listItems: listItemsEntities[] }>, entities: string) => {
    const InnerComponent: React.FC = () => {
        const [listItems, setListItems] = useState<listItemsEntities[]>([]);

        useEffect(() => {
            const fetchEntities = async () => {
                const res = await fetch(`https://jsonplaceholder.typicode.com/${entities}`);
                const json = await res.json();
                setListItems(json);
            };
            fetchEntities();


        }, [entities]);


        return <WrappedComponent listItems={listItems}/>;
    };

    return InnerComponent;
};

export default HOC;
