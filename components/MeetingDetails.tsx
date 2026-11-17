import { SacramentMeeting } from '@/lib/types';

// The full, printable agenda view.
export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 print:shadow-none print:border-none print:p-0">
      <div className="text-center mb-8 border-b pb-4 print:border-black">
        <h1 className="text-3xl font-bold mb-2">Sacrament Meeting</h1>
        <p className="text-lg">{meeting.date}</p>
        <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400 mt-2 print:text-black">{meeting.meetingType} Meeting</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-semibold">Presiding:</span> {meeting.presiding}</p>
          <p><span className="font-semibold">Conducting:</span> {meeting.conducting}</p>
        </div>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <div>
            <h3 className="font-bold border-b mb-2 pb-1 print:border-black">Announcements</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {meeting.announcements.map((ann, idx) => <li key={idx}>{ann}</li>)}
            </ul>
          </div>
        )}

        <div>
          <h3 className="font-bold border-b mb-3 pb-1 print:border-black">Program</h3>
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">Opening Hymn:</span> #{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
            <p><span className="font-semibold">Opening Prayer:</span> {meeting.openingPrayer}</p>
            
            {meeting.wardBusiness.length > 0 && (
              <div className="pl-4 border-l-2 border-gray-300 my-2">
                <p className="font-semibold italic">Ward Business</p>
                {meeting.wardBusiness.map((biz, idx) => <p key={idx}>{biz.description}</p>)}
              </div>
            )}
            
            {meeting.stakeBusiness && <p className="pl-4 border-l-2 border-gray-300 my-2 italic">Stake Business</p>}

            <p><span className="font-semibold">Sacrament Hymn:</span> #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
            <p className="italic text-blue-800 dark:text-gray-100 my-2 text-center">Administration of the Sacrament</p>

            {meeting.speakers.length > 0 && (
              <div className="my-4 space-y-3">
                {meeting.speakers.map((speaker, idx) => (
                  <p key={idx}>
                    <span className="font-semibold">{speaker.type === 'musical-number' ? 'Musical Number' : 'Speaker'}:</span> {speaker.name} {speaker.topic && `— ${speaker.topic}`}
                  </p>
                ))}
              </div>
            )}

            <p><span className="font-semibold">Closing Hymn:</span> #{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
            <p><span className="font-semibold">Closing Prayer:</span> {meeting.closingPrayer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

