import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import AnalysisPage from './pages/AnalysisPage'
import SavedScenariosPage from './pages/SavedScenariosPage'
import ResourcesPage from './pages/ResourcesPage'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/analysis" element={<AnalysisPage/>}></Route>
      <Route path="/scenarios" element={<SavedScenariosPage/>}></Route>
      <Route path="/resources" element={<ResourcesPage/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
