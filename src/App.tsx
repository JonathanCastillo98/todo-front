import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import store from './redux/store';
import { Provider } from 'react-redux';
import AuthGuard from './guards/auth.guard';
import Private from './pages/Private/Private';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/private"} />} />
          <Route path={"/login"} element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path={`/private/*`} element={<Private />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
