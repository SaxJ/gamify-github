import React, { Component } from 'react';
import { Logo } from '../../molecules/Navigation/atoms/Logo';
import SignInGoogle from '../Auth/molecules/SignInGoogle';

class Landing extends Component {
  render() {
    return (
      <div className="landing container">
        <Logo />
        <h1>Gamify Github</h1>
        <p>Develop against others in your organisation!</p>
        <SignInGoogle className="signin" />
      </div>
    );
  }
}

export default Landing;
