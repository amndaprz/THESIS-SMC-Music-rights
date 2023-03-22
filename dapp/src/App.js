import Test from './pages/Test';
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
  console.log(role);

  return (
    <div className>
      <BrowserRouter>
        <Routes>
          
          {/*
          <Route exact path="/"element={<Client />}/>
          <Route path="/Test"element={<Test />}/>
          <Route path="/Artist"element={<Artist />}/>
          <Route path="/Label"element={<Label />}/>
          <Route path="/Dev"element={<Dev />}/>
          <Route path="/Stream"element={<Stream />}/>
          <Route path="/ModalTest"element={<ModalTest />}/>
          <Route path="/NotifTest"element={<NotifTest />}/>
          */}
          
          {role === "client" ? (
          <Route exact path="/"element={<Client />}/>
          ) : (
          console.log("not client") // or navigate somewhere
          )}

          {role === "artist" ? (
          <Route path="/Artist"element={<Artist />}/>
          ) : (
          console.log("not artist")
          )}  

          {role === "label" ? (
          <Route path="/Label"element={<Label />}/>
          ) : (
          console.log("not label")
          )}

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
