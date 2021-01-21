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

    this.handleBPMChange = this.handleBPMChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handlePrecisionChange = this.handlePrecisionChange.bind(this);
    this.handleNumeratorChange = this.handleNumeratorChange.bind(this);
    this.handleDenominatorChange = this.handleDenominatorChange.bind(this);

    this.state = {
      bpm : "140", 
      note : {name : "Whole Note", dec : 4}, 
      prec : {name : "Seconds", dec : 1},
      numerator : "4",
      denominator: "4"
    };
  }

  handleBPMChange(bpmVal) {
    const oldNote = this.state.note;
    const oldPrec = this.state.prec;
    const num = this.state.numerator;
    const den = this.state.denominator;
    this.setState({
      bpm : bpmVal, 
      note : oldNote, 
      prec : oldPrec,
      numerator : num,
      denominator : den
    });
  }

  handleNoteChange(noteVal) {
    const oldBPM = this.state.bpm;
    const oldPrec = this.state.prec;
    const num = this.state.numerator;
    const den = this.state.denominator;
    this.setState({
      bpm : oldBPM, 
      note : noteVal, 
      prec : oldPrec,
      numerator : num,
      denominator : den
    });
  }

  handlePrecisionChange(precVal) {
    const oldBPM = this.state.bpm;
    const oldNote = this.state.note;
    const num = this.state.numerator;
    const den = this.state.denominator;
    this.setState({
      bpm : oldBPM, 
      note : oldNote, 
      prec : precVal,
      numerator : num,
      denominator : den
    });
  }

  handleNumeratorChange(numVal) {
    const oldBPM = this.state.bpm;
    const oldNote = this.state.note;
    const oldPrec = this.state.prec;
    const den = this.state.denominator;
    this.setState({
      bpm : oldBPM, 
      note : oldNote, 
      prec : oldPrec,
      numerator : numVal,
      denominator : den    
    });
  }

  handleDenominatorChange(denVal) {
    const oldBPM = this.state.bpm;
    const oldNote = this.state.note;
    const oldPrec = this.state.prec;
    const num = this.state.denominator;
    this.setState({
      bpm : oldBPM, 
      note : oldNote, 
      prec : oldPrec,
      numerator : num,
      denominator : denVal    
    });
  }

  calculation() {
    const bpm = parseFloat(this.state.bpm);
    const note = this.props.fm ? (4 * this.state.numerator / this.state.denominator) : this.state.note.dec;
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
          <h3>Delay Calculator</h3>
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
          <h3>Delay Calculator</h3>
          <NumberInput val={this.state.numerator} onChange={this.handleNumeratorChange} inputName="Number Of Beats"/>
          <NumberInput val={this.state.denominator} onChange={this.handleDenominatorChange} inputName="Number Of Beats"/>
          <NumberInput val={this.state.bpm} onChange={this.handleBPMChange} inputName="Beats Per Minute"/>
          <ValueSelector currentValue={this.state.prec} onChange={this.handlePrecisionChange} pairs={this.precs} selectorName="Precision"/>
          <div className="calcInput col-sm-6 calcOutput container">{display}</div>
        </div>
      );
    }
  }
}

export default Calculator;