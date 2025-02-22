import NavChild from '@/components/common/link/NavChild';
import owner from '@/components/owner/Owner.module.scss';
import Accordion from '@/components/common/accordion/Accordion';
import MyPageLink from '@/components/common/link/MyPageLink';
import { useParams } from 'react-router-dom';

const OwnerSidebar = () => {
  const { ownerId } = useParams<{ ownerId: string }>();

  return (
    <aside className={owner['sidebar']}>
      <h1 className="blind">오너 사이드바</h1>
      <MyPageLink>마이페이지(오너)</MyPageLink>
      <Accordion title="헬스장">
        <ul>
          <NavChild to={`/owner/${ownerId}/gym`} content="헬스장 현황" />
        </ul>
      </Accordion>
      <Accordion title="스태프">
        <ul>
          <NavChild to={`/owner/${ownerId}/staff`} content="스태프 현황" />
        </ul>
      </Accordion>
      <Accordion title="멤버">
        <ul>
          <NavChild to={`/owner/${ownerId}/member`} content="멤버 현황" />
          <NavChild to={`/owner/${ownerId}/member/edit`} content="멤버 관리" />
        </ul>
      </Accordion>
    </aside>
  );
};

export default OwnerSidebar;
