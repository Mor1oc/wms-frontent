import React, {useEffect} from 'react';
import {useFetching} from "../hooks/useFetching";
import Service from "../API/Service";
import AnalysisTable from "../components/Analysis/AnalysisTable";

const AnalysisStock = () => {
    const [warehouses, setWarehouses] = React.useState([]);
    const [fetchOrders, componentError] = useFetching(async () => {
        const response = await Service.getAnalysisWarehouses()
        setWarehouses(response.data)
    })

    useEffect(() => {
        fetchOrders()
    }, []);



    return (
        <div>
            <div className="page-name">
                Анализ запасов
            </div>
            <AnalysisTable warehouses={warehouses}/>
        </div>
    );
};

export default AnalysisStock;