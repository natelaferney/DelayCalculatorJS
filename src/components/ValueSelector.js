import React from 'react';

class ValueSelector extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = (function (event) {
      const val = event.target.value;
      const newVal = this.props.pairs.find(function(x) {
        return x.name === val;
      });
      this.props.onChange(newVal);
    }).bind(this);
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

export default ValueSelector;