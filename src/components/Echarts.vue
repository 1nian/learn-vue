<template>
    <div>
        <div>
            <label for="xAxisSelect">选择 X 轴数据源：</label>
            <select
                id="xAxisSelect"
                v-model="selectedXAxis"
                @change="updateChart"
            >
                <option v-for="axis in xAxisOptions" :key="axis" :value="axis">
                    {{ axis }}
                </option>
            </select>
        </div>
        <div>
            <label for="chartTypeSelect">选择图表类型：</label>
            <select
                id="chartTypeSelect"
                v-model="selectedChartType"
                @change="updateChart"
            >
                <option value="line">折线图</option>
                <option value="bar">柱状图</option>
                <option value="pie">饼图</option>
            </select>
        </div>
        <div ref="chart" style="width: 400px; height: 400px"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";

export default {
    data() {
        return {
            selectedXAxis: "Date",
            selectedChartType: "line",
            chartInstance: null,
            data: {
                Date: {
                    xData: [
                        "2024-01-01",
                        "2024-01-02",
                        "2024-01-03",
                        "2024-01-04",
                    ],
                    yData: [820, 932, 901, 934],
                },
                Category: {
                    xData: ["A", "B", "C", "D"],
                    yData: [120, 200, 150, 80],
                },
                pieData: [
                    { name: "A", value: 1048 },
                    { name: "B", value: 735 },
                    { name: "C", value: 580 },
                    { name: "D", value: 484 },
                ],
            },
            xAxisOptions: ["Date", "Category"],
        };
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
            this.chartInstance = echarts.init(this.$refs.chart);
            this.updateChart();
        },
        updateChart() {
            let option = {};
            switch (this.selectedChartType) {
                case "line":
                    option = this.getLineChartOption();
                    break;
                case "bar":
                    option = this.getBarChartOption();
                    break;
                case "pie":
                    option = this.getPieChartOption();
                    break;
            }
            this.chartInstance.setOption(option);
        },
        getLineChartOption() {
            return {
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: this.data[this.selectedXAxis].xData,
                    axisLine: {
                        lineStyle: {
                            color: "#333",
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#333",
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                            color: "#ccc",
                        },
                    },
                },
                series: [
                    {
                        data: this.data[this.selectedXAxis].yData,
                        type: "line",
                        smooth: true,
                        lineStyle: {
                            color: "#42a5f5",
                        },
                        itemStyle: {
                            color: "#ff5722",
                        },
                    },
                ],
                markLine: {
                    data: [
                        { type: "average", name: "Average" },
                        { xAxis: "A", name: "Point A" },
                        { xAxis: "C", name: "Point C" },
                    ],
                    lineStyle: {
                        type: "dashed",
                        color: "#ff0000",
                    },
                },
            };
        },
        getBarChartOption() {
            return {
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: this.data[this.selectedXAxis].xData,
                    axisLine: {
                        lineStyle: {
                            color: "#333",
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#333",
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                            color: "#ccc",
                        },
                    },
                },
                series: [
                    {
                        data: this.data[this.selectedXAxis].yData,
                        type: "bar",
                        itemStyle: {
                            color: "#42a5f5",
                        },
                    },
                ],
            };
        },
        getPieChartOption() {
            return {
                series: [
                    {
                        type: "pie",
                        radius: "55%",
                        data: this.data.pieData,
                        label: {
                            show: true,
                            formatter: "{b}: {c}",
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };
        },
    },
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>
