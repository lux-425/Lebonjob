import axios from 'axios';

import { useState, createContext } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posted, setPosted] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [applied, setApplied] = useState(false);
  const [stats, setStats] = useState('');

  // const router = useRouter();

  // Post a new job
  const newJob = async (data, access_token) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/new/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setPosted(true);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Apply to a job
  const applyToJob = async (id, access_token) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data.applied === true) {
        setLoading(false);
        setApplied(true);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Check if already applied to a job
  const checkJobApplied = async (id, access_token) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.API_URL}/api/jobs/${id}/check/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setLoading(false);
      setApplied(res.data);
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Get topic's stats
  const getTopicStats = async (topic) => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`);

      setLoading(false);
      setStats(res.data);
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Clear all errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <JobContext.Provider
      value={{
        loading,
        error,
        posted,
        setPosted,
        updated,
        applied,
        applyToJob,
        checkJobApplied,
        setUpdated,
        stats,
        newJob,
        getTopicStats,
        clearErrors,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
