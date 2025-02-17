import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Signin from './pages/Signin';
import DashboardAluno from './pages/DashboardAluno'; // Importando o DashboardAluno

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route
            path='/account'
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          <Route path='/dashboardAluno' element={<DashboardAluno />} /> {/* Rota para DashboardAluno */}
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
