import React, {useState} from 'react';

const CreateOrder = ({componentsList, onSave, onClose}) => {
    const [formData, setFormData] = useState({
        orderDate: "",
        deliveryDate: "",
        components: [],
        quantities: [],
        status: "Запланирован",
        newComponent: {
            name: "",
            category: "Процессор",
            manufacture: "",
            model: "",
            price: 0,
        },
    });
    const [quantitiesById, setQuantitiesById] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredComponents, setFilteredComponents] = useState(componentsList || []);
    const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
    const [quantityInput, setQuantityInput] = useState(1);

    // Обновление значений формы
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Обновление компонента
    const handleNewComponentChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            newComponent: {
                ...prev.newComponent,
                [name]: value,
            },
        }));
    };

    // Валидация дат
    const isDeliveryDateValid =
        formData.orderDate && formData.deliveryDate &&
        new Date(formData.deliveryDate) >= new Date(formData.orderDate);

    // Поиск компонентов
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredComponents(
            componentsList.filter((component) =>
                component.name.toLowerCase().includes(query)
            )
        );
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setQuantityInput(value > 0 ? value : 1);
    };

    const handleIdQuantityChange = (id, value) => {
        const quantity = Math.max(1, parseInt(value, 10) || 1); // Минимум 1
        setQuantitiesById((prev) => ({
            ...prev,
            [id]: quantity,
        }));
    };

    const addComponent = () => {
        const {newComponent, quantities} = formData;

        setFormData((prev) => ({
            ...prev,
            components: [...prev.components, newComponent],
            quantities: [...quantities, quantityInput],
            newComponent: {
                name: "",
                category: "Процессор",
                manufacture: "",
                model: "",
                price: 0,
            },
        }));
    };

    // Добавление выбранного компонента в заказ
    const addSelectedComponent = () => {
        if (selectedComponentIndex === null) {
            alert("Выберите компонент из списка.");
            return;
        }

        const selectedComponent = filteredComponents[selectedComponentIndex];

        // Проверяем, не добавлен ли компонент ранее
        const existingIndex = formData.components.findIndex(
            (comp) => comp.id === selectedComponent.id
        );

        if (existingIndex !== -1) {
            // Обновляем количество для уже добавленного компонента
            setFormData((prev) => {
                const newQuantities = [...prev.quantities];
                newQuantities[existingIndex] += quantityInput;

                return {
                    ...prev,
                    quantities: newQuantities,
                };
            });
        } else {
            // Добавляем новый компонент и его количество
            setFormData((prev) => ({
                ...prev,
                components: [...prev.components, selectedComponent],
                quantities: [...prev.quantities, quantityInput],
            }));
        }

        setSelectedComponentIndex(null); // Сбрасываем выбор
        setQuantityInput(1); // Сбрасываем количество
    };

    const removeComponent = (index) => {
        setFormData((prev) => ({
            ...prev,
            components: prev.components.filter((_, i) => i !== index),
            quantities: prev.quantities.filter((_, i) => i !== index),
        }));
    };

    // Сохранение заказа
    const handleSave = () => {
        const {orderDate, deliveryDate, components, quantities, status} = formData;

        if (!isDeliveryDateValid) {
            alert("Дата доставки должна быть не раньше даты заказа.");
            return;
        }

        if (!components.length) {
            alert("Добавьте хотя бы один компонент.");
            return;
        }
        const newOrder = {
            orderDate,
            deliveryDate,
            components,
            quantities,
            status,
            totalQuantity: quantities.reduce((acc, q) => acc + q, 0),
        };
        console.log(newOrder)

        onSave(newOrder);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 style={{marginBottom: 10}}>Создание нового заказа</h2>
                <div className="date">
                    <div>
                        <label>Дата заказа:</label>
                        <input
                            type="date"
                            name="orderDate"
                            value={formData.orderDate}
                            onChange={handleChange}
                        />
                        <label>Дата доставки:</label>
                        <input
                            type="date"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-component"
                         style={{alignItems: "center"}}>
                        <label>Статус заказа:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Запланирован">Запланирован</option>
                            <option value="Готовится к отправке">Готовится к отправке</option>
                        </select>
                    </div>
                </div>
                <div className="components">
                    <h6>Добавить компоненты</h6>
                    <div className="existing-components">
                        <input
                            type="text"
                            placeholder="Поиск компонентов..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <div className="table-container">
                            <table>
                                <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Модель</th>
                                    <th>Количество</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredComponents.map((component, index) => (
                                    <tr key={index}>
                                        <th>{component.name}</th>
                                        <th>{component.model}</th>
                                        <th>
                                            <input
                                                type="number"
                                                name={`quantity-${component.id}`}
                                                value={quantitiesById[component.id] || 1}
                                                onChange={(e) => handleIdQuantityChange(component.id, e.target.value)}
                                                min="1"
                                            />
                                        </th>
                                        <th>
                                            <button className="btn status-btn"
                                                onClick={() => {
                                                    const quantity = quantitiesById[component.id] || 1;
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        components: [...prev.components, component],
                                                        quantities: [...prev.quantities, quantity],
                                                    }));

                                                    setQuantitiesById((prev) => {
                                                        const newQuantities = {...prev};
                                                        delete newQuantities[component.id];
                                                        return newQuantities;
                                                    });
                                                }}
                                            >Добавить
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <h6>Выбранные компоненты</h6>
                        <table>
                            <thead>
                            <tr>
                                <th>Название</th>
                                <th>Модель</th>
                                <th>Количество</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {formData.components.map((component, index) => (
                                <tr key={index}>
                                    <th>{component.name}</th>
                                    <th>{component.model}</th>
                                    <th>{formData.quantities[index]}</th>
                                    <th>
                                        <button
                                            className="btn status-btn"
                                            style={{margin: 5}}
                                            onClick={() => removeComponent(index)}
                                        >Удалить
                                        </button>
                                    </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h6>Или создайте новый компонент</h6>
                        <div className="add-component">
                            <input
                                type="text"
                                name="name"
                                placeholder="Название"
                                value={formData.newComponent.name}
                                onChange={handleNewComponentChange}
                            />
                            <select
                                name="category"
                                value={formData.newComponent.category}
                                onChange={handleNewComponentChange}
                            >
                                <option>Процессор</option>
                                <option>Видеокарта</option>
                                <option>Оперативная память</option>
                                <option>Материнская плата</option>
                                <option>Накопитель</option>
                                <option>Компьютерная мышь</option>
                                <option>Монитор</option>
                                <option>Клавиатура</option>
                                <option>Блок питания</option>
                                <option>Корпус</option>
                                <option>Система охлаждения</option>
                            </select>
                            <input
                                type="text"
                                name="manufacture"
                                placeholder="Производитель"
                                value={formData.newComponent.manufacture}
                                onChange={handleNewComponentChange}
                            />
                            <input
                                type="text"
                                name="model"
                                placeholder="Модель"
                                value={formData.newComponent.model}
                                onChange={handleNewComponentChange}
                            />
                            <label htmlFor="price"> Цена
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Цена"
                                    value={formData.newComponent.price}
                                    onChange={handleNewComponentChange}
                                    min="1"
                                />
                            </label>
                            <label htmlFor="quantity"> Количество
                                <input
                                    type="number"
                                    name="quantities"
                                    placeholder="Количество"
                                    value={quantityInput}
                                    onChange={handleQuantityChange}
                                    min="1"
                                />
                            </label>
                        </div>
                        <button
                            className="btn status-btn"
                            onClick={addComponent}
                        >Добавить компонент
                        </button>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", margin: "0 30px"}}>
                    <button
                        className="btn status-btn"
                        onClick={handleSave}
                    >Сохранить заказ
                    </button>
                    <button
                        className="btn status-btn"
                        onClick={onClose}
                    >Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;