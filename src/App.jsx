import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import CalculatorPage from './pages/CalculatorPage'
import AnalysisPage from './pages/AnalysisPage'
import ResourcesPage from './pages/ResourcesPage'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/calculator" element={<CalculatorPage/>}></Route>
      <Route path="/analysis" element={<AnalysisPage/>}></Route>
      <Route path="/resources" element={<ResourcesPage/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
