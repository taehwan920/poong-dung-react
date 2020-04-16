import React from 'react';
import Drop from '../Components/Drop';
import { AxisX, Title, LineColor, TickAndParams, DrawGraph } from './canvas';


export default class extends React.Component {
    componentDidMount() {
        const canvas = document.querySelector("#statistics"),
            ctx = canvas.getContext("2d");
        canvas.height = 500;
        canvas.width = 1000

        Title(ctx);
        LineColor(ctx);
        AxisX(ctx);
        TickAndParams(ctx);
        DrawGraph(ctx);
    }

    render() {
        return (
            <article className="temp">
                <canvas id="statistics"></canvas>
                <div className="temp__toStatistics">
                    <a href="/" className="statistics__link">
                        홈으로
                    </a>
                </div>
                <Drop></Drop>
            </article>
        )
    }
};