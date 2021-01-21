import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MainComponent from './components/MainComponent'

function App() {
  return <div>
      <div className="jumbotron text-center">
        <h1>Delay Calculator</h1>
        <h2>A ReactJS Project</h2>
      </div>
      <MainComponent />
  </div>
  ;
}

export default App;
