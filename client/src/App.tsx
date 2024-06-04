import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';
import UserTable from './pages/user';


function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<UserTable />} />
      </Routes>
  );
}

export default App;
