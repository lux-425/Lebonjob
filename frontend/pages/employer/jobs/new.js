import Layout from '../../../components/layout/Layout';
import NewJob from '../../../components/job/NewJob';

import { isUserAuthenticated } from '../../../utils/isAuthenticated';

export default function NewJobPage({ access_token }) {
  return (
    <Layout title={'Post a new job'}>
      <NewJob access_token={access_token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access;

  const user = await isUserAuthenticated(access_token);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      access_token,
    },
  };
}
