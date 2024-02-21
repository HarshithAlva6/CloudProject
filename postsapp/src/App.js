import './App.css';
import React, { Component } from 'react';
import UsersList from './usersList';
import ImagesList from './ImagesList';

//function App() {
//  return (
//    <div className="App">
//      <UsersList />
//    </div>
//  );
//}
class App extends Component {

  render() {
    return (
        <div className="App">
          <UsersList />
          <ImagesList />
        </div>
    );
  }
}
export default App;

