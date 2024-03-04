import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import {LoginPage, VerifyOTP, RegistrationPage} from './pages/index'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='register' element={<RegistrationPage />} />
      <Route path='login' element={<LoginPage/>} />
      {/* <Route path='chats' element={<ChatPage />} /> */}
      <Route path='verify' element={<VerifyOTP />} />
      <Route path='/' element={<Navigate to='register' />}/>
    </Route>

  )
)

function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />  
    </div>
  );
}

export default App;
