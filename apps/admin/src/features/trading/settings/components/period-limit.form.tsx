import { getCurrentDateTime, parseDateTime } from '@repo/date'
import { AppForm, useAppForm } from '@repo/forms'
import { safePromise } from '@repo/utils/promise'
import { vDateRange, vRequiredDate } from '@repo/validators'
import { useMemo } from 'react'
import * as v from 'valibot'
import type { TradingPeriodLimitResponse } from '../services/period-limit.api'
import {
  useCreateTradingPeriodLimit,
  useUpdateTradingPeriodLimit,
} from '../services/period-limit.hooks'

const FormSchema = v.pipe(
  v.object({
    startDateTime: vRequiredDate(),
    endDateTime: vRequiredDate(),
  }),
  vDateRange({
    startKey: 'startDateTime',
    endKey: 'endDateTime',
  }),
)

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  startDateTime: getCurrentDateTime(),
  endDateTime: getCurrentDateTime(),
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
      const startDateTime = parseDateTime(initialData.startDateTime)
      const endDateTime = parseDateTime(initialData.endDateTime)

      return {
        startDateTime,
        endDateTime,
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
      const { startDateTime, endDateTime } = value

      const data = {
        startDateTime: startDateTime!.toString(),
        endDateTime: endDateTime!.toString(),
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
      <form.AppField name="startDateTime">
        {(field) => <field.DateTimePicker label="시작일시" isRequired />}
      </form.AppField>

      <form.AppField name="endDateTime">
        {(field) => <field.DateTimePicker label="종료일시" isRequired />}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
