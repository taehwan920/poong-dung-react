import React from 'react';
import Drop from '../Components/Drop';
import Canvas from './Canvas';


export default class extends React.Component {
    render() {
        return (
            <main className="temp">
                <Canvas></Canvas>
                {/* <canvas id="statistics"></canvas> */}
                <div className="temp__toStatistics">
                    <a href="/" className="statistics__link">
                        홈으로
                                </a>
                </div>
                <div className="canvasBox">
                    <div className="sta-box1 sta-temp">d</div>
                    <div className="sta-box2 sta-temp">d</div>
                </div>
                <Drop></Drop>
            </main >
        )
    }
};