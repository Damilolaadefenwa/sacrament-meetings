import {NextRequest, NextResponse } from 'next/server';
import { getMeetings, getMeetingByDate } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  // Read the URL and check if a "?date=" parameter was passed
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  
  // Fetch meetings from the database (filtered if a date exists)
  if (date) {
    const meeting = await getMeetingByDate(date);
    return NextResponse.json(meeting ? [meeting] : []);
  }

  const query = searchParams.get('query') ?? " ";
  const page = Number(searchParams.get('page')) || 1;
  const meetings = await getMeetings(query, page);
  
  // Return the data as a JSON response
  return NextResponse.json(meetings);
}