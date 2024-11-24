import React, {useState} from 'react';

const SearchAndFilter = ({components, onFilterAndSearch}) => {
    const [searchParam, setSearchParam] = useState("name");
    const [searchValue, setSearchValue] = useState("");

    const [filterParam, setFilterParam] = useState("");
    const [filterValue, setFilterValue] = useState("");

    // Производители (должны быть уникальными)
    const manufacturers = Array.from(new Set(components.map(c => c.component.manufacture)));

    // Обработчик подтверждения
    const handleSubmit = () => {
        const filterCriteria = {param: filterParam, value: filterValue};
        const searchCriteria = {param: searchParam, value: searchValue};
        onFilterAndSearch(searchCriteria, filterCriteria);
    };

    return (
        <div className="search-and-filter">
            <div style={{fontSize: 23}}>Поиск и фильтрация</div>

            {/* Поиск */}
            <div className="main-search">
                <h2>Поиск</h2>
                <div className="search">
                    <div className="radio">
                        <div className="radioBtn">
                            <input
                                type="radio"
                                name="srch"
                                value="name"
                                checked={searchParam === "name"}
                                onChange={(e) => setSearchParam(e.target.value)}
                            />
                            <label>Название</label>
                        </div>
                        <div className="radioBtn">
                            <input
                                type="radio"
                                name="srch"
                                value="model"
                                checked={searchParam === "model"}
                                onChange={(e) => setSearchParam(e.target.value)}
                            />
                            <label>Модель</label>
                        </div>
                    </div>
                    <div className="searchField">
                        <input
                            type="text"
                            placeholder="Введите значение для поиска"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Фильтрация */}
            <div className="main-search">
                <h2>Фильтрация</h2>
                <div className="search">
                    <div className="radio">
                        <div className="radioBtn">
                            <input
                                type="radio"
                                name="filtr"
                                value="category"
                                checked={filterParam === "category"}
                                onChange={(e) => setFilterParam(e.target.value)}
                            />
                            <label>Категория</label>
                        </div>
                        <div className="radioBtn">
                            <input
                                type="radio"
                                name="filtr"
                                value="manufacture"
                                checked={filterParam === "manufacture"}
                                onChange={(e) => setFilterParam(e.target.value)}
                            />
                            <label>Производитель</label>
                        </div>
                        <div className="radioBtn">
                            <input
                                type="radio"
                                name="filtr"
                                value="price"
                                checked={filterParam === "price"}
                                onChange={(e) => setFilterParam(e.target.value)}
                            />
                            <label>Стоимость</label>
                        </div>
                        <div className="radioBtn">
                            <input
                                type="radio"
                                name="filtr"
                                value="quantity"
                                checked={filterParam === "quantity"}
                                onChange={(e) => setFilterParam(e.target.value)}
                            />
                            <label>Количество</label>
                        </div>
                    </div>

                    <div className="custom-select">
                        {filterParam === "category" && (
                            <select onChange={(e) => setFilterValue(e.target.value)}>
                                <option value="">Выберите категорию</option>
                                <option value="Процессор">Процессор</option>
                                <option value="Видеокарта">Видеокарта</option>
                                <option value="Оперативная память">Оперативная память</option>
                                <option value="Материнская плата">Материнская плата</option>
                                <option value="Накопитель">Накопитель</option>
                                <option value="Компьютерная мышь">Компьютерная мышь</option>
                                <option value="Монитор">Монитор</option>
                                <option value="Клавиатура">Клавиатура</option>
                                <option value="Блок питания">Блок питания</option>
                                <option value="Корпус">Корпус</option>
                                <option value="Система охлаждения">Система охлаждения</option>
                            </select>
                        )}

                        {filterParam === "manufacture" && (
                            <select onChange={(e) => setFilterValue(e.target.value)}>
                                <option value="">Выберите производителя</option>
                                {manufacturers.map((man, idx) => (
                                    <option key={idx} value={man}>
                                        {man}
                                    </option>
                                ))}
                            </select>
                        )}

                        {(filterParam === "price" || filterParam === "quantity") && (
                            <input
                                type="number"
                                placeholder={`Введите значение для ${filterParam}`}
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="submit-btn">
                <button className="btn submit-btn" onClick={handleSubmit}>
                    Подтвердить
                </button>
            </div>
        </div>
    );
};


export default SearchAndFilter;