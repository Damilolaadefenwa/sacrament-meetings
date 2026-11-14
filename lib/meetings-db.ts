import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-11-01',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Fast Sunday', 'Tithing Settlement sign-ups'],
    openingHymn: { number: 134, title: 'I Believe in Christ' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{description: 'Discussion on upcoming ward activities'}],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [],
    closingHymn: { number: 143, title: 'Let the Holy Spirit Guide' },
    closingPrayer: 'Brother Davis'
  },
  {
    id: 2,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Adams',
    announcements: ['Ward Choir Practice at 3 PM', 'Youth Activity this Wednesday'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Brown',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: true,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Johnson', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Ward Choir', topic: 'Redeemer of Israel', type: 'musical-number' },
      { name: 'Brother Johnson', topic: 'Enduring to the End', type: 'speaker' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother White'
  },
  {
    id: 3,
    date: '2026-11-15',
    meetingType: 'regular',
    presiding: '1st Counselor Evans',
    conducting: '2nd Counselor Clark',
    announcements: ['Relief Society Activity on Thursday'],
    openingHymn: { number: 86, title: 'How Great Thou Art' },
    openingPrayer: 'Brother Green',
    wardBusiness: [{ description: 'Sustaining of New Callings' }],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'Youth Speaker 1', topic: 'Seminary Learnings', type: 'speaker' },
      { name: 'Youth Speaker 2', topic: 'Missionary Work', type: 'speaker' }
    ],
    closingHymn: { number: 270, title: 'I\'ll Go Where You Want Me to Go' },
    closingPrayer: 'Sister Green'
  },
  {
    id: 4,
    date: '2026-11-22',
    meetingType: 'stake',
    presiding: 'Stake President Davis',
    conducting: 'President Davis',
    announcements: [],
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Stake Relief Society President',
    wardBusiness: [{description: 'Stake Conference Announcements'}],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'High Councilor', topic: 'Ministering', type: 'speaker' },
      { name: 'Stake Choir', topic: 'Come, Thou Fount of Every Blessing', type: 'musical-number' },
      { name: 'Stake President', topic: 'Temple Worship', type: 'speaker' }
    ],
    closingHymn: { number: 258, title: 'O Thou Rock of Our Salvation' },
    closingPrayer: 'Stake Young Men President'
  },
  {
    id: 5,
    date: '2026-11-29',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Fifth Sunday Combined Lesson in the Chapel'],
    openingHymn: { number: 116, title: 'Come, Follow Me' },
    openingPrayer: 'Sister Taylor',
    wardBusiness: [{description: 'Welcoming Newly Baptized Members'}],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Sister Lewis', topic: 'Gratitude', type: 'speaker' },
      { name: 'Brother Lewis', topic: 'Service', type: 'speaker' }
    ],
    closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Sister Martinez'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}