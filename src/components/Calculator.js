import React from 'react';
import ValueSelector from './ValueSelector';
import NumberInput from './NumberInput'

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

    this.handleBPMChange = (function(bpmVal) {this.setState({...this.state, bpm : bpmVal});}).bind(this);
    this.handleNoteChange = (function(noteVal) {this.setState({...this.state, note : noteVal});}).bind(this);
    this.handlePrecisionChange = (function(precVal) {this.setState({...this.state, prec : precVal});}).bind(this);
    this.handleBeatNumberChange = (function(numVal) {this.setState({...this.state, numberOfBeats : numVal});}).bind(this);

    this.state = {
      bpm : "140", 
      note : {name : "Whole Note", dec : 4}, 
      prec : {name : "Seconds", dec : 1},
      numberOfBeats : "4",
    };
  }

  calculation() {
    const bpm = parseFloat(this.state.bpm);
    const note = this.props.fm ? (parseFloat(this.state.numberOfBeats)) : this.state.note.dec;
    const prec = this.state.prec.dec;
    if(bpm) {
      const ret = 60 * prec * note / bpm;
      if (prec === 1) return ret.toFixed(3);
      else return ret.toFixed(0);
    }
    else {
      return null;
    }
  }

  render() {
    const display = this.state.bpm ? [this.calculation(), this.state.prec.name].join(' ') : 'Enter Beats Per Minute';
    if (!this.props.fm) {
      return (
        <div>
          <h3>Standard Calculator</h3>
          <ValueSelector currentValue={this.state.note} onChange={this.handleNoteChange} pairs={this.notes} selectorName="Delay Time"/>
          <NumberInput val={this.state.bpm} onChange={this.handleBPMChange} inputName="Beats Per Minute"/>
          <ValueSelector currentValue={this.state.prec} onChange={this.handlePrecisionChange} pairs={this.precs} selectorName="Precision"/>
          <div className="calcInput col-sm-6 calcOutput container">{display}</div>
        </div>
      );
    }
    else {
      return (
        <div>
          <h3>Custom Calculator</h3>
          <NumberInput val={this.state.numberOfBeats} onChange={this.handleBeatNumberChange} inputName="Number Of Beats"/>
          <NumberInput val={this.state.bpm} onChange={this.handleBPMChange} inputName="Beats Per Minute"/>
          <ValueSelector currentValue={this.state.prec} onChange={this.handlePrecisionChange} pairs={this.precs} selectorName="Precision"/>
          <div className="calcInput col-sm-6 calcOutput container">{display}</div>
        </div>
      );
    }
  }
}

export default Calculator;