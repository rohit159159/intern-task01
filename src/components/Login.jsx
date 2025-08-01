
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Intern Portal Login</h1>
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
    </div>
  );
}