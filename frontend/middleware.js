import { NextResponse } from 'next/server';

const allowedParams = [
  'page',
  'keyword',
  'location',
  'education',
  'experience',
  'salary',
  'jobType',
];

export async function middleware(req) {
  // const country = req.geo.country;

  if (req.nextUrl.pathname.startsWith('/')) {
    // This logic is only applied to / (home page)
    const url = req.nextUrl;
    let changed = false;

    // console.log(url);

    url.searchParams.forEach((param, key) => {
      if (!allowedParams.includes(key)) {
        url.searchParams.delete(key);
        changed = true;
      }
    });

    if (changed) {
      return NextResponse.redirect(url);
    }
  }
}
