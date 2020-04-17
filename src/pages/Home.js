import React from 'react';
import Temperature from './HomeComponents/Temperature';
import Background from './Components/Background';
import Footer from './Components/Footer';

export default class extends React.Component {
    render() {
        return (
            <main className="home">
                <Temperature></Temperature>
                <Background></Background>
                <Footer></Footer>
            </main>
        );
    }
};
