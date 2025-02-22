import { FcGoogle } from 'react-icons/fc';
import signin from '@/components/signIn/SignIn.module.scss';
import SignInForm from '@/components/signIn/SignInForm';
import { envConfig } from '@/configs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { handleToastError } from '@/utils/handleToast';
import { RoleType } from '@/types/fittaApi';
import { useUser } from '@/hooks/useAPI';

const { REACT_APP_SERVER_URL } = envConfig();

const SignInFormSection = () => {
  const [searchParams] = useSearchParams();
  const { myData, refetchMyData } = useUser();
  const navigate = useNavigate();

  const handleSignIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      // const role: RoleType = isOwner ? 'OWNER' : 'MEMBER';
      const response = await axios.post('/signin', { email, password });
      console.log('res  >>>>', response);
      if (response.status >= 200 && response.status < 300) {
        refetchMyData();
        navigate('/');
      }
    } catch (error) {
      handleToastError(error);
    }
  };

  const getSignUpUrl = async () => {
    try {
      const response = await axios.get<{ url: string }>('/auth/sign');
      const {
        data: { url },
      } = response;
      console.log(url);
      window.location.href = url;
    } catch (error) {
      handleToastError(error);
    }
  };

  //localhost:3000/signin 로그인주소
  //accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=1066949619421-eaklsqedvp59pe0oba00a5h2qkiifhrk.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignin&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile

  const sendCode = async (code: string) => {
    try {
      console.log('CODE >>>>', code);
      const response = await axios.get<{ url: string }>(
        `/login/oauth2/code/google?code=${encodeURIComponent(
          code,
        )}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignin`,
      );
      const { data } = response;
      console.log('DATA >>>>', data);
    } catch (error) {
      handleToastError(error);
    }
  };

  useEffect(() => {
    const code = searchParams.get('code');
    console.log(code);
    if (code === undefined || code === null) return;
    sendCode(code);
  }, [searchParams]);

  return (
    <section className={signin['formSection']}>
      <h1>Sign In</h1>
      <div>
        <SignInForm handleSignIn={handleSignIn} />
        <div>
          <button onClick={getSignUpUrl} className={signin['googleSignUpButton']}>
            <span>
              <FcGoogle size={'2rem'} />
            </span>
            구글 이메일로 시작하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignInFormSection;
