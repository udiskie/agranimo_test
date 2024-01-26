'use client'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import axios from 'axios'
import { Select, DatePicker, Flex, Typography } from 'antd'
import {
    chartHeaderStyle,
    chartContainerStyle,
    chartSubtext,
} from '../globalStyles'
import { OpenweatherWeatherData } from '../types'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

interface OpenWeatherChartProps {
    title: string
    subText: string
}

// city[0] arica
// city[1] santiago
// city[2] punta arenas
const city: number[][] = [
    [-18.47817073799424, -70.31094948137753],
    [-33.44861945026337, -70.66417533501557],
    [-53.16356572437546, -70.90970397617451],
]

const OpenWeather: React.FC<OpenWeatherChartProps> = ({ title, subText }) => {
    let weatherData: OpenweatherWeatherData | undefined = undefined
    const { Text } = Typography
    const apiKey: string = 'a223bf57b5a102708835ae69650184e0'
    const [chartData, setChartData] = useState<any>(undefined)
    const [currentDate, setCurrentDate] = useState<any>(
        dayjs().format('YYYY-MM-DD'),
    )
    const [latitude, setLatitude] = useState(city[1][0])
    const [longitude, setLongitude] = useState(city[1][1])
    const { RangePicker } = DatePicker

    let isMounted = true
    dayjs.extend(customParseFormat)
    const dateFormat = 'YYYY/MM/DD'

    const handleDateChange = (value: any) => {
        setCurrentDate(dayjs(value).format('YYYY-MM-DD'))
    }

    const handleSelectChange = (value: any) => {
        console.log(value)
        setLatitude(city[value][0])
        setLongitude(city[value][1])
    }

    const getWeatherData = async (lat: number, lon: number, date: string) => {
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&appid=${apiKey}`

        try {
            const response = await axios.get(apiUrl)
            return response.data
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        console.log('meh')
        if (isMounted) {
            getWeatherData(latitude, longitude, currentDate)
                .then((data) => {
                    const { min, max, ...filteredTemperatureData } =
                        data.temperature

                    const customOrder = [
                        'morning',
                        'afternoon',
                        'evening',
                        'night',
                    ]

                    const sortedTemperatureData = Object.fromEntries(
                        Object.entries(filteredTemperatureData).sort(
                            (a, b) =>
                                customOrder.indexOf(a[0]) -
                                customOrder.indexOf(b[0]),
                        ),
                    )

                    setChartData({
                        xAxis: {
                            data: Object.keys(sortedTemperatureData),
                        },
                        series: [
                            {
                                data: Object.values(sortedTemperatureData),
                                type: 'line',
                                smooth: true,
                            },
                        ],
                    })

                    console.log('Weather Data:', data)
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error)
                })
        }

        return () => {
            isMounted = false
        }
    }, [latitude, longitude, currentDate])

    const options = {
        grid: {
            bottom: 20,
            height: 250,
        },
        xAxis: chartData?.xAxis,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        yAxis: {},
        series: chartData?.series || [
            {
                type: 'line',
                smooth: true,
            },
        ],
    }

    const locations: any[] = [
        {
            value: 0,
            label: 'Arica',
        },
        {
            value: 1,
            label: 'Santiago',
        },
        {
            value: 2,
            label: 'Punta Arenas',
        },
    ]

    return (
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
                <div>
                    <DatePicker
                        onChange={handleDateChange}
                        defaultValue={dayjs()}
                        format={dateFormat}
                        style={{ marginRight: '8px' }}
                    />
                    <Select
                        defaultValue={locations[1]}
                        style={{ width: 200 }}
                        onChange={handleSelectChange}
                        options={locations}
                    />
                </div>
            </Flex>
            {chartData && <ReactECharts option={options} />}
        </div>
    )
}

export default OpenWeather
