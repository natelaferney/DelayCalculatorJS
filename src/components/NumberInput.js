import React from 'react';

class NumberInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = (function (event) {this.props.onChange(event.target.value);}).bind(this);
  }

  render() {
    return <div className="calcInput row">
      <label className="control-label col-sm">{this.props.inputName}</label>
      <input type="number" min="1" step="0.01" value={this.props.val} onChange={this.handleChange} className="col-sm numberInput"></input>
    </div>;
  }
}

export default NumberInput;