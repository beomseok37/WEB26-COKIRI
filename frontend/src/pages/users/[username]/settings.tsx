import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import Header from 'src/components/Header';
import UserSettingsCard from 'src/components/cards/UserSettingsCard';
import ExternalAuthCard from 'src/components/cards/ExternalAuthCard';
import PermissionDeniedNotify from 'src/components/notify/PermissionDeniedNotify';
import { Col } from 'src/components/Grid';

import { SETTING_DESCRIPTION } from 'src/globals/descriptions';
import { FAVICON } from 'src/globals/images';

import userAtom from 'src/recoil/user';

import { Page } from 'src/styles';

function Settings() {
  const router = useRouter();
  const targetUsername = router.query.username;
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={SETTING_DESCRIPTION} />
        <link rel='icon' href={FAVICON} />
      </Head>

      <Header />
      <Page.Main>
        <Col justifyContent='center' alignItems='center'>
          {targetUsername === user.username ? (
            <>
              <UserSettingsCard />
              <ExternalAuthCard />
            </>
          ) : (
            <PermissionDeniedNotify />
          )}
        </Col>
      </Page.Main>
    </>
  );
}

export default Settings;
