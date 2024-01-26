'use client'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { temperatureRecord } from '../types'
import { Spin, Flex, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import {
    chartHeaderStyle,
    chartContainerStyle,
    chartSubtext,
} from '../globalStyles'

interface ChartProps {
    data: temperatureRecord[]
    title: string
    subText: string
}

const TemperatureChart: React.FC<ChartProps> = ({ data, title, subText }) => {
    const [loading, setLoading] = useState<boolean>(true)
    const { Text } = Typography

    //The spinner state should actually be handled by a promise resolution
    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)
    }, [])

    const options = {
        grid: {
            left: 15,
            right: 15,
            bottom: 15,
            top: 50,
            containLabel: true,
            height: 200,
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            top: 0,
        },
        xAxis: {
            data: data.map((record) => record['date']),
        },
        tooltip: {
            position: function (point) {
                return [point[0], point[1]]
            },
            extraCssText: 'text-align:left',
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        yAxis: {},
        series: [
            {
                name: 'Highest',
                data: data.map((record) => record['highest']),
                type: 'line',
                smooth: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 2,
                },
                symbolSize: 10,
            },
            {
                name: 'Median',
                data: data.map((record) => record['median']),
                type: 'line',
                smooth: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 2,
                },
                symbolSize: 10,
            },
            {
                name: 'Lowest',
                data: data.map((record) => record['lowest']),
                type: 'line',
                smooth: false,
                emphasis: {
                    focus: 'series',
                },
                lineStyle: {
                    width: 2,
                },
                symbolSize: 10,
            },
        ],
        dataZoom: [
            {
                show: true,
                xAxisIndex: [0, 7],
                type: 'slider',
                top: 260, // Adjust the distance from the bottom
                start: 0,
                end: 1.97,
            },
        ],
    }

    return loading ? (
        <Flex
            gap="middle"
            wrap="wrap"
            justify="center"
            align="center"
            style={{ minHeight: '300px' }}
        >
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
        </Flex>
    ) : (
        <div style={chartContainerStyle}>
            <Flex
                justify="center"
                align="center"
                vertical
                style={chartHeaderStyle}
            >
                <Typography.Title level={4}>{title}</Typography.Title>
                <Text type="secondary" style={chartSubtext}>
                    {subText}
                </Text>
            </Flex>
            <ReactECharts option={options} />
        </div>
    )
}

export default TemperatureChart
