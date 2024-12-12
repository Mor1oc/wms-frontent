import axios from "axios";

export default class Service {
    static async getComponentsInStock() {
        const token = localStorage.getItem('token')
        return await axios.get('http://localhost:8080/warehouse', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async getAllOrders() {
        const token = localStorage.getItem('token')
        return await axios.get('http://localhost:8080/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async getOrdersWithStatus(status) {
        const token = localStorage.getItem('token')
        return await axios.get('http://localhost:8080/orders/status', {
            params: {status},
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    static async updateOrder(id) {
        const token = localStorage.getItem('token')
        return await axios.put(`http://localhost:8080/order/complete/${id}`, {},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async inProgressOrder(id) {
        const token = localStorage.getItem('token')
        return await axios.put(`http://localhost:8080/order/in-progress/${id}`, {},
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async createOrder(order) {
        const token = localStorage.getItem('token')
        return await axios.post(`http://localhost:8080/order`, order,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    static async getAllComponents() {
        const token = localStorage.getItem('token')
        return await axios.get(`http://localhost:8080/components`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async setQuantityWarehouse(id, quantity) {
        const token = localStorage.getItem('token')
        return await axios.put(`http://localhost:8080/warehouse/${id}`, quantity, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
    }

    static async getForecastOrders() {
        const token = localStorage.getItem('token')
        return await axios.get(`http://localhost:8080/orders/forecast`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    }

    static async getAnalysisWarehouses() {
        const token = localStorage.getItem('token')
        return await axios.get(`http://localhost:8080/warehouse/analysis`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    }
}