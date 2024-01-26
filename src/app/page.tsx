'use client'
import TemperatureChart from './components/TemperatureChart'
import { temperatureRecord } from './types'
import { Typography } from 'antd'
import OpenWeather from './components/OpenWeather'
import {
    mainContainerStyle,
    sectionStyle,
    listStyle,
    textContainer,
} from './globalStyles'

export default function Home() {
    const { Text } = Typography

    const generateDummyData = (years: number) => {
        const currentDate = new Date()
        const temperatureDataArray: temperatureRecord[] = []

        for (let i = 0; i < 365 * years; i++) {
            const newDate = new Date(currentDate)
            newDate.setDate(currentDate.getDate() + i)
            const formattedDate = newDate.toISOString().split('T')[0]

            const lowestTemperature = Math.random() * 10 + 10
            const medianTemperature = Math.random() * 10 + 20
            const highestTemperature = Math.random() * 10 + 30

            temperatureDataArray.push({
                date: formattedDate,
                lowest: lowestTemperature,
                median: medianTemperature,
                highest: highestTemperature,
            })
        }
        return temperatureDataArray
    }

    return (
        <div style={mainContainerStyle}>
            <div>
                <div style={sectionStyle}>
                    <Typography.Title level={1} style={{ marginBottom: 0 }}>
                        Iván Rivera
                    </Typography.Title>
                    <Text>Frontend developer applicant - Agranimo 2024</Text>
                </div>

                <div style={sectionStyle}>
                    <Typography.Title level={2}>
                        Challenge description
                    </Typography.Title>

                    <div style={textContainer}>
                        <ul style={listStyle}>
                            <li>
                                <Text>
                                    1- Integrate with{' '}
                                    <a href="https://openweathermap.org/api/one-call-3#history">
                                        OpenWeather.
                                    </a>
                                </Text>
                            </li>
                            <li>
                                <Text>
                                    2- Load possible historical data. (Free plan
                                    provides up to 24 hours of historical data,
                                    check if there is a possibility to extend)
                                    Graph the Temperature data as a time series
                                    using the following libraries:
                                    echarts-for-react.
                                </Text>
                            </li>
                            <li>
                                <Text>
                                    3- For visual aspects, it is recommended to
                                    use libraries already used in Agranimo:
                                    ant-design
                                </Text>
                            </li>
                            <li>
                                <Text>
                                    4- Present a solution for the massive data
                                    loading. (In case of not achieving massive
                                    data loading, present a resolution strategy
                                    anyway)
                                </Text>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={sectionStyle}>
                <div style={textContainer}>
                    <Typography.Title level={3}>
                        Integration with OpenWeather
                    </Typography.Title>
                    <Text>
                        By selecting a date and location, the following chart
                        dynamically fetches data from OpenWeather.
                    </Text>
                </div>
                <OpenWeather
                    title="Fetching data from OpenWeather"
                    subText="Temperature records"
                />
            </div>

            <div style={sectionStyle}>
                <div style={textContainer}>
                    <Typography.Title level={3}>
                        Solution for the massive data loading.
                    </Typography.Title>
                    <Text>
                        The approach taken to overcome the challenge of
                        visualizing large datasets was to sort the daily records
                        and select the lowest and highest temperatures from each
                        day. Since, in this case, the data is related to
                        periodic timestamps (every twenty minutes), identifying
                        the median from the daily dataset will correspond to a
                        temperature record at noon (approximately 11:00 to
                        14:00). This information can help gather insights into
                        the central tendency of the temperature, providing a
                        representative value that is less influenced by
                        outliers. By focusing on the median, we obtain a robust
                        measure that reflects the typical temperature during the
                        specified time range, enhancing our understanding of the
                        dataset's overall trend.
                    </Text>
                </div>
                <div id="meh2">
                    {/*5 years of daily temperature records (highest, median, lowest)*/}
                    <TemperatureChart
                        title="Displaying 5 years of mock temperature data"
                        subText="Hovering on each line will set it in focus and display additional information about the sample. Use the scrollbar below to zoom in on the data."
                        data={generateDummyData(5)}
                    />
                </div>
            </div>
        </div>
    )
}
