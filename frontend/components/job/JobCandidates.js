import React from 'react';

import DataTable from 'react-data-table-component';

import Link from 'next/link';

const JobCandidates = ({ candidatesApplied }) => {
  const columns = [
    {
      name: "Job's Name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: 'User ID',
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "Candidate's Resume",
      sortable: true,
      selector: (row) => row.resume,
    },
    {
      name: 'Applied at',
      sortable: true,
      selector: (row) => row.appliedAt,
    },
  ];

  const data = [];

  candidatesApplied &&
    candidatesApplied.forEach((item) => {
      data.push({
        title: item.job.title,
        id: item.user,
        salary: '$' + item.salary,
        resume: (
          <Link
            href={`https://lebonjob.s3.eu-west-3.amazonaws.com/${item.resume}`}
          >
            <a
              className='text-success text-center ml-4'
              rel='noreferrer'
              target='_blank'
            >
              <b>
                <i aria-hidden className='fas fa-download'></i> View Resume
              </b>
            </a>
          </Link>
        ),
        appliedAt: item.appliedAt.substring(0, 10),
      });
    });

  return (
    <div className='row'>
      <div className='col-2'></div>
      <div className='col-8 mt-5'>
        <h4 className='my-5'>
          {candidatesApplied &&
            `${candidatesApplied.length} candidates applied to this job`}
        </h4>
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

export default JobCandidates;
