import React from 'react';
import axios from 'axios';

export default class extends React.Component {
    state = {
        temperature: 0,
        isLoading: false
    }

    getTime = () => {
        const getTime = new Date(),
            year = getTime.getFullYear(),
            month = getTime.getMonth() + 1,
            day = getTime.getDate(),
            hours = getTime.getHours();

        return {
            year,
            month,
            day,
            hours
        }
    }

    getTemperature = async () => {
        const getDate = this.getTime();

        const year = getDate.year,
            month = getDate.month,
            day = getDate.day
        const date = `${year}${month < 10 ? `0${month}` : `${month}`}${day < 10 ? `0${day}` : `${day}`}`;
        const endpoint = `http://openapi.seoul.go.kr:8088/566261794c7461653638534c656f6d/JSON/WPOSInformationTime/1/5/${date}`;
        const data = await axios.get(endpoint);
        const tempArray = data.data.WPOSInformationTime.row;
        const temperature = Number(tempArray.filter(item => item.SITE_ID === '중랑천')[0].W_TEMP);

        this.setState({
            temperature,
            isLoading: true
        })
    }

    componentDidMount() {
        this.getTemperature();
    }

    render() {
        const hours = this.getTime().hours;
        return (
            <article className="temp">
                {this.state.isLoading
                    ? [
                        <span className="temp__now">지금 한강은...</span>,
                        <span className="temp__temp">{this.state.temperature}</span>,
                        <div className="temp__standard">오늘 {hours < 10 ? `0${hours}` : hours}시 기준</div>,
                        <div className="temp__bg-drop">
                            <i className="fas fa-tint"></i>
                        </div>
                    ]
                    : 'Loading...'}
            </article>
        )
    }
};