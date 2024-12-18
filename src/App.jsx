import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import AccordionItem from './components/TodoGroup/TodoGroup'
import TodoItem from './components/TodoItem/TodoItem'
import AppBar from './components/appBar/AppBar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppBar className="position-fixed mb-5"/>
      <div className="container mt-4 bg-light rounded-3 shadow">
        <div className="row">
          <Home />
          <AccordionItem />
        </div>
      </div>
      {/* <TodoItem /> */}
    </div>
  )
}

export default App
