import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Header from 'src/components/Header';

import descriptions from 'src/utils/descriptions';

function User() {
  const router = useRouter();
  const { userID } = router.query;

  return (
    <div>
      <Head>
        <title>COCOO</title>
        <meta name='description' content={descriptions.users} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main>
        User {userID}
        <br />
        밑에 클릭하면 이동
        <br />
        <Link href='/dashboard'>dashboard</Link>
        <br />
        <Link href='/setting'>setting</Link>
      </main>

      <footer />
    </div>
  );
}

export default User;
