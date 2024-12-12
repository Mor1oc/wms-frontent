import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import ComponentService from "../API/Service";
import SearchAndFilter from "../components/ComponentsInStock/SearchAndFilter";
import StockTable from "../components/ComponentsInStock/StockTable";

const Stock = () => {
    const [components, setComponents] = React.useState([]);
    const [filteredComponents, setFilteredComponents] = useState(components);

    const [fetchComponents, componentError] = useFetching(async () => {
        const response = await ComponentService.getComponentsInStock()
        setComponents(response.data)
        setFilteredComponents(response.data)
    })

    useEffect(() => {
        fetchComponents()
    }, [])


    const handleFilterAndSearch = (search, filter) => {
        let filtered = components;
        // Поиск
        if (search.value) {
            filtered = filtered.filter((item) =>
                item.component[search.param].toString().toLowerCase().includes(search.value.toLowerCase())
            );
        }

        // Фильтрация
        if (filter.value) {
            if (filter.param === "price") {
                filtered = filtered.filter((item) => item.component[filter.param] <= filter.value);
            } else if (filter.param === "quantity") {
                filtered = filtered.filter((item) => item[filter.param] <= filter.value);
            } else {
                filtered = filtered.filter((item) => item.component[filter.param] === filter.value);
            }
        }

        setFilteredComponents(filtered);
    };

    return (
        <div>
            <div className="page-name">
                Просмотр запасов
            </div>
            <div className="main">
                <StockTable warehouses={filteredComponents} />
                <SearchAndFilter components={components} onFilterAndSearch={handleFilterAndSearch}/>
            </div>
        </div>
    );
};

export default Stock;