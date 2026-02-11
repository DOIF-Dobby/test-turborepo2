'use client'

import { revalidateLogic, useForm } from '@tanstack/react-form'
import * as v from 'valibot'

const UserSchema = v.object({
  firstName: v.pipe(v.string(), v.minLength(3, '3글자 이상 입력하세요.')),
  lastName: v.string(),
})

export default function Default() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    validators: {
      onSubmit: UserSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
  })

  return (
    <div>
      <div>Tanstack Form</div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="firstName"
          // validators={{
          //   onSubmit: ({ value }) => {
          //     return value.length < 3
          //       ? 'First name must be at least 3 characters long'
          //       : undefined
          //   },
          // }}
        >
          {(field) => {
            return (
              <div>
                <label htmlFor={field.name}>First Name</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {!field.state.meta.isValid && (
                  <em role="alert">
                    {field.state.meta.errors.map((error) => error?.message)}
                  </em>
                )}
              </div>
            )
          }}
        </form.Field>

        <form.Field name="lastName">
          {(field) => (
            <div>
              <label htmlFor={field.name}>Last Name</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && (
                <em role="alert">
                  {field.state.meta.errors.map((error) => error?.message)}
                </em>
              )}
            </div>
          )}
        </form.Field>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
