import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state={
    sushis:[],
    firstSushiIndex: 0,
    eatenSushi:[],
    money: 100,
    addFundsValue: null
  }

  componentDidMount(){
    fetch(API)
    .then(res=>res.json())
    .then(sushis=>{
      this.setState({
        sushis: sushis
      })
    })
  }

  sliceSushi = ()=>{
    let sushis = this.state.sushis
    return (sushis.slice(this.state.firstSushiIndex, this.state.firstSushiIndex+4))
  }

  moreSushi=()=>{
    if(this.state.firstSushiIndex+4<this.state.sushis.length){
      let newIndex=this.state.firstSushiIndex+4
      this.setState({
        firstSushiIndex: newIndex
      })
    }else{let newIndex=0
      this.setState({
        firstSushiIndex: newIndex
      })}
    
  }

  eatSushi=(sushi)=>{
    let newEatenSushi = this.state.eatenSushi
    let moolah= this.state.money
    if(this.state.money>sushi.price){
    newEatenSushi.push(sushi)
    this.setState({
      eatenSushi: newEatenSushi,
      money: moolah-sushi.price
    }
    )
    }
  }

  onChangeForm=(input)=>{
    this.setState({
      addFundsValue: input
    })
  }
  onSubmitForm=(e)=>{
    let input = parseInt(this.state.addFundsValue,10)
    let funds = this.state.money
    e.preventDefault()
    if(isNaN(input)){
      console.log("invalid input")
    } else {
      this.setState({
        money: funds + input
      })
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.sliceSushi()} moreSushi={this.moreSushi} eatSushi={this.eatSushi} eatenSushi={this.state.eatenSushi}/>
        <Table money={this.state.money} eatenSushi={this.state.eatenSushi} onChangeForm={this.onChangeForm} onSubmitForm={this.onSubmitForm}/>
      </div>
    );
  }
}

export default App;