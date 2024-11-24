import React, {useState} from 'react';
import Service from "../../API/Service";

const TbodyWarehouse = ({stock}) => {
    const [quantities, setQuantities] = useState(
        stock.reduce((acc, warehouse) => {
            acc[warehouse.id] = warehouse.quantity; // Изначальные значения количества
            return acc;
        }, {})
    );

    const handleQuantityChange = (warehouseId, newQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [warehouseId]: newQuantity,
        }));
    };

    const handleUpdateQuantity = async (warehouseId, newQuantity) => {
        try {
            const response = await Service.setQuantityWarehouse(warehouseId, newQuantity);
            if (!response.ok) {
                console.error("Ошибка обновления количества. " + response.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleQuantityBlur = (warehouseId) => {
        const currentQuantity = stock.find((w) => w.id === warehouseId).quantity;
        const newQuantity = quantities[warehouseId];

        // Отправляем запрос только если значение изменилось
        if (newQuantity !== currentQuantity) {
            handleUpdateQuantity(warehouseId, newQuantity);
        }
    };

    return (
        <tbody>
        {stock.map((warehouse, index) =>
                <tr key={index}>
                    <th>{index}</th>
                    <th>{warehouse.rack}.{warehouse.section}.{warehouse.shelf}.{warehouse.cell}</th>
                    <th>{warehouse.component.name}</th>
                    <th>{warehouse.component.category}</th>
                    <th>{warehouse.component.manufacture}</th>
                    <th>{warehouse.component.model}</th>
                    <th>{warehouse.component.price}</th>
                    <th>
                        <input
                            type="number"
                            value={quantities[warehouse.id]}
                            onChange={(e) =>
                                handleQuantityChange(warehouse.id, Number(e.target.value))
                            }
                            onBlur={() => handleQuantityBlur(warehouse.id)} // Отправляем запрос при потере фокуса
                            min="0"
                        />
                    </th>
                </tr>
        )}
        </tbody>
    );
};

export default TbodyWarehouse;