import { AppForm, useAppForm } from '@repo/forms'
import { Radio } from '@repo/ui/components/radio'
import { vRequired, vRequiredMultiple } from '@repo/validators'
import * as v from 'valibot'
import { AllowDays } from '../constants/domain'
import type { TradingScheduleResponse } from '../services/schedule.api'
import {
  useCreateTradingSchedule,
  useUpdateTradingSchedule,
} from '../services/schedule.hooks'

const FormSchema = v.object({
  startTime: vRequired(),
  endTime: vRequired(),
  allowDays: vRequiredMultiple(),
  allowHoliday: vRequired(),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  startTime: '',
  endTime: '',
  allowDays: [],
  allowHoliday: 'Y',
}

interface TradingScheduleFormProps {
  initialData?: TradingScheduleResponse
  onSuccess?: () => void
}

export function TradingScheduleForm({
  initialData,
  onSuccess,
}: TradingScheduleFormProps) {
  const createMutation = useCreateTradingSchedule()
  const updateMutation = useUpdateTradingSchedule()

  const isEdit = !!initialData

  const form = useAppForm({
    defaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const { allowDays } = value

      const allowDaysParam = AllowDays.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.value]: allowDays.includes(cur.value),
        }),
        {},
      )

      console.log(allowDaysParam)
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="startTime">
        {(field) => <field.TextField isRequired label="시작 시간" />}
      </form.AppField>
      <form.AppField name="endTime">
        {(field) => <field.TextField isRequired label="종료 시간" />}
      </form.AppField>
      <form.AppField name="allowDays">
        {(field) => (
          <field.Select isRequired label="요일" multiple items={AllowDays} />
        )}
      </form.AppField>
      <form.AppField name="allowHoliday">
        {(field) => (
          <field.RadioGroup label="휴일 스케줄 여부">
            <Radio value="Y">허용</Radio>
            <Radio value="N">불허</Radio>
          </field.RadioGroup>
        )}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
