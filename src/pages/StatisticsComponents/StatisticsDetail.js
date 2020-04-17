import React from 'react';
import Drop from '../Components/Drop';
import { AxisX, Title, LineColor, TickAndParams, DrawGraph } from './canvas';
import { Redirect } from 'react-router-dom';


export default class extends React.Component {
    state = {
        errorOccurred: false
    }

    renderRedirect() {
        return (
            <Redirect to="/error" />
        )
    }

    componentDidMount() {
        const canvas = document.querySelector("#statistics")
        const ctx = canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 500;

        DrawGraph(ctx)
            ? this.setState({ errorOccurred: true })
            :
            Title(ctx);
        LineColor(ctx);
        AxisX(ctx);
        TickAndParams(ctx);
    }

    render() {
        return (
            <main className="temp">
                {this.state.errorOccurred
                    ? this.renderRedirect()
                    : [
                        <canvas id="statistics"></canvas>,
                        <div className="temp__toStatistics">
                            <a href="/" className="statistics__link">
                                홈으로
                            </a>
                        </div>,
                        <div className="canvasBox">
                            <div className="sta-box1 sta-temp">d</div>
                            <div className="sta-box2 sta-temp">d</div>
                        </div>,
                        <Drop></Drop>
                    ]
                }
            </main >
        )
    }
};