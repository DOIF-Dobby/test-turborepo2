'use client'

import { AppForm, useAppForm, withForm } from '@repo/forms'
import { Checkbox } from '@repo/ui/components/checkbox'
import { Radio } from '@repo/ui/components/radio'
import { Heading4 } from '@repo/ui/components/typography'
import { vRequired, vRequiredMultiple } from '@repo/validators'
import { formOptions } from '@tanstack/react-form'
import * as v from 'valibot'

const Schema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
  lastName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
  radioFruit: vRequired('과일을 하나 선택해주세요.'),
  checkboxFruit: vRequiredMultiple('2개 이상 선택해주세요.', 2),
})

const formDefaultValues: v.InferInput<typeof Schema> = {
  firstName: '',
  lastName: '',
  radioFruit: null,
  checkboxFruit: [],
}

const formOpts = formOptions({
  defaultValues: formDefaultValues,
  validators: {
    onDynamic: Schema,
  },
})

export default function WithFormUI() {
  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log(value)
    },
  })

  return (
    <AppForm form={form} className="gap-sw-md flex flex-col">
      <NameFields form={form} />

      <form.AppField name="radioFruit">
        {(field) => (
          <field.RadioGroup label="Radio Fruit">
            <Radio value="apple">Apple</Radio>
            <Radio value="banana">Banana</Radio>
            <Radio value="orange">Orange</Radio>
          </field.RadioGroup>
        )}
      </form.AppField>

      <form.AppField name="checkboxFruit">
        {(field) => (
          <field.CheckboxGroup label="Checkbox Fruit">
            <Checkbox value="apple">Apple</Checkbox>
            <Checkbox value="banana">Banana</Checkbox>
            <Checkbox value="orange">Orange</Checkbox>
          </field.CheckboxGroup>
        )}
      </form.AppField>

      <form.SubmitButton>Submit</form.SubmitButton>
    </AppForm>
  )
}

const NameFields = withForm({
  ...formOpts,
  render: ({ form }) => {
    return (
      <div>
        <Heading4>Name</Heading4>
        <div className="gap-sw-md flex">
          <form.AppField name="firstName">
            {(field) => <field.TextField label="First Name" />}
          </form.AppField>
          <form.AppField name="lastName">
            {(field) => <field.TextField label="Last Name" />}
          </form.AppField>
        </div>
      </div>
    )
  },
})
