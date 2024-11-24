import React, {useEffect, useState} from 'react';
import PlannedOrders from "../components/Planning/PlannedOrders";
import CreateOrder from "../components/Planning/CreateOrder";
import ComponentService from "../API/Service";
import {useFetching} from "../hooks/useFetching";

const Planning = () => {
    const [orders, setOrders] = useState([]);
    const [componentsList, setComponents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [fetchOrders, orderError] = useFetching(async () => {
        const response1 = await ComponentService.getOrdersWithStatus('Запланирован')
        setOrders(response1.data)
        console.log(orders)
    })

    const [fetchComponents, componentError] = useFetching(async () => {
        const response1 = await ComponentService.getAllComponents()
        setComponents(response1.data)
        console.log(orders)
    })

    const handleStatusUpdate = async (id) => {
        try {
            const response = await ComponentService.inProgressOrder(id);
            console.log("Статус обновлен:", response.data);
            fetchOrders()
        } catch (error) {
            console.error("Ошибка обновления статуса:", error);
        }
    };

    const handleSaveOrder = async (newOrder) => {
        setOrders((prev) => [...prev, {id: prev.length + 1, ...newOrder}]);
        console.log(newOrder);
        try {
            const response = await ComponentService.createOrder(newOrder);
            console.log("Заказы обновлены: ", response.data);
            fetchOrders()
        } catch (error) {
            console.error("Ошибка обновления статуса: ", error);
        }
        setIsModalOpen(false);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        fetchOrders()
        fetchComponents()
    }, [])

    return (
        <div>
            <div className="page-name">
                Поставки и отгрузки
                <button
                    className="btn status-btn"
                    onClick={openModal}
                >Создать заказ</button>
                {isModalOpen && (
                    <CreateOrder
                        componentsList={componentsList}
                        onSave={handleSaveOrder}
                        onClose={closeModal}
                    />
                )}
            </div>
            <div className="main">
                <PlannedOrders
                    orders={orders}
                    handleStatusUpdate={handleStatusUpdate}
                />
            </div>
        </div>
    );
};

export default Planning;