import { Route, Routes } from 'react-router-dom'
import './scss/index.scss'
import { useAppSelector } from './hooks'
import { selectCount } from './redux/slices/counterSlice'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<div>sdasd</div>}></Route>
      </Routes>
    </>
  )
}

export default App
