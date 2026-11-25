'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting, deleteMeeting } from './meetings-db';
import type { SacramentMeeting } from './types';

//Function to Validate with Zod the Form data before touching the Db
const MeetingFormSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid meeting date.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
    message: 'Please select a valid meeting type.',
  }),
  presiding: z.string().trim().min(2, 'Presiding leader is required.'),
  conducting: z.string().trim().min(2, 'Conducting leader is required.'),
  announcements: z.string().optional(),
  openingHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .min(1, 'Opening hymn number is required.')
    .max(400, 'Enter a valid hymn number (1–400).'),
  openingHymnTitle: z
    .string()
    .trim()
    .min(2, 'Opening hymn title is required.'),
  openingPrayer: z.string().trim().min(2, 'Opening prayer is required.'),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .min(1, 'Sacrament hymn number is required.')
    .max(400, 'Enter a valid hymn number (1–400).'),
  sacramentHymnTitle: z
    .string()
    .trim()
    .min(2, 'Sacrament hymn title is required.'),
  speakers: z.string().optional(),
  closingHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .min(1, 'Closing hymn number is required.')
    .max(400, 'Enter a valid hymn number (1–400).'),
  closingHymnTitle: z
    .string()
    .trim()
    .min(2, 'Closing hymn title is required.'),
  closingPrayer: z.string().trim().min(2, 'Closing prayer is required.'),
});

export type MeetingFormState = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    speakers?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
  values?: Record<string, string>;
};

//The Helper to parse multi-line text inputs into structured arrays for PostgreSQL
function buildMeetingPayload(
  data: z.infer<typeof MeetingFormSchema>
): Omit<SacramentMeeting, 'id'> {
  const announcements = (data.announcements ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const wardBusiness = (data.wardBusiness ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((description) => ({ description }));

  // Each line supports "Name | Topic" or "Name | Topic | musical-number"
  const speakers = (data.speakers ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [rawName = '', rawTopic = '', rawType = ''] = line
        .split('|')
        .map((part) => part.trim());
      const type: 'speaker' | 'musical-number' =
        rawType.toLowerCase() === 'musical-number' ? 'musical-number' : 'speaker';
      return {
        name: rawName,
        topic: rawTopic,
        type,
      };
    })
    .filter((item) => item.name.length > 0);

  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements,
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness,
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers,
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}


//A helper function that step-in before buildingMeetingPayload
// run when user makes mistake on just one field. ExtractRawValues 
// grabs what the user typed right away so we can pass it back
//and keep their text inside the boxes instead of wiping the form blank.
function extractRawValues(formData: FormData): Record<string, string> {
  return {
    date: String(formData.get('date') ?? ''),
    meetingType: String(formData.get('meetingType') ?? 'regular'),
    presiding: String(formData.get('presiding') ?? ''),
    conducting: String(formData.get('conducting') ?? ''),
    announcements: String(formData.get('announcements') ?? ''),
    openingHymnNumber: String(formData.get('openingHymnNumber') ?? ''),
    openingHymnTitle: String(formData.get('openingHymnTitle') ?? ''),
    openingPrayer: String(formData.get('openingPrayer') ?? ''),
    wardBusiness: String(formData.get('wardBusiness') ?? ''),
    stakeBusiness: formData.get('stakeBusiness') === 'on' ? 'true' : '',
    sacramentHymnNumber: String(formData.get('sacramentHymnNumber') ?? ''),
    sacramentHymnTitle: String(formData.get('sacramentHymnTitle') ?? ''),
    speakers: String(formData.get('speakers') ?? ''),
    closingHymnNumber: String(formData.get('closingHymnNumber') ?? ''),
    closingHymnTitle: String(formData.get('closingHymnTitle') ?? ''),
    closingPrayer: String(formData.get('closingPrayer') ?? ''),
  };
}

// 1. CREATE a new sacrament meeting
export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const rawValues = extractRawValues(formData);

  const validated = MeetingFormSchema.safeParse({
    ...rawValues,
    stakeBusiness: formData.get('stakeBusiness') === 'on',
  });

  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: 'Please fix the highlighted fields before saving.',
      values: rawValues,
    };
  }

  try {
    await addMeeting(buildMeetingPayload(validated.data));
  } catch (error) {
    console.error('Database Error creating meeting:', error);
    const isDuplicateDate =
      error instanceof Error && error.message.toLowerCase().includes('unique');
    return {
      message: isDuplicateDate
        ? 'A meeting is already scheduled for that date. Please choose a different Sunday.'
        : 'Database Error: Failed to create meeting. Please try again.',
      values: rawValues,
    };
  }

  revalidatePath('/meetings');
  revalidatePath('/meetings/current');
  redirect('/meetings');
}

// 2. UPDATE an existing sacrament meeting (bound with meeting ID)
export async function updateMeetingAction(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const rawValues = extractRawValues(formData);

  const validated = MeetingFormSchema.safeParse({
    ...rawValues,
    stakeBusiness: formData.get('stakeBusiness') === 'on',
  });

  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: 'Please fix the highlighted fields before updating.',
      values: rawValues,
    };
  }

  try {
    await updateMeeting(id, buildMeetingPayload(validated.data));
  } catch (error) {
    console.error('Database Error updating meeting:', error);
    const isDuplicateDate =
      error instanceof Error && error.message.toLowerCase().includes('unique');
    return {
      message: isDuplicateDate
        ? 'Another meeting is already scheduled for that date.'
        : 'Database Error: Failed to update meeting. Please try again.',
      values: rawValues,
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  revalidatePath('/meetings/current');
  redirect('/meetings');
}

// 3. DELETE a single sacrament meeting
/* export async function deleteMeetingAction(id: number) {
  try {
    await deleteMeeting(id);
  } catch (error) {
    console.error('Database Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }

  revalidatePath('/meetings');
  revalidatePath('/meetings/current');
  redirect('/meetings');
} */

// 3. DELETE a single sacrament meeting and show confirmation page
export async function deleteMeetingAction(id: number, meetingDate?: string) {
  try {
    await deleteMeeting(id);
  } catch (error) {
    console.error('Database Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }

  revalidatePath('/meetings');
  revalidatePath('/meetings/current');

  const destination = meetingDate
    ? `/meetings/deleted?date=${encodeURIComponent(meetingDate)}`
    : '/meetings/deleted';

  redirect(destination);
}