import './App.css';
import AppRouter from './router/AppRouter';
import AuthContexProvider from './context/AuthContext';

function App() {
  return (
    <AuthContexProvider>
      <AppRouter />
    </AuthContexProvider>
  );
}

export default App;
