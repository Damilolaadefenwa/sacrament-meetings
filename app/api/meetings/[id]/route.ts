import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Awaiting the dynamic params object
  const { id } = await params;
  
  // 2. Converting the ID from the URL into a number
  const meetingId = parseInt(id, 10);

  // 3. Handling invalid IDs (e.g., /api/meetings/abc)
  if (isNaN(meetingId)) {
    return NextResponse.json(
      { error: 'Invalid meeting ID format. Must be a number.' }, 
      { status: 400 }
    );
  }

  // 4. Look up the meeting
  const meeting = getMeetingById(meetingId);

  // 5. Handling missing meetings (e.g., /api/meetings/999)
  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found.' }, 
      { status: 404 }
    );
  }

  // 6. Then return the successful meeting data
  return NextResponse.json(meeting);
}