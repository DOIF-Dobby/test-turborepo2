'use client'

import { getToday } from '@repo/date'
import { AppForm, useAppForm } from '@repo/forms'
import { vDateRange, vMaxDate, vMinDate, vRequiredDate } from '@repo/validators'
import * as v from 'valibot'

const Schema = v.pipe(
  v.object({
    requiredDate: vRequiredDate(),
    minDate: vMinDate(getToday()),
    requiredMinDate: v.pipe(vRequiredDate(), vMinDate(getToday())),
    maxDate: vMaxDate(getToday()),
    requiredMaxDate: v.pipe(vRequiredDate(), vMaxDate(getToday())),
    startDate: vRequiredDate('시작일을 선택해주세요.'),
    endDate: vRequiredDate('종료일을 선택해주세요.'),
  }),
  vDateRange({
    startKey: 'startDate',
    endKey: 'endDate',
  }),
)

const formDefaultValues: v.InferInput<typeof Schema> = {
  requiredDate: null,
  minDate: null,
  requiredMinDate: null,
  maxDate: null,
  requiredMaxDate: null,
  startDate: null,
  endDate: null,
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
    <AppForm form={form} className="gap-sw-md flex flex-col">
      <form.AppField name="requiredDate">
        {(field) => <field.DatePicker label="Required Date" isRequired />}
      </form.AppField>

      <form.AppField name="minDate">
        {(field) => <field.DatePicker label="Min Date" />}
      </form.AppField>

      <form.AppField name="requiredMinDate">
        {(field) => <field.DatePicker label="Required Min Date" isRequired />}
      </form.AppField>

      <form.AppField name="maxDate">
        {(field) => <field.DatePicker label="Max Date" />}
      </form.AppField>

      <form.AppField name="requiredMaxDate">
        {(field) => <field.DatePicker label="Required Max Date" isRequired />}
      </form.AppField>

      <div className="gap-sw-sm flex">
        <form.AppField name="startDate">
          {(field) => <field.DatePicker label="Start Date" isRequired />}
        </form.AppField>
        <form.AppField name="endDate">
          {(field) => <field.DatePicker label="End Date" isRequired />}
        </form.AppField>
      </div>

      <form.SubmitButton>Submit</form.SubmitButton>
    </AppForm>
  )
}
