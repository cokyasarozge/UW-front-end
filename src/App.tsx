import React from 'react';

import './App.css';
import ClaimsContainer from './components/Practice/ClaimsContainer';
// import Form from './components/UW/Form';
// import ExistingClaims from './components/UW/ExistingClaims';
// import TodoApp from './components/NewToDo/TodoApp';
// import Hangman from './components/Hangman';


function AppComponent() {


  console.log('render app')
  return (
    <div className="App">
      <div className="App-container">
        <ClaimsContainer />
        {/* <Form />
        <ExistingClaims/>
        <TodoApp />
        <Hangman /> */}
      </div>
    </div>
  );
}


const App = React.memo(AppComponent);

export default App;