import React from 'react';

import DataTable from 'react-data-table-component';

import Link from 'next/link';

const AppliedJobs = ({ jobs }) => {
  const columns = [
    {
      name: 'Job title',
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: 'Salary',
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: 'Education',
      sortable: true,
      selector: (row) => row.education,
    },
    {
      name: 'Experience',
      sortable: true,
      selector: (row) => row.experience,
    },
    {
      name: 'Applied Date',
      sortable: true,
      selector: (row) => row.appliedDate,
    },
    {
      name: 'Action',
      sortable: true,
      selector: (row) => row.action,
    },
  ];

  const data = [];

  jobs &&
    jobs.forEach((item) => {
      data.push({
        title: item.job.title,
        salary: '$' + item.job.salary,
        education: item.job.education,
        experience: item.job.experience,
        appliedDate: item.appliedAt.substring(0, 10),
        action: (
          <Link href={`/jobs/${item.job.id}`}>
            <a className='btn btn-primary'>
              <i aria-hidden className='fa fa-eye'></i>
            </a>
          </Link>
        ),
      });
    });

  return (
    <div className='row'>
      <div className='col-2'></div>
      <div className='col-8 mt-5'>
        <h4 className='my-5'>Applied Jobs</h4>
        <DataTable
          columns={columns}
          data={data}
          pagination
          responsive
        ></DataTable>
      </div>
      <div className='col-2'></div>
    </div>
  );
};

export default AppliedJobs;
