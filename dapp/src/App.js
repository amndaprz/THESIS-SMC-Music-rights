import Login from './Login';
import Test from './Test';
import Register from './Register';
import Client from './Client';
import Artist from './Artist';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

document.body.style.background = "#232226";
function App() {
  return (
    <div className>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route path="/Test"element={<Test />}/>
          <Route path="/Register"element={<Register />}/>
          <Route path="/Client"element={<Client />}/>
          <Route path="/Artist"element={<Artist />}/>
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
