import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<any>;
  isLoading: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      await onLogin(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page-container flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="card shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <h1 className="text-2xl font-bold text-primary-700">CRM</h1>
            </div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Welcome Back</h2>
            <p className="text-secondary-600">Sign in to your CRM account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg animate-slide-down">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-secondary-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-secondary-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3 text-base font-semibold"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-secondary-200">
            <p className="text-sm text-secondary-600 text-center mb-4 font-medium">
              Demo Credentials:
            </p>
            <div className="space-y-3">
              <div className="bg-secondary-50 p-4 rounded-lg">
                <p className="font-semibold text-secondary-700 mb-2">Sales User:</p>
                <div className="space-y-1 text-sm">
                  <p className="text-secondary-600"><span className="font-medium">Email:</span> sales@example.com</p>
                  <p className="text-secondary-600"><span className="font-medium">Password:</span> password123</p>
                </div>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <p className="font-semibold text-secondary-700 mb-2">Manager User:</p>
                <div className="space-y-1 text-sm">
                  <p className="text-secondary-600"><span className="font-medium">Email:</span> manager@example.com</p>
                  <p className="text-secondary-600"><span className="font-medium">Password:</span> password123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
