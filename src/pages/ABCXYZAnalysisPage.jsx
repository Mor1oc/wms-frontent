import React, {useEffect, useMemo, useState} from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip as ReTooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ScatterChart,
    Scatter,
    LineChart,
    Line
} from 'recharts';
import {useFetching} from "../hooks/useFetching";
import Service from "../API/Service";

const MAX_SLICES = 9;

const ABCXYZAnalysisPage = () => {
    const [demandData, setDemandData] = useState({
        componentABCList: [],
        componentXYZList: [],
    });

    const [fetchData, analysisError] = useFetching(async () => {
        const response = await Service.getABCAndXYZWarehouses()
        setDemandData(response.data)
    })

    const { componentABCList, componentXYZList } = demandData;

    // Prepare ABC data
    const abcPieData = componentABCList.map(item => ({
        name: item.componentDTO.name,
        model: item.componentDTO.model,
        value: item.percentOfTotalRevenue
    }));
    const abcBarData = componentABCList.map(item => ({
        name: item.componentDTO.name,
        model: item.componentDTO.model,
        revenue: item.revenue
    }));

    // Prepare XYZ data: average monthly revenue & coefficient of variation
    const xyzScatterData = componentXYZList.map(item => {
        const months = Object.values(item.monthlyRevenue);
        const sum = months.reduce((a, b) => a + b, 0);
        const avg = months.length ? sum / months.length : 0;
        return {
            name: item.componentDTO.name,
            model: item.componentDTO.model,
            coefficientOfVariation: item.coefficientOfVariation,
            avgMonthlyRevenue: avg
        };
    });


    // Prepare overall monthly revenue trend
    const monthTotals = {};
    componentXYZList.forEach(item => {
        Object.entries(item.monthlyRevenue).forEach(([month, rev]) => {
            monthTotals[month] = (monthTotals[month] || 0) + rev;
        });
    });
    const trendData = Object.entries(monthTotals)
        .map(([month, revenue]) => ({ month, revenue }))
        .sort((a, b) => a.month.localeCompare(b.month));

    // Color palette
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

    const pieData = useMemo(() => {
        const sorted = [...abcPieData].sort((a, b) => b.value - a.value);
        const top = sorted.slice(0, MAX_SLICES);
        const rest = sorted.slice(MAX_SLICES);

        if (rest.length > 0) {
            const otherValue = rest.reduce((sum, item) => sum + item.value, 0);
            const otherComponents = rest.map(({ name, model }) => ({ name, model }));
            top.push({
                name: 'Прочие',
                value: otherValue,
                others: otherComponents
            });
        }

        return top;
    }, [abcPieData]);

    // 2) Кастомный тултип: для «Прочие» покажем список others
    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload || !payload.length) return null;
        const { name, model, value, others } = payload[0].payload;
        return (
            <div style={{ background: '#fff', padding: 10, border: '1px solid #ccc' }}>
                <strong>{name} {model}: {value}%</strong>
                {others && (
                    <ul style={{ marginTop: 6, fontSize: 12, paddingLeft: 15 }}>
                        {others.map((item, idx) => (
                            <li key={idx}>
                                {item.name} — <em>{item.model}</em>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    const CustomTooltipBar = ({ active, payload }) => {
        if (!active || !payload || !payload.length) return null;

        const data = payload[0].payload;

        return (
            <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}>
                <strong>{data.name}</strong><br />
                Модель: {data.model}<br />
                Выручка: {data.revenue}
            </div>
        );
    };

    const CustomTooltipChart = ({ active, payload }) => {
        if (!active || !payload || !payload.length) return null;

        const data = payload[0].payload;

        return (
            <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
                <strong>{data.name}</strong><br />
                Модель: {data.model}<br />
                Коэф. вариации: {data.coefficientOfVariation}<br />
                Средн. прибыль: {data.avgMonthlyRevenue}
            </div>
        );
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="analysis-page">
            {/* ABC Analysis Section */}
            <section className="abc-section">
                <h2>ABC Анализ</h2>
                <div className="abc-charts">
                    <div className="abc-pie-chart">
                        <h3>Процент выручки по комплектующим</h3>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {pieData.map((entry, idx) => (
                                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                                ))}
                            </Pie>
                            <ReTooltip content={<CustomTooltip />} />
                        </PieChart>
                    </div>
                    <div className="abc-bar-chart">
                        <h3>Выручка по комплектующим</h3>
                        <BarChart width={600} height={300} data={abcBarData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ReTooltip content={<CustomTooltipBar />} />
                            <Legend />
                            <Bar dataKey="revenue" />
                        </BarChart>
                    </div>
                </div>
            </section>

            {/* XYZ Analysis Section */}
            <section className="xyz-section">
                <h2>XYZ Анализ</h2>
                <div className="xyz-charts">
                    <div className="xyz-scatter-chart">
                        <h3>Коэффициент вариации к Среднему ежемесячному доходу комплектующего</h3>
                        <ScatterChart width={600} height={300}>
                            <CartesianGrid />
                            <XAxis
                                type="number"
                                dataKey="coefficientOfVariation"
                                name="Коэфф. Вариации"
                                unit=""
                            />
                            <YAxis
                                type="number"
                                dataKey="avgMonthlyRevenue"
                                name="Средняя прибыль"
                                unit=""
                            />
                            <ReTooltip content={<CustomTooltipChart />} cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter data={xyzScatterData} fill="#8884d8" />
                        </ScatterChart>
                    </div>
                    <div className="xyz-line-chart">
                        <h3>Общая выручка по месяцам</h3>
                        <LineChart width={600} height={300} data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ReTooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" dot={false} />
                        </LineChart>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ABCXYZAnalysisPage;