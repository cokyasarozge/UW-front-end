import React from 'react';
import './App.css';
import ClaimsContainer from './components/UW/ClaimsContainer';


function AppComponent() {
  console.log('render app')
  
  return (
    <div className="App">
      <div className="App-container">
        <ClaimsContainer />
      </div>
    </div>
  );
}


const App = React.memo(AppComponent);

export default App;