import React from 'react';

const DemandTable = ({data}) => {
    return (
        <div>
            <table border="1">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Производитель</th>
                    <th>Модель</th>
                    <th>Цена</th>
                    <th>Прогноз</th>
                    <th>Тренды</th>
                </tr>
                </thead>
                <tbody>
                {data.map((component) => (
                    <tr key={component.id}>
                        <th>{component.name}</th>
                        <th>{component.category}</th>
                        <th>{component.manufacture}</th>
                        <th>{component.model}</th>
                        <th>{component.price}</th>
                        <th>{component.forecast}</th>
                        <th>{component.trend}</th>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DemandTable;