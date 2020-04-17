import React from 'react';
import Background from './Components/Background';
import Footer from './Components/Footer';
import Daily from './StatisticsComponents/StatisticsDetail';

export default class extends React.Component {
    render() {
        return (
            <main className="home">
                <Daily></Daily>
                <Background></Background>
                <Footer></Footer>
            </main>
        )
    }
};