import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Visualisation from "./Visualisation";
import PathPage from "./screens/PathPage";
import StartPage from "./screens/StartPage";
import AlgoMain from "./screens/Algomain";
export default function App() {
  
  return (
    
    <div className='App'> 
    <Routes>
      <Route path="/vis" element={<Visualisation/>} />
      <Route path="/">
      <Route index element={<Home/>}/>
      <Route path="path" element={<PathPage/>} />
      <Route path="jarvis">
        <Route index element={<AlgoMain key={1} heading="Jarvis March Algorithm"/>} />
      </Route>
      <Route path="kirkpatrick">
      <Route index element={<AlgoMain key={2} heading="Kirkpatrick Seidel Algorithm"/>} />
      </Route>
      </Route>
     
    </Routes>

   
    </div>
    
  )
}
