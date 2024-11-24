import React from 'react';
import TableOrders from "./TableOrders";

const OrdersInProgress = () => {
    return (
        <div>
            <div className="page-name">
                Поставки и отгрузки
            </div>
            <div className="main">
                <TableOrders/>
            </div>
        </div>
    );
};

export default OrdersInProgress;