import Axios from 'axios';
import React from 'react';
import Drop from '../Components/Drop';
import { axisX, title, lineColour } from './canvas';


export default class extends React.Component {
    state = {
        datas: null
    }

    getAPI = async () => {
        const endpoint = `http://localhost:8080/db/1/8`;
        const data = await Axios.get(endpoint);
        const datas = data.data;
        if (!this.state.datas) {
            this.setState({ datas });
        };
    }

    componentDidMount() {
        this.getAPI();
        // const tempDatas = this.state.datas ? this.state.datas : null;
        const canvas = document.querySelector("#daily-temp"),
            ctx = canvas.getContext("2d"),
            width = canvas.width = 1000,
            height = canvas.height = 500;

        title(ctx);
        lineColour(ctx);
        axisX(ctx, height);





    }

    render() {
        return (
            <article className="temp">
                <canvas id="daily-temp" ref="canvas"></canvas>
                <Drop></Drop>
            </article>
        )
    }
};