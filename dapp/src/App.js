import Test from './pages/Test';
import Home from './pages/Home';
import Client from './pages/Client';
import Artist from './pages/Artist';
import Label from './pages/Label';
import Dev from './pages/Dev';
import Stream from './pages/Stream';
import ModalTest from './pages/ModalTest';
import NotifTest from './pages/NotifTest';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css"
import "./css/Homepage.css"
import "./css/Login.css"
import "./css/Notif.css"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

document.body.style.background = "#232226";
function App() {
  var role = "client";
  return (
    <div className>
      <BrowserRouter>
        <Routes>
          <Route exact path="/"element={<Home />}/>
          <Route exact path="/Client"element={<Client />}/>
          <Route path="/Artist"element={<Artist />}/>
          <Route path="/Label"element={<Label />}/>
          <Route path="/Test"element={<Test />}/>
          <Route path="/Dev"element={<Dev />}/>
          <Route path="/Stream"element={<Stream />}/>
          <Route path="/ModalTest"element={<ModalTest />}/>
          <Route path="/NotifTest"element={<NotifTest />}/>
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
