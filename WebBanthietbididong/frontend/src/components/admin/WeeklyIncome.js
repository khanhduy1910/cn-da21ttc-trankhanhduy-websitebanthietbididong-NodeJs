import React, { useEffect, useState } from "react";
import Chart from "../../components/admin/Chart";
import axios from "axios";

export default function WeeklyIncome() {
    const [weeklyStats, setWeeklyStats] = useState([]);

    useEffect(() => {
        const fetchWeeklyIncome = async () => {
            try {
                const res = await axios.get('/api/v1/admin/orders/weekly-income');
                const weeklyData = res.data.map((item) => ({
                    name: `Tuần ${item._id}`,
                    "Doanh thu": item.total,
                }));
                setWeeklyStats(weeklyData);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu doanh thu hàng tuần:", err);
            }
        };
        fetchWeeklyIncome();
    }, []);

    return (
        <div>
            <Chart
                data={weeklyStats}
                title="Doanh thu hàng tuần"
                grid
                dataKey="Doanh thu"
            />
        </div>
    );
}
