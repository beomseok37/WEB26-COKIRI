import Head from 'next/head';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import Header from 'src/components/Header';
import UserInfoCard from 'src/components/cards/UserInfoCard';
import Timeline from 'src/components/Timeline';
import FloatingButton from 'src/components/buttons/FloatingButton';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { Col } from 'src/components/Grid';

import { UserType } from 'src/types';

import { Fetcher } from 'src/utils';

import { USERS_DESCRIPTION } from 'src/globals/descriptions';

import { Page } from 'src/styles';

import postsAtom from 'src/recoil/posts';

interface Props {
  targetUser: UserType;
}

function User({ targetUser }: Props) {
  const setPosts = useSetRecoilState(postsAtom);

  const isUserExist = Object.keys(targetUser).length !== 0;
  const { isFetched } = useQuery(
    ['user', 'posts', targetUser._id],
    () => Fetcher.getUserPosts(targetUser),
    {
      onSuccess: (posts) => {
        setPosts(posts);
      },
    },
  );
  return (
    <>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={USERS_DESCRIPTION} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Page.Main>
        <LoadingIndicator />
        <Col alignItems='center'>
          {isUserExist ? (
            <>
              <UserInfoCard targetUser={targetUser} />
              {isFetched && <Timeline />}
            </>
          ) : (
            <>없다!</>
          )}
        </Col>
      </Page.Main>
      <FloatingButton />
      <footer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { username } = context.query;
  const token = context.req?.cookies.jwt;
  if (token === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const targetUser = await Fetcher.getUsersByUsername(token, username);
  return {
    props: { targetUser },
  };
}

export default User;
