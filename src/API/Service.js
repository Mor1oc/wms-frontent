import axios from "axios";

export default class Service {
    static async getComponentsInStock() {
        return await axios.get('http://localhost:8080/warehouse')
    }

    static async getAllOrders() {
        return await axios.get('http://localhost:8080/orders')
    }

    static async getOrdersWithStatus(status) {
        return await axios.get('http://localhost:8080/orders/status', {
            params: {status},
        })
    }

    static async updateOrder(id) {
        return await axios.put(`http://localhost:8080/order/complete/${id}`)
    }

    static async inProgressOrder(id) {
        return await axios.put(`http://localhost:8080/order/in-progress/${id}`)
    }

    static async createOrder(order) {
        return await axios.post(`http://localhost:8080/order`, order)
    }

    static async getAllComponents() {
        return await axios.get(`http://localhost:8080/components`)
    }

    static async setQuantityWarehouse(id, quantity) {
        return await axios.put(`http://localhost:8080/warehouse/${id}`, quantity, {
            headers: {
                "Content-Type": "application/json", // Указываем правильный формат
            },
        })
    }
}