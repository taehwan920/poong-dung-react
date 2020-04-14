import React from 'react';
import axios from 'axios';
import Drop from '../Components/Drop';

export default class extends React.Component {
    state = {
        time: 0,
        temperature: 0,
        isLoading: false
    }

    getTemperature = async () => {
        const endpoint = `http://localhost:8080/db/1/1`;
        const data = await axios.get(endpoint);
        const latest = data.data[0]
        const temperature = latest.temperature;
        const time = latest.time;
        this.setState({
            time,
            temperature,
            isLoading: true
        })
    }

    componentDidMount() {
        this.getTemperature();
    }

    render() {
        const temperature = this.state.temperature;
        const time = this.state.time;
        return (
            <article className="temp">
                {this.state.isLoading
                    ? [
                        <span className="temp__now">지 금 한 강 은...</span>,
                        <span className="temp__temp">{temperature}℃</span>,
                        <div className="temp__toStatistics">
                            <a href="/statistics" className="statistics__link">
                                통계 보기
                            </a>
                        </div>,
                        <div className="temp__standard">오늘 {time < 10 ? `0${time}` : time}시, 중랑천 기준</div>,
                        <Drop></Drop>
                    ]
                    : 'Loading...'}
            </article>
        )
    }
};