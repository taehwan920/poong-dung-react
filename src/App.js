import React from 'react';
import Temperature from './Temperature';

function App() {
  return (
    <main className="App">
      <div className="App__bg"></div>
      <Temperature></Temperature>
      <footer className="App__foot">
        <a target="blank" href="https://github.com/taehwan920">
          <i className="fab fa-github"></i>
        </a>
      </footer>
    </main>
  );
}

export default App;
