import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  // Read the URL and check if a "?date=" parameter was passed
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  
  // Fetch meetings from the mock database (filtered if a date exists)
  const meetings = getMeetings(date);
  
  // Return the data as a JSON response
  return NextResponse.json(meetings);
}