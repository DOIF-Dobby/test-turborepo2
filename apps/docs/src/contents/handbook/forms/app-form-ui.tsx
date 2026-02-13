'use client'

import { AppForm, useAppForm } from '@repo/forms'
import { Checkbox } from '@repo/ui/components/checkbox'
import { Radio } from '@repo/ui/components/radio'
import * as v from 'valibot'

const Schema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
  radioFruit: v.pipe(v.string(), v.nonEmpty('과일을 하나 선택해주세요.')),
  checkboxFruit: v.pipe(
    v.array(v.string()),
    v.minLength(2, '2개 이상 선택해주세요.'),
  ),
  selectFruit: v.pipe(
    v.nullable(v.string()),
    v.custom((val) => !!val, '과일을 하나 선택해주세요.'),
  ),
  selectMultipleFruit: v.pipe(
    v.array(v.string()),
    v.minLength(2, '2개 이상 선택해주세요.'),
  ),
  comboboxFruit: v.pipe(
    v.nullable(v.string()),
    v.custom((val) => !!val, '과일을 하나 선택해주세요.'),
  ),
  comboboxMultipleFruit: v.pipe(
    v.array(v.string()),
    v.minLength(2, '2개 이상 선택해주세요.'),
  ),
})

const formDefaultValues: v.InferInput<typeof Schema> = {
  firstName: '',
  radioFruit: '',
  checkboxFruit: [],
  selectFruit: null,
  selectMultipleFruit: [],
  comboboxFruit: null,
  comboboxMultipleFruit: [],
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

      <form.AppField name="checkboxFruit">
        {(field) => (
          <field.CheckboxGroup label="Checkbox Fruit">
            <Checkbox value="apple">Apple</Checkbox>
            <Checkbox value="banana">Banana</Checkbox>
            <Checkbox value="orange">Orange</Checkbox>
          </field.CheckboxGroup>
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

      <form.AppField name="selectMultipleFruit">
        {(field) => (
          <field.Select
            label="Select Multiple Fruit"
            multiple
            items={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'orange', label: 'Orange' },
            ]}
          />
        )}
      </form.AppField>

      <form.AppField name="comboboxFruit">
        {(field) => (
          <field.Combobox
            label="Combobox Fruit"
            items={[
              { value: 'apple', label: '사과' },
              { value: 'banana', label: '바나나' },
              { value: 'orange', label: '오렌지' },
            ]}
          />
        )}
      </form.AppField>

      <form.AppField name="comboboxMultipleFruit">
        {(field) => (
          <field.Combobox
            label="Combobox Multiple Fruit"
            multiple
            items={[
              { value: 'apple', label: '사과' },
              { value: 'banana', label: '바나나' },
              { value: 'orange', label: '오렌지' },
            ]}
          />
        )}
      </form.AppField>

      <form.SubmitButton>Submit</form.SubmitButton>
    </AppForm>
  )
}
