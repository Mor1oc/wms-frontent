import React from 'react';

const PlannedOrders = ({orders, handleStatusUpdate}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Дата заказа</th>
                <th>дата доставки</th>
                <th>Название комплектующего</th>
                <th>Модель комплектующего</th>
                <th>Количество</th>
                <th>Общее количество</th>
                <th>Подтверждение</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => (
                    <React.Fragment key={index}>
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{order.orderDate ? order.orderDate : "----"}</th>
                            <th>{order.deliveryDate ? order.deliveryDate : "----"}</th>
                            <th>{order.components[0].name}</th>
                            <th>{order.components[0].model}</th>
                            <th>{order.quantities[0]}</th>
                            <th>{order.totalQuantity}</th>
                            <th>
                                <button
                                    className="btn status-btn"
                                    onClick={() => handleStatusUpdate(order.id)}
                                >
                                    Создать
                                </button>
                            </th>
                        </tr>
                        {order.components.length > 1 &&
                            order.components.slice(1).map((component, index) => (
                                <tr key={component.id}>
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
}

export default PlannedOrders;