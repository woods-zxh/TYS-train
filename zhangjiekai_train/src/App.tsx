import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './Navigation'
import DialogPanel from './DialogPanel'

function App() {
  return (
    <div className="App">
        <NavigationBar />
        <DialogPanel />
    </div>
  );
}

export default App;
