import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';
import NavigationBar from './Navigation'
import DialogPanel from './DialogPanel'

function App() {
  return (
    <div className="App d-flex flex-column">
        <div className="p-2">
          <NavigationBar />
        </div>
        <div className="p-2 flex-grow-1">
          <DialogPanel />
        </div>
    </div>
  );
}

export default App;
