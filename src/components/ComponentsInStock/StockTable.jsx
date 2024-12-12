import React from 'react';

const StockTable = ({warehouses}) => {
    return (
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
            </tr>
            </thead>
            <tbody>
            {warehouses.map((warehouse, index) =>
                <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{warehouse.rack}.{warehouse.section}.{warehouse.shelf}.{warehouse.cell}</th>
                    <th>{warehouse.component.name}</th>
                    <th>{warehouse.component.category}</th>
                    <th>{warehouse.component.manufacture}</th>
                    <th>{warehouse.component.model}</th>
                    <th>{warehouse.component.price}</th>
                    <th>{warehouse.quantity}</th>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default StockTable;