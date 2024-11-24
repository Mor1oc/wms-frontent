import React from 'react';
import TbodyWarehouse from "./TbodyWarehouse";

const TableWarehouse = ({components}) => {
    return (
        components.length !== 0
            ?
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
                <TbodyWarehouse stock={components}/>
            </table>
            : <h2 style={{textAlign: 'center', marginTop: 45}}>Запасы не найдены</h2>
    );
};

export default TableWarehouse;