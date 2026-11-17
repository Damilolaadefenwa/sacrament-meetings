import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Awaiting the dynamic params object and Converting the ID from the URL into a number
  const { id } = await params;
  const numericId = Number(id);

  //2. Ensuring the ID is a number and returning a 400 error if it's not valid
  if (Number.isNaN(numericId)) { 
    return NextResponse.json(
      { error: 'Invalid meeting ID format. Must be a number.' }, 
      { status: 400 }
    );
  }
  
  // 3. Processed the meeting ID and look up the meeting in the database
  const meeting = await getMeetingById(numericId);

  // 4. Handling invalid IDs (e.g., /api/meetings/abc)
  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found.' }, 
      { status: 404 }
    );
  }

  // 5. Then return the successful meeting data
  return NextResponse.json(meeting);
}