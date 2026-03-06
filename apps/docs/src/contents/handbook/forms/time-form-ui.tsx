'use client'

import { getCurrentTime } from '@repo/date'
import { AppForm, useAppForm } from '@repo/forms'
import { vMaxTime, vMinTime, vRequiredTime, vTimeRange } from '@repo/validators'
import * as v from 'valibot'

const Schema = v.pipe(
  v.object({
    requiredTime: vRequiredTime(),
    minTime: vMinTime(getCurrentTime()),
    requiredMinTime: v.pipe(vRequiredTime(), vMinTime(getCurrentTime())),
    maxTime: vMaxTime(getCurrentTime()),
    requiredMaxTime: v.pipe(vRequiredTime(), vMaxTime(getCurrentTime())),
    startTime: vRequiredTime('시작 시간을 선택해주세요.'),
    endTime: vRequiredTime('종료 시간을 선택해주세요.'),
  }),
  vTimeRange({
    startKey: 'startTime',
    endKey: 'endTime',
  }),
)

const formDefaultValues: v.InferInput<typeof Schema> = {
  requiredTime: null,
  minTime: null,
  requiredMinTime: null,
  maxTime: null,
  requiredMaxTime: null,
  startTime: null,
  endTime: null,
}

export default function AppFormExample() {
  const form = useAppForm({
    defaultValues: formDefaultValues,
    validators: {
      onDynamic: Schema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log(value)
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="requiredTime">
        {(field) => <field.TimeField label="Required Time" isRequired />}
      </form.AppField>

      <form.AppField name="minTime">
        {(field) => <field.TimeField label="Min Time" />}
      </form.AppField>

      <form.AppField name="requiredMinTime">
        {(field) => <field.TimeField label="Required Min Time" isRequired />}
      </form.AppField>

      <form.AppField name="maxTime">
        {(field) => <field.TimeField label="Max Time" />}
      </form.AppField>

      <form.AppField name="requiredMaxTime">
        {(field) => <field.TimeField label="Required Max Time" isRequired />}
      </form.AppField>

      <div className="flex gap-sw-sm">
        <form.AppField name="startTime">
          {(field) => <field.TimeField label="Start Time" isRequired />}
        </form.AppField>
        <form.AppField name="endTime">
          {(field) => <field.TimeField label="End Time" isRequired />}
        </form.AppField>
      </div>

      <form.SubmitButton>Submit</form.SubmitButton>
    </AppForm>
  )
}
