import React from 'react';
import axios from 'axios';

export default class extends React.Component {
    state = {
        temperature: 0,
        isLoading: false
    }

    getTemperature = async () => {
        const getDate = new Date()
        const year = getDate.getFullYear();
        const month = getDate.getMonth() + 1;
        const day = getDate.getDate();
        const date = `${year}${month < 10 ? `0${month}` : `${month}`}${day < 10 ? `0${day}` : `${day}`}`;
        const endpoint = `http://openapi.seoul.go.kr:8088/566261794c7461653638534c656f6d/JSON/WPOSInformationTime/1/5/${date}`;
        const data = await axios.get(endpoint);
        const tempArray = data.data.WPOSInformationTime.row;
        const temperature = tempArray.filter(item => item.SITE_ID === '중랑천')[0].W_TEMP;
        this.setState({
            temperature: Number(temperature),
            isLoading: true
        })
    }
    componentDidMount() {
        this.getTemperature();
    }

    render() {
        return (
            <article>
                {this.state.isLoading
                    ? this.state.temperature
                    : 'Loading...'}
            </article>
        )
    }
};