import {
  formatToDateTimeString,
  getToday,
  parseDateTimeString,
  Time,
} from '@repo/date'
import { AppForm, useAppForm } from '@repo/forms'
import { safePromise } from '@repo/utils/promise'
import { vRequiredDate, vRequiredTime } from '@repo/validators'
import { useMemo } from 'react'
import * as v from 'valibot'
import type { TradingPeriodLimitResponse } from '../services/period-limit.api'
import {
  useCreateTradingPeriodLimit,
  useUpdateTradingPeriodLimit,
} from '../services/period-limit.hooks'

const FormSchema = v.object({
  startDate: vRequiredDate(),
  startTime: vRequiredTime(),
  endDate: vRequiredDate(),
  endTime: vRequiredTime(),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  startDate: getToday(),
  startTime: new Time(0, 0, 0),
  endDate: getToday(),
  endTime: new Time(23, 59, 59),
}

interface TradingPeriodLimitFormProps {
  tradingSettingId: number
  initialData?: TradingPeriodLimitResponse
  onSuccess?: () => void
}

export function TradingPeriodLimitForm({
  tradingSettingId,
  initialData,
  onSuccess,
}: TradingPeriodLimitFormProps) {
  const createMutation = useCreateTradingPeriodLimit()
  const updateMutation = useUpdateTradingPeriodLimit()

  const formDefaultValues = useMemo<FormType>(() => {
    if (initialData) {
      const start = parseDateTimeString(initialData.startDateTime)
      const end = parseDateTimeString(initialData.endDateTime)

      return {
        startDate: start.dateValue,
        startTime: start.timeValue,
        endDate: end.dateValue,
        endTime: end.timeValue,
      }
    }
    return defaultValues
  }, [initialData])

  const isEdit = !!initialData

  const form = useAppForm({
    defaultValues: formDefaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const { startDate, startTime, endDate, endTime } = value

      const data = {
        startDateTime: formatToDateTimeString(startDate!, startTime!),
        endDateTime: formatToDateTimeString(endDate!, endTime!),
      }

      const mutation = isEdit
        ? updateMutation.mutateAsync({
            tradingSettingId,
            periodLimitId: initialData.periodLimitId,
            data,
          })
        : createMutation.mutateAsync({ tradingSettingId, data })

      const result = await safePromise(mutation)
      if (result) {
        onSuccess?.()
      }
    },
  })

  return (
    <AppForm form={form}>
      <div className="flex items-end gap-sw-2xs">
        <form.AppField name="startDate">
          {(field) => (
            <field.DatePicker
              classNames={{ container: 'w-1/2' }}
              label="시작일시"
              isRequired
            />
          )}
        </form.AppField>
        <form.AppField name="startTime">
          {(field) => <field.TimeField classNames={{ container: 'w-1/2' }} />}
        </form.AppField>
      </div>

      <div className="flex items-end gap-sw-2xs">
        <form.AppField name="endDate">
          {(field) => (
            <field.DatePicker
              classNames={{ container: 'w-1/2' }}
              label="종료일시"
              isRequired
            />
          )}
        </form.AppField>
        <form.AppField name="endTime">
          {(field) => <field.TimeField classNames={{ container: 'w-1/2' }} />}
        </form.AppField>
      </div>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
