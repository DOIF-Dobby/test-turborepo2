'use client'

import { getToday } from '@repo/date'
import { AppForm, useAppForm } from '@repo/forms'
import { vMaxDate, vMinDate, vRequiredDate } from '@repo/validators'
import * as v from 'valibot'

const Schema = v.object({
  requiredDate: vRequiredDate(),
  minDate: vMinDate(getToday()),
  requiredMinDate: v.pipe(vRequiredDate(), vMinDate(getToday())),
  maxDate: vMaxDate(getToday()),
  requiredMaxDate: v.pipe(vRequiredDate(), vMaxDate(getToday())),
})

const formDefaultValues: v.InferInput<typeof Schema> = {
  requiredDate: null,
  minDate: null,
  requiredMinDate: null,
  maxDate: null,
  requiredMaxDate: null,
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

      <form.SubmitButton>Submit</form.SubmitButton>
    </AppForm>
  )
}
