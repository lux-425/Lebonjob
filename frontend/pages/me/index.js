import Layout from '../../components/layout/Layout';
import UpdateProfile from '../../components/user/UpdateProfile';

import { isUserAuthenticated } from '../../utils/isAuthenticated';

export default function UpdateProfilePage() {
  return (
    <Layout title={'My User Profile'}>
      <UpdateProfile />
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
