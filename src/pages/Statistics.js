import React from 'react';
import Background from './Components/Background';
import Footer from './Components/Footer';
import Daily from './StatisticsComponents/Daily';

export default class extends React.Component {
    render() {
        return (
            <main className="App">
                <Daily></Daily>
                <Background></Background>
                <Footer></Footer>
            </main>
        )
    }
};