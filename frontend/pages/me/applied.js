import axios from 'axios';

import Layout from '../../components/layout/Layout';
import AppliedJobs from '../../components/job/AppliedJobs';

import { isUserAuthenticated } from '../../utils/isAuthenticated';

export default function AppliedJobsPage({ jobs }) {
  return (
    <Layout title={'Applied Jobs'}>
      <AppliedJobs jobs={jobs} />
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

  const res = await axios.get(`${process.env.API_URL}/api/me/jobs/applied/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const jobs = res.data;

  return {
    props: {
      jobs,
    },
  };
}
