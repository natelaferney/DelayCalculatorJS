import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return <div>
      <div className="jumbotron text-center">
        <h1>Delay Calculator</h1>
        <h2>A ReactJS Project</h2>
      </div>
      <div>
        <Calculator />
      </div>
  
      </div>
  ;
}

class ValueSelector extends React.Component {
  //new props:
  //currentValue {name: x, val: y}
  //pairs {name: x, val: y}
  //selectorName
  //onChange
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const val = event.target.value;
    const newVal = this.props.pairs.find(function(x) {
      return x.name === val;
    });
    this.props.onChange(newVal);
  }

  render() {
    const options = this.props.pairs.map((x, i) => {
      return <option value={x.name}>{x.name}</option>;
    });
    return <div className="calcInput row">
        <label className="control-label col-sm">{this.props.selectorName}</label>
        <select onChange={this.handleChange} className="valueSelect col-sm">
        {options}
        </select>
    </div>
  }
}

class BPMInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onBPMChange(event.target.value);
  }

  render() {
    const bpm = this.props.bpm;
    return <div className="calcInput row">
      <label className="control-label col-sm">Beats Per Minute</label>
      <input type="number" id="bpmInput" min="1" size="4" value={bpm} onChange={this.handleChange} className="col-sm"></input>
    </div>;
  }
}

class Calculator extends React.Component {

  constructor(props) {
    super(props);

    const noteNames = ["Whole Note", "Half Note", "Quarter Note", "Eigth Note", "Sixteenth Note",
      "Dotted Half Note", "Dotted Quarter Note", "Dotted Eigth Note", "Dotted Sixteenth Note"];
    const noteValues = [4, 2, 1, 1/2, 1/4, 3, 1.5, 3/4, 3/8];
    this.notes = noteNames.map((x, i) => {
      return {name : x, dec : noteValues[i]}; 
    });

    const precNames = ["Seconds", "Milliseconds"];
    const precValues = [1, 1e3];
    this.precs = precNames.map((x, i) => {
      return {name : x, dec : precValues[i]}; 
    });

    this.handleBPMChange = this.handleBPMChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handlePrecisionChange = this.handlePrecisionChange.bind(this);

    this.state = {
      bpm : "140", 
      note : {name : "Whole Note", dec : 4}, 
      prec : {name : "Seconds", dec : 1}
    };
  }

  handleBPMChange(bpmVal) {
    const oldNote = this.state.note;
    const oldPrec = this.state.prec;
    this.setState({bpm : bpmVal, note : oldNote, prec : oldPrec});
  }

  handleNoteChange(noteVal) {
    const oldBPM = this.state.bpm;
    const oldPrec = this.state.prec;
    this.setState({bpm : oldBPM, note : noteVal, prec : oldPrec});
  }

  handlePrecisionChange(precVal) {
    const oldBPM = this.state.bpm;
    const oldNote = this.state.note;
    this.setState({bpm : oldBPM, note : oldNote, prec : precVal});
  }

  calculation() {
    const bpm = parseFloat(this.state.bpm);
    const note = this.state.note.dec;
    const prec = this.state.prec.dec;
    const ret = 60 * prec * note / bpm;
    if (prec === 1) return ret.toFixed(3);
    else return ret.toFixed(0);
  }

  render() {
    return <div className="Calculator container-fluid col-sm-3">
    <h3>Delay Calculator</h3>
    <ValueSelector currentValue={this.state.note} onChange={this.handleNoteChange} pairs={this.notes} selectorName="Delay Time"/>
    <BPMInput bpm={this.state.bpm} onBPMChange={this.handleBPMChange} />
    <ValueSelector currentValue={this.state.prec} onChange={this.handlePrecisionChange} pairs={this.precs} selectorName="Precision"/>
    <div className="calcInput col-sm-6 calcOutput container">{this.calculation()} {this.state.prec.name}</div>
    </div>
  }
}

export default App;
