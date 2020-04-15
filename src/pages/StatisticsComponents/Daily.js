import React from 'react';
import Drop from '../Components/Drop';
import { axisX } from './axisX';
import { title } from './title';


export default class extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas,
            ctx = canvas.getContext("2d"),
            width = canvas.width = 1000,
            height = canvas.height = 500;

        ctx.strokeStyle = '#f6f6f6';
        ctx.strokeRect(0, 0, width, height);

        title(ctx);
        axisX(ctx, height);





    }

    render() {
        return (
            <article className="temp">
                <canvas ref="canvas"></canvas>
                <Drop></Drop>
            </article>
        )
    }
};