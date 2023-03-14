import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import DemoUseEffect from './hook/DemoUseEffect'
import DemoCallApi from './democallapi/DemoCallApi'

import NotFound from './not-found/NotFound'
// import './App.css'
import UserList from './user/UserList'
import UserDetail from './user/UserDetail'
import UserCreate from './user/UserCreate'
import Login from './login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="/userlist">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/userlist/demoeffect">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/userlist/callapi">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/userlist/create">Link</a>
        </li>
      </ul>
      <Routes>
      <Route path='login' element={<Login />}></Route>
        <Route path="/userlist">
          <Route index element={<UserList />} />
          <Route path="demoeffect" element={<DemoUseEffect />} />
          <Route path="callapi" element={<DemoCallApi />} />
          <Route path=":userId" element={<UserDetail />} />
          <Route path="create" element={<UserCreate />} />

          
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default App
