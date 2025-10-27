import { Routes, Route } from 'react-router-dom';
import InvitationPage from './pages/InvitationPage';
import NotFound from './pages/NotFound';

/**
 * Aplicación principal de invitaciones virtuales Baraki
 */
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Página principal de invitación */}
        <Route path="/" element={<InvitationPage />} />
        <Route path="/invitation/:id" element={<InvitationPage />} />
        
        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
