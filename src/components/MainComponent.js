import React from 'react';
import Calculator from './Calculator'

function ButtonRenderer(props) {
  if (props.frac) {
    return (
      <div className="row inline-row" id="viewButtons">
        <button type="button" className="btn btn-primary col-sm" id="standardButton" onClick={props.handleClick}>Standard</button>
        <button type="button" className="btn btn-primary col-sm" disabled id="fractionalButton">Fractional</button>
      </div>
    );
  }
  else {
    return (
      <div className="row inline-row" id="viewButtons">
        <button type="button" className="btn btn-primary col-sm" disabled id="standardButton">Standard</button>
        <button type="button" className="btn btn-primary col-sm" id="fractionalButton" onClick={props.handleClick}>Fractional</button>
      </div>
    );
  }
}

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {fracMode : false};
  }

  handleButtonClick() {
    const fm = this.state.fracMode;
    this.setState({fracMode : !fm});
  }

  render() {
    return (
      <div>
        <div className="container col-sm-3" id="viewChanger">
          <ButtonRenderer frac={this.state.fracMode} handleClick={this.handleButtonClick} />
        </div>
        <div className="Calculator container-fluid col-sm-3">
          <Calculator fm={this.state.fracMode} />
        </div>
      </div>
    );
  }
}

export default MainComponent;