import { Route, Routes, useMatch, useParams } from "react-router-dom";
import Home from "./screens/Home";
import Visualisation from "./screens/Visualisation";
import PathPage from "./screens/PathPage";
import StartPage from "./screens/StartPage";
import AlgoMain from "./screens/Algomain";
import { pointArray } from "./points";
import Kirkpatrick from "./screens/Kirkpatrick";
import Jarvis from "./screens/Jarvis";
export default function App() {
  return (
    
    <div className='App'> 
    <Routes>
      <Route path="kirkpatrickvis" element={<Visualisation key={0} id={0}/>} />
      <Route path="kirkpatrickvisu/:stepid" element={<Kirkpatrick />} />
      <Route index path="jarvisvis" element={<Visualisation key={1} id={1}/>} />
      <Route path="jarvisvisu/:stepid" element={<Jarvis/>} />
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
