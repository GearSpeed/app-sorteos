import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Outlet />          {/* ← aquí se pintan las rutas hijas */}
    </main>
  );
}

export default App;