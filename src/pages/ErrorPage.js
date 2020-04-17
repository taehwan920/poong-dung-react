import React from 'react';
import Background from './Components/Background';
import Footer from './Components/Footer';
import Drop from './Components/Drop';

export default class extends React.Component {
    render() {
        return (
            <center className="home">
                <div className="temp">
                    <span className="error-message">수온 데이터를 불러올 수 없습니다.</span>
                </div>
                <Background></Background>
                <Footer></Footer>
                <Drop></Drop>
            </center>
        )
    }
};