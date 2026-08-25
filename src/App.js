import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "../src/assets/styles/style.css";
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter basename="/tyreshop">
      <AppRoutes />
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;