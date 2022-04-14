import { useState } from 'react'
import './App.css'
import { RestaurantDetails } from './components/RestaurantDetails/RestaurantDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
    <RestaurantDetails/>
    </div>
  )
}

export default App
