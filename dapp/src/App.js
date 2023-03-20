import Test from './Test';
import Client from './Client';
import Artist from './Artist';
import Label from './Label';
import Dev from './Dev';
import ModalTest from './ModalTest';
import NotifTest from './NotifTest';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

document.body.style.background = "#232226";
function App() {
  return (
    <div className>
      <BrowserRouter>
        <Routes>
          <Route exact path="/"element={<Client />}/>
          <Route path="/Test"element={<Test />}/>
          <Route path="/Artist"element={<Artist />}/>
          <Route path="/Label"element={<Label />}/>
          <Route path="/Dev"element={<Dev />}/>
          <Route path="/ModalTest"element={<ModalTest />}/>
          <Route path="/NotifTest"element={<NotifTest />}/>
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
