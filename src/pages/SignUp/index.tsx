import { Navigate, Route, Routes } from 'react-router-dom';
import MemberSection from '@/components/signup/MemberSection';
import OwnerSection from '@/components/signup/OwnerSection';
import NavSection from '@/components/signup/NavSection';
import { useState } from 'react';
import { Address } from 'react-daum-postcode';
import PostModal from '@/components/signup/PostModal';
import { MemberData, OwnerData } from '@/types/userData';
import { useUser } from '@/hooks/useUser';

export interface FormProps {
  sendSignUpData: (data: MemberData | OwnerData) => void;
  openPostModal: () => void;
  roadAddress: string;
}

const SignUp = () => {
  const [roadAddress, setRoadAddress] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const sendSignUpData = async (data: MemberData | OwnerData) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoadAddress = (address: Address) => {
    setRoadAddress(() => address.roadAddress);
    closePostModal();
  };

  const openPostModal = () => {
    setShowPostModal(() => true);
  };

  const closePostModal = () => {
    console.log('test');
    setShowPostModal(() => false);
  };

  return (
    <>
      <NavSection />
      <Routes>
        <Route path="/" element={<Navigate to="/signup/member" replace />} />
        <Route
          path="/member"
          element={
            <MemberSection openPostModal={openPostModal} roadAddress={roadAddress} sendSignUpData={sendSignUpData} />
          }
        />
        <Route
          path="/owner"
          element={
            <OwnerSection openPostModal={openPostModal} roadAddress={roadAddress} sendSignUpData={sendSignUpData} />
          }
        />
      </Routes>
      {showPostModal ? <PostModal onClose={closePostModal} onComplete={handleRoadAddress} /> : null}
    </>
  );
};

export default SignUp;