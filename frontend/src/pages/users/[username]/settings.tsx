import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';
import UserSettingsCard from 'src/components/cards/UserSettingsCard';
import ExternalAuthCard from 'src/components/cards/ExternalAuthCard';
import SettingsHead from 'src/components/heads/SettingsHead';
import { Col } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Page } from 'src/styles';

function Settings() {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const targetUsername = router.query.username;

  return (
    <>
      <SettingsHead />
      <Header />
      <Page.Main>
        <Col justifyContent='center' alignItems='center'>
          {targetUsername === user.username ? (
            <>
              <UserSettingsCard />
              <ExternalAuthCard />
            </>
          ) : (
            <p>퍼미션 디나이드</p>
          )}
        </Col>
      </Page.Main>
    </>
  );
}

export default Settings;
