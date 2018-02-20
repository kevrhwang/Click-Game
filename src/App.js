import React, { Component } from 'react';
// import logo from './logo.svg';
import CharacterCard from "./components/characterCard/CharacterCard";
import Wrapper from "./components/Wrapper";
import characters from "./characters.json";
import './App.css';

class App extends Component {

  state = {
    characters,
    score: 0,
    topScore: 0,
    message: "Click an image to begin!"
  }

  characterClick = id => {
    //get index of clicked item
    const index = characters.findIndex(item => item.id === id)

    //check if character has been clicked
    if (characters[index].clicked === true) {
      this.setState({
        score: 0,
        message: "You guessed incorrectly!"
      });

      //reset clicks to false
      characters.map(character => character.clicked = false);
    } else {
      characters[index].clicked = true;
      this.setState({
        score: this.state.score + 1,
        message: "You chose correctly!"
      })
    }

    //shuffles characters array
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    } 
    this.setState({
      characters: characters
    })


  }

  componentDidUpdate() {
      //set top score counter
      if (this.state.score > this.state.topScore) {
        this.setState({
          topScore: this.state.score
        })
      }
    }

  





  render() {

      return (

      <div>

      
      
      <nav className="navbar navbar-default">
      <div className="row">
        <div className="container-fluid">
          <div className="navbar-header col-md-4">
            <a className="navbar-brand">Clicky Game</a>
          </div>

          <div className="navbar-header col-md-4">
            <a className="navbar-brand">{this.state.message}</a>
          </div>

          <div className="navbar-header col-md-4">
            <a className="navbar-brand">Score: {this.state.score} | Top Score: {this.state.topScore}</a>
          </div>

        </div>
      </div>
      </nav>

      <div className="jumbotron">
        <h1>Clicky Game!</h1>
        <h5>Click on an image to earn points, but don't click on any more than once!</h5>
      </div>

      

        <Wrapper>
        { 
          this.state.characters.map(character => (
            <CharacterCard 
              name={character.name}
              image={character.image}
              id={character.id}
              key={character.id}
              characterClick={this.characterClick}
            />
            ))
        }

        </Wrapper>

        </div>
      );
    };
}

export default App;
