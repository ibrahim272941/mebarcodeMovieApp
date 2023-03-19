import './App.css';
import AppRouter from './router/AppRouter';
import AuthContexProvider from './context/AuthContext';
import MovieContextProvider from './context/MovieContext';
import CastContextProvider from './context/CastContext';

function App() {
  return (
    <AuthContexProvider>
      <MovieContextProvider>
        <CastContextProvider>
          <AppRouter />
        </CastContextProvider>
      </MovieContextProvider>
    </AuthContexProvider>
  );
}

export default App;
