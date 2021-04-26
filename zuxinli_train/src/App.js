import logo from './logo.svg';
import help from './帮助.svg';
import edit from './编辑.svg';
import calen from './日历.svg';
import background from "./screenshot.png"
import './App.css';
import './bootstrap.min.css'
import React from 'react';

class Quit extends React.Component {

}

class TopIcon extends React.Component {
  render() {
    var selected = this.props.buttonClass=="BtnIcon"? false : true;
    var text = selected? "selected!" : "";
    return (
      <button className="col-md-2 col-sm-6">
        <img className={this.props.buttonClass} src={this.props.src} alt = "no img!"></img>
        <h5>{text}</h5>
      </button>
    );
  }
}


class Status extends React.Component {

  findClass(i){
    if(i == this.props.stepNumber % 6) {
      return "App-logo";
    } else {
      return "BtnIcon";
    }
  }

    render() 
    {
      return <div className="Toolbar">
        <button className="BtnIcon" onClick={()=> this.props.onClick()}> </button>
        <div className="Navigator">
          <div className="container-fluid">
            <div className="row">
            <TopIcon buttonClass={this.findClass(0)} src={logo} ></TopIcon> 
            <TopIcon buttonClass={this.findClass(1)} src={help} ></TopIcon> 
            <TopIcon buttonClass={this.findClass(2)} src={calen}></TopIcon>
            <TopIcon buttonClass={this.findClass(3)} src={logo} ></TopIcon> 
            <TopIcon buttonClass={this.findClass(4)} src={help} ></TopIcon> 
            <TopIcon buttonClass={this.findClass(5)} src={logo} ></TopIcon> 
            </div>
          </div>
        </div>
      </div>
    }
};

class UserName extends React.Component {
  render() {
    return (
      <h4 className={this.props.usr}>{this.props.nameText}</h4>
    )
  }
}

class AnswerBox extends React.Component {

  render() {
    var newNameText = "🐂🍺";
    var i;
    for(i=0; i <this.props.stepNumber; ++i) {
      newNameText = "💉💧" + newNameText;
    }
    if(this.props.usr != "Username") {
      newNameText = "🌶是" + newNameText + "!";
    } else {
      newNameText = newNameText + "?";
    }
    return <h3 className="TextBox">{newNameText}</h3>
  }
}

class Maintheme extends React.Component {

  render()
  {
    const usr = this.props.IsUsr? "Username" : "ServerName"; 
    const nameText = this.props.nameText;
    console.log(usr, nameText);
    return (
      <div className="Background" onClick={() =>this.props.onClick()}>
        <UserName nameText={nameText} usr={usr}></UserName>
        <AnswerBox usr={usr} stepNumber={this.props.stepNumber}></AnswerBox>
      </div>
    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 0,
      IsUsr:true,
      nameText:"用户名",
    }
  }
  handleClick() {
    console.log("Click! %b \n", this.state.IsUsr);
    var newNameText;
    if(this.state.IsUsr) {
      newNameText = "服务名";
    } else {
      newNameText = "用户名";
    }
    this.setState({
      stepNumber: (this.state.stepNumber+1),
      IsUsr:!this.state.IsUsr,
      nameText:newNameText,
    })
  }

  clearState() {
    this.setState({
      stepNumber: 0,
      IsUsr:true,
      nameText:"用户名",
    });
  }
  render() {
    return (
      <div>
        <Status stepNumber={this.state.stepNumber} onClick={() => this.clearState()}></Status>
        <Maintheme  onClick={() =>this.handleClick()} IsUsr={this.state.IsUsr} nameText={this.state.nameText} stepNumber={this.state.stepNumber}></Maintheme>
      </div>
    );
  }
}


export default App;
