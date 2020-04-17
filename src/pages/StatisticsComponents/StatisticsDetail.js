import React from 'react';
import Drop from '../Components/Drop';
import Canvas from './Canvas';


export default class extends React.Component {
    render() {
        return (
            <main className="temp">
                <Canvas></Canvas>
                <div className="temp__toStatistics">
                    <a href="/" className="statistics__link">
                        홈으로
                    </a>
                </div>
                <Drop></Drop>
            </main >
        )
    }
};