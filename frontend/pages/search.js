import Layout from '../components/layout/Layout';
import Search from '../components/layout/Search';

import axios from 'axios';

export default function SearchPage() {
  return (
    <Layout title={'Search a job'}>
      <Search />
    </Layout>
  );
}
