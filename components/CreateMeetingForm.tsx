'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createMeeting, type MeetingFormState } from '@/lib/actions';

const initialState: MeetingFormState = { message: null, errors: {}, values: {} };

export function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm"
    >
      {/* Date & Meeting Type */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="date"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Meeting Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={state.values?.date ?? ''}
            aria-describedby="date-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="meetingType"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            key={state.values?.meetingType ?? 'regular'}
            defaultValue={state.values?.meetingType ?? 'regular'}
            aria-describedby="meetingType-error"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="regular">Regular Sacrament Meeting</option>
            <option value="testimony">Fast &amp; Testimony Meeting</option>
            <option value="stake">Stake Conference</option>
            <option value="general">General Conference</option>
          </select>
          <div id="meetingType-error" aria-live="polite" aria-atomic="true">
            {state.errors?.meetingType?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Presiding & Conducting */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="presiding"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={state.values?.presiding ?? ''}
            placeholder="e.g., Bishop Smith"
            aria-describedby="presiding-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true">
            {state.errors?.presiding?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="conducting"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={state.values?.conducting ?? ''}
            placeholder="e.g., Brother Jones"
            aria-describedby="conducting-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {state.errors?.conducting?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div>
        <label
          htmlFor="announcements"
          className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          Announcements (one per line, optional)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={2}
          defaultValue={state.values?.announcements ?? ''}
          placeholder="Ward Choir Practice at 3 PM"
          aria-describedby="announcements-error"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div id="announcements-error" aria-live="polite" aria-atomic="true">
          {state.errors?.announcements?.map((err) => (
            <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
              {err}
            </p>
          ))}
        </div>
      </div>

      {/* Opening Hymn & Prayer */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="openingHymnNumber"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Opening Hymn #
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            max="400"
            defaultValue={state.values?.openingHymnNumber ?? ''}
            placeholder="2"
            aria-describedby="openingHymnNumber-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingHymnNumber?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="openingHymnTitle"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={state.values?.openingHymnTitle ?? ''}
            placeholder="The Spirit of God"
            aria-describedby="openingHymnTitle-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingHymnTitle?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="openingPrayer"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            defaultValue={state.values?.openingPrayer ?? ''}
            placeholder="Sister Brown"
            aria-describedby="openingPrayer-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingPrayer?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Ward & Stake Business */}
      <div>
        <label
          htmlFor="wardBusiness"
          className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          Ward Business (one item per line, optional)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={2}
          defaultValue={state.values?.wardBusiness ?? ''}
          placeholder="Sustaining of new Primary president"
          aria-describedby="wardBusiness-error"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div id="wardBusiness-error" aria-live="polite" aria-atomic="true">
          {state.errors?.wardBusiness?.map((err) => (
            <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
              {err}
            </p>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={state.values?.stakeBusiness === 'true'}
            className="h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-2 focus:ring-blue-600"
          />
          <label
            htmlFor="stakeBusiness"
            className="text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Include Stake Business
          </label>
        </div>
      </div>

      {/* Sacrament Hymn */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="sacramentHymnNumber"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Sacrament Hymn #
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="1"
            max="400"
            defaultValue={state.values?.sacramentHymnNumber ?? ''}
            placeholder="169"
            aria-describedby="sacramentHymnNumber-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sacramentHymnNumber?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="sacramentHymnTitle"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={state.values?.sacramentHymnTitle ?? ''}
            placeholder="In Remembrance of Thy Suffering"
            aria-describedby="sacramentHymnTitle-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sacramentHymnTitle?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Speakers & Musical Numbers */}
      <div>
        <label
          htmlFor="speakers"
          className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          Speakers &amp; Musical Numbers (one per line: Name | Topic | optional type)
        </label>
        <textarea
          id="speakers"
          name="speakers"
          rows={3}
          defaultValue={state.values?.speakers ?? ''}
          placeholder={'Sister Johnson | Faith in Jesus Christ\nWard Choir | Redeemer of Israel | musical-number'}
          aria-describedby="speakers-error"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div id="speakers-error" aria-live="polite" aria-atomic="true">
          {state.errors?.speakers?.map((err) => (
            <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
              {err}
            </p>
          ))}
        </div>
      </div>

      {/* Closing Hymn & Prayer */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="closingHymnNumber"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Closing Hymn #
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            max="400"
            defaultValue={state.values?.closingHymnNumber ?? ''}
            placeholder="31"
            aria-describedby="closingHymnNumber-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingHymnNumber?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="closingHymnTitle"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={state.values?.closingHymnTitle ?? ''}
            placeholder="O God, Our Help in Ages Past"
            aria-describedby="closingHymnTitle-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingHymnTitle?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="closingPrayer"
            className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            defaultValue={state.values?.closingPrayer ?? ''}
            placeholder="Brother White"
            aria-describedby="closingPrayer-error"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingPrayer?.map((err) => (
              <p key={err} className="mt-1 text-sm text-red-600 dark:text-red-400">
                {err}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Form Error Summary */}
      <div aria-live="polite" aria-atomic="true">
        {state.message ? (
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {state.message}
          </p>
        ) : null}
      </div>

      {/* Submit & Cancel Buttons */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Saving Meeting...' : 'Save Meeting'}
        </button>
        <Link
          href="/meetings"
          className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}