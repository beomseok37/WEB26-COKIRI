import Head from 'next/head';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

// import RecommendationCard from 'src/components/cards/RecommendationCard';
import Timeline from 'src/components/Timeline';
import Header from 'src/components/Header';
import SigninCard from 'src/components/cards/SigninCard';
import RegisterModal from 'src/components/modals/RegisterModal';
import FloatingButton from 'src/components/buttons/FloatingButton';
import { Col } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Page } from 'src/styles';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';
import descriptions from 'src/utils/descriptions';

interface Props {
  user: UserType;
}

function Home({ user }: Props) {
  const setUser = useSetRecoilState(userAtom);
  useEffect(() => setUser(user), [setUser, user]);

  const { data } = useQuery(['posts', user._id], () => Fetcher.getPosts(user));

  const isAuthenticated = Object.keys(user).length !== 0;
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={descriptions.home} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Page.Main>
        <Col>
          {!isAuthenticated && <SigninCard />}
          {/* {isAuthenticated && <RecommendationCard />} */}
          {isAuthenticated && <Timeline posts={data} />}
        </Col>
      </Page.Main>
      <FloatingButton />
      <RegisterModal />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const token = context.req?.cookies.jwt;
  if (token === undefined) {
    return { props: { user: {} } };
  }
  const user: UserType = await Fetcher.getUsersMe(token);
  return {
    props: { user: { ...user, token } },
  };
}

export default Home;
