import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('@/pages/Home'));
const SignInPage = loadable(() => import('@/pages/SignIn'));
const SignUpPage = loadable(() => import('@/pages/SignUp'));
const AdminPage = loadable(() => import('@/pages/Admin'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup/*" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default App;