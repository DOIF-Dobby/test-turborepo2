import { parseTime, Time } from '@repo/date'
import { AppForm, useAppForm } from '@repo/forms'
import { Radio } from '@repo/ui/components/radio'
import { mapValues } from '@repo/utils/object'
import { safePromise } from '@repo/utils/promise'
import {
  vRequiredMultiple,
  vRequiredString,
  vRequiredTime,
  vTimeRange,
} from '@repo/validators'
import { useMemo } from 'react'
import * as v from 'valibot'
import { AllowDays, AllowDaysMap } from '../constants/domain'
import type { TradingScheduleResponse } from '../services/schedule.api'
import {
  useCreateTradingSchedule,
  useUpdateTradingSchedule,
} from '../services/schedule.hooks'

const FormSchema = v.pipe(
  v.object({
    startTime: vRequiredTime(),
    endTime: vRequiredTime(),
    allowDays: vRequiredMultiple(),
    allowHoliday: vRequiredString(),
  }),
  vTimeRange({
    startKey: 'startTime',
    endKey: 'endTime',
  }),
)

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  startTime: new Time(0, 0, 0),
  endTime: new Time(23, 59, 59),
  allowDays: [
    'allowMonday',
    'allowTuesday',
    'allowWednesday',
    'allowThursday',
    'allowFriday',
  ],
  allowHoliday: 'N',
}

interface TradingScheduleFormProps {
  tradingSettingId: number
  initialData?: TradingScheduleResponse
  onSuccess?: () => void
}

export function TradingScheduleForm({
  tradingSettingId,
  initialData,
  onSuccess,
}: TradingScheduleFormProps) {
  const createMutation = useCreateTradingSchedule()
  const updateMutation = useUpdateTradingSchedule()

  const isEdit = !!initialData

  const formDefaultValues = useMemo<FormType>(() => {
    if (initialData) {
      const allowDays = AllowDays.filter(
        (allowDay) => initialData[allowDay.value],
      ).map((allowDay) => allowDay.value)

      return {
        startTime: parseTime(initialData.startTime),
        endTime: parseTime(initialData.endTime),
        allowDays,
        allowHoliday: initialData.allowHoliday ? 'Y' : 'N',
      }
    }
    return defaultValues
  }, [initialData])

  const form = useAppForm({
    defaultValues: formDefaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const { allowDays } = value

      const allowDaysParam = mapValues(AllowDaysMap, (_, key) =>
        allowDays.includes(key),
      )

      const data = {
        startTime: value.startTime!.toString(),
        endTime: value.endTime!.toString(),
        allowHoliday: value.allowHoliday === 'Y',
        ...allowDaysParam,
      }

      const mutation = isEdit
        ? updateMutation.mutateAsync({
            tradingSettingId,
            scheduleId: initialData.scheduleId,
            data,
          })
        : createMutation.mutateAsync({
            tradingSettingId,
            data,
          })

      const result = await safePromise(mutation)
      if (result) {
        onSuccess?.()
      }
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="startTime">
        {(field) => <field.TimeField isRequired label="시작 시간" />}
      </form.AppField>
      <form.AppField name="endTime">
        {(field) => <field.TimeField isRequired label="종료 시간" />}
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
