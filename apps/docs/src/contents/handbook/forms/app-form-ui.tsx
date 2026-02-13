'use client'

import { AppForm, useAppForm } from '@repo/forms'
import { Radio } from '@repo/ui/components/radio'
import * as v from 'valibot'

const Schema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
  radioFruit: v.pipe(v.string(), v.nonEmpty('선택해주세요.')),
  selectFruit: v.pipe(v.string(), v.nonEmpty('선택해주세요.')),
})

export default function AppFormExample() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      radioFruit: '',
      selectFruit: '',
    },
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
      <form.AppField name="firstName">
        {(field) => <field.TextField label="First Name" />}
      </form.AppField>

      <form.AppField name="radioFruit">
        {(field) => (
          <field.RadioGroup label="Radio Fruit">
            <Radio value="apple">Apple</Radio>
            <Radio value="banana">Banana</Radio>
            <Radio value="orange">Orange</Radio>
          </field.RadioGroup>
        )}
      </form.AppField>

      <form.AppField name="selectFruit">
        {(field) => (
          <field.Select
            label="Select Fruit"
            items={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'orange', label: 'Orange' },
            ]}
          />
        )}
      </form.AppField>

      <form.SubmitButton>Submit</form.SubmitButton>
    </AppForm>
  )
}
