import React, { useEffect, useContext } from 'react';

import moment from 'moment';
import { toast } from 'react-toastify';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

import JobContext from '../../context/JobContext';

const JobDetails = ({ job, candidates, access_token }) => {
  const { applyToJob, applied, clearErrors, error, loading, checkJobApplied } =
    useContext(JobContext);

  useEffect(() => {
    // Get and format the longitude/latitude coordinates into a size 2 array
    const coordinates = job?.point.split('(')[1].replace(')', '').split(' ');

    // Create a map and set the center point
    const map = new mapboxgl.Map({
      container: 'job-map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 11.5,
      center: coordinates,
    });

    // Add marker on the map
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

    if (error) {
      toast.error(error);
      clearErrors();
    }

    checkJobApplied(job.id, access_token);
  }, [error]);

  const applyToJobHandler = () => {
    applyToJob(job.id, access_token);
  };

  const dateDeadline = moment(job?.deadlineDate);
  const dateToday = moment(Date.now());
  const isDeadlineDatePassed =
    dateDeadline.diff(dateToday, 'days') < 0 ? true : false;

  return (
    <div className='job-details-wrapper'>
      <div className='container container-fluid'>
        <div className='row'>
          <div className='col-xl-9 col-lg-8'>
            <div className='job-details p-3'>
              <div className='job-header p-4'>
                <h2>{job?.title}</h2>
                <span>
                  <i aria-hidden className='fas fa-building'></i>
                  <span> {job?.company}</span>
                </span>
                <span className='ml-4'>
                  <i aria-hidden className='fas fa-map-marker-alt'></i>
                  <span> {job?.address}</span>
                </span>

                <div className='mt-3'>
                  <span>
                    {loading ? (
                      'Loading...'
                    ) : applied ? (
                      <button
                        disabled
                        className='btn btn-success px-4 py-2 apply-btn'
                      >
                        <i aria-hidden className='fas fa-check'></i>{' '}
                        {loading ? 'Loading...' : 'Applied'}
                      </button>
                    ) : (
                      <button
                        className='btn btn-primary px-4 py-2 apply-btn'
                        onClick={applyToJobHandler}
                        disabled={isDeadlineDatePassed}
                      >
                        {loading ? 'Loading...' : 'Apply Now'}
                      </button>
                    )}

                    <span className='ml-4 text-success'>
                      <b>{candidates}</b> candidates has applied to this job.
                    </span>
                  </span>
                </div>
              </div>

              <div className='job-description mt-5'>
                <h4>Description</h4>
                <p>{job?.description}</p>
              </div>

              <div className='job-summary'>
                <h4 className='mt-5 mb-4'>Job Summary</h4>
                <table className='table table-striped'>
                  <tbody>
                    <tr>
                      <td>Job Type</td>
                      <td>:</td>
                      <td>{job?.jobType}</td>
                    </tr>

                    <tr>
                      <td>Job Industry</td>
                      <td>:</td>
                      <td>{job?.industry}</td>
                    </tr>

                    <tr>
                      <td>Expected Salary</td>
                      <td>:</td>
                      <td>${job?.salary}</td>
                    </tr>

                    <tr>
                      <td>Education</td>
                      <td>:</td>
                      <td>{job?.education}</td>
                    </tr>

                    <tr>
                      <td>Experience</td>
                      <td>:</td>
                      <td>{job?.experience}</td>
                    </tr>

                    <tr>
                      <td>Company</td>
                      <td>:</td>
                      <td>{job?.company}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='job-location'>
                <h4 className='mt-5 mb-4'>Job Location</h4>
                <div id='job-map' style={{ height: 555, width: '100' }} />
              </div>
            </div>
          </div>

          <div className='col-xl-3 col-lg-4'>
            <div className='job-contact-details p-3'>
              <h4 className='my-4'>More Details</h4>
              <hr />
              <h5>Contact Address:</h5>
              <p>{job?.email}</p>

              <h5>Job Posted:</h5>
              <p>
                {moment
                  .utc(job?.createdAt)
                  .local()
                  .startOf('seconds')
                  .fromNow()}
              </p>

              <h5>Deadline Date:</h5>
              <p>{job?.deadlineDate.substring(0, 10)}</p>
            </div>

            {isDeadlineDatePassed && (
              <div className='mt-5 p-0'>
                <div className='alert alert-danger'>
                  <h5>Note:</h5>
                  You can no longer apply to this job. This job offer is
                  expired. Last date to apply for this job was:{' '}
                  <b>{job?.deadlineDate.substring(0, 10)}</b>
                  <br /> Checkout other jobs on Lebonjob.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
