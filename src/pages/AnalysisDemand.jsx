import React, {useEffect, useState} from 'react';
import Service from "../API/Service";
import {useFetching} from "../hooks/useFetching";
import DemandTable from "../components/Analysis/DemandTable";

const AnalysisDemand = () => {
    const [demandData, setDemandData] = useState({
        oneMonth: [],
        threeMonth: [],
        sixMonth: [],
    });
    const [selectedPeriod, setSelectedPeriod] = useState('oneMonth'); // Выбранный период
    const [fetchOrders, componentError] = useFetching(async () => {
        const response = await Service.getForecastOrders()
        setDemandData(response.data)
    })

    useEffect(() => {
        fetchOrders()
    }, []);

    return (
        <div>
            <div className="page-name">
                Прогнозирование спроса
                <div className="add-component">
                    <label
                        htmlFor="periodSelector"
                        style={{fontSize: "20px", marginTop: "10px"}}
                    >Выберите период: </label>
                    <select
                        id="periodSelector"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="oneMonth">Последний месяц</option>
                        <option value="threeMonth">Последние 3 месяца</option>
                    </select>
                </div>
            </div>
            <DemandTable data={demandData[selectedPeriod]} />
        </div>
    );
};

export default AnalysisDemand;