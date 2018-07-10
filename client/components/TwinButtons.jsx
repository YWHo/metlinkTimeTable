import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.btnId1 = props.btnId1
    this.btnId2 = props.btnId2
    this.labelBtn1 = props.labelBtn1
    this.labelBtn2 = props.labelBtn2
    this.callback = props.callback
    this.isBtn1Active = props.isBtn1Active
  }

  setBtn1Active(isBtn1Active) {
    if (this.isBtn1Active == isBtn1Active) return
    this.isBtn1Active = isBtn1Active

    if (isBtn1Active) {
      this.refs[this.btnId1].classList.add("btn-selected")
      this.refs[this.btnId2].classList.remove("btn-selected")
    } else {
      this.refs[this.btnId1].classList.remove("btn-selected")
      this.refs[this.btnId2].classList.add("btn-selected")
    }

    this.callback(isBtn1Active)
  }

  render() {
    return (
      <div className="btn-twin">
        <button ref={this.btnId1} className="btn-twin-button btn-selected" onClick={
          ()=>this.setBtn1Active(true)
        }>{this.labelBtn1}</button>
        <button ref={this.btnId2} className="btn-twin-button" onClick={
          ()=> this.setBtn1Active(false)
        }>{this.labelBtn2}</button>
      </div>
    )
   
  }
}


