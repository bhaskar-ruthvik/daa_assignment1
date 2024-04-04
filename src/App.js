import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Visualisation from "./screens/Visualisation";
import PathPage from "./screens/PathPage";
import AlgoMain from "./screens/Algomain";
import Kirkpatrick from "./screens/Kirkpatrick";
import Jarvis from "./screens/Jarvis";
import AlgDesc from "./screens/AlgDesc";
import SinglePointHull from "./components/SinglePointHull";
import SinglePoint from "./screens/SinglePoint";
export default function App() {
  return (
    
    <div className='App'> 
    <Routes>
      <Route path="kirkpatrickvis" element={<Visualisation key={0} id={0}/>} />
      <Route path="kirkpatrickvisu/:stepid" element={<Kirkpatrick />} />
      <Route index path="jarvisvis" element={<Visualisation key={1} id={1}/>} />
      <Route path="singlepoint" element={<SinglePoint key={0} id={0}/>} />
      <Route path="straightline" element={<SinglePoint key={1} id={1}/>} />
      <Route path="convexdef" element={<AlgoMain key={2} id={2} heading="What is a Convex Hull?" />} />
      <Route path="jarvisvisu/:stepid" element={<Jarvis/>} />
      <Route path="/">
      <Route index element={<Home/>}/>
      <Route path="path" element={<PathPage/>} />
      <Route path="jarvisdesc" element={<AlgDesc id={1} heading={"Jarvis March Algorithm"}/>}/>
      <Route path="kpsdesc" element={<AlgDesc id={0}  heading={"Kirkpatrick Seidel Algorithm"}/>}/>
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
