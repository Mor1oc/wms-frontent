import React from 'react';
import TbodyWarehouse from "../ComponentsInStock/TbodyWarehouse";

const AnalysisTable = ({warehouses}) => {
    const getRowClass = (coverage) => {
        if (coverage < 10) return "low-stock"; // Красный
        if (coverage >= 10 && coverage <= 20) return "medium-stock"; // Жёлтый
        return "high-stock"; // Зелёный
    };
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Место хранения</th>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Производитель</th>
                    <th>Модель</th>
                    <th>Стоимость</th>
                    <th>Количество</th>
                    <th>На сколько дней хватит</th>
                </tr>
                </thead>
                <tbody>
                {warehouses.map((warehouse, index) =>
                    <tr key={index} className={getRowClass(warehouse.coverage)}>
                        <th>{index}</th>
                        <th>{warehouse.rack}.{warehouse.section}.{warehouse.shelf}.{warehouse.cell}</th>
                        <th>{warehouse.component.name}</th>
                        <th>{warehouse.component.category}</th>
                        <th>{warehouse.component.manufacture}</th>
                        <th>{warehouse.component.model}</th>
                        <th>{warehouse.component.price}</th>
                        <th>{warehouse.quantity}</th>
                        <th>{warehouse.coverage}</th>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AnalysisTable;