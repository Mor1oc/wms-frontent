import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import ComponentService from "../../API/Service";

const TableOrders = () => {
    const [orders, setOrders] = useState([]);

    const [fetchOrders, orderError] = useFetching(async () => {
        const response1 = await ComponentService.getOrdersWithStatus('В исполнении')
        const response2 = await ComponentService.getOrdersWithStatus('Готовится к отправке')
        setOrders([ ...response1.data, ...response2.data])
        console.log(orders)
    })

    const handleStatusUpdate = async (id) => {
        try {
            const response = await ComponentService.updateOrder(id);
            console.log("Статус обновлен:", response.data);
            fetchOrders()
        } catch (error) {
            console.error("Ошибка обновления статуса:", error);
        }
    };

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Дата заказа</th>
                <th>дата доставки</th>
                <th>Статус</th>
                <th>Название комплектующего</th>
                <th>Модель комплектующего</th>
                <th>Количество</th>
                <th>Общее количество</th>
                <th>Подтверждение</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order => (
                    <React.Fragment key={order.id}>
                        <tr key={order.id}>
                            <th>{order.id}</th>
                            <th>{order.orderDate}</th>
                            <th>{order.deliveryDate}</th>
                            <th>{order.status}</th>
                            <th>{order.components[0].name}</th>
                            <th>{order.components[0].model}</th>
                            <th>{order.quantities[0]}</th>
                            <th>{order.totalQuantity}</th>
                            <th>
                                <button
                                    className="btn status-btn"
                                    onClick={() => handleStatusUpdate(order.id)}
                                >
                                    {order.status === "В исполнении" ? "Доставлено" : "Готово"}
                                </button>
                            </th>
                        </tr>
                        {order.components.length > 1 &&
                            order.components.slice(1).map((component, index) => (
                                <tr key={component.id}>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>{component.name}</th>
                                    <th>{component.model}</th>
                                    <th>{order.quantities[index + 1]}</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            ))}
                    </React.Fragment>
                )
            )}
            </tbody>
        </table>
    )
        ;
};

export default TableOrders;