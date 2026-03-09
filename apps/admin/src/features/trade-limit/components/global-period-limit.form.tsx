import { getCurrentDateTime, parseDateTime } from '@repo/date'
import { AppForm, useAppForm } from '@repo/forms'
import { safePromise } from '@repo/utils/promise'
import { vDateRange, vRequiredDate, vRequiredString } from '@repo/validators'
import { useMemo } from 'react'
import * as v from 'valibot'
import { GlobalPeriodLimitTargetTypes } from '../constants/domain'
import type { GlobalPeriodLimitResponse } from '../services/global-period-limit.api'
import {
  useCreateGlobalPeriodLimit,
  useUpdateGlobalPeriodLimit,
} from '../services/global-period-limit.hooks'

const FormSchema = v.pipe(
  v.object({
    targetType: v.picklist(GlobalPeriodLimitTargetTypes.map((t) => t.value)),
    startDateTime: vRequiredDate(),
    endDateTime: vRequiredDate(),
    reason: vRequiredString(),
  }),
  vDateRange({
    startKey: 'startDateTime',
    endKey: 'endDateTime',
  }),
)

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  targetType: 'ALL',
  startDateTime: getCurrentDateTime(),
  endDateTime: getCurrentDateTime(),
  reason: '',
}

interface GlobalPeriodLimitFormProps {
  initialData?: GlobalPeriodLimitResponse
  onSuccess?: () => void
}

export function GlobalPeriodLimitForm({
  initialData,
  onSuccess,
}: GlobalPeriodLimitFormProps) {
  const createMutation = useCreateGlobalPeriodLimit()
  const updateMutation = useUpdateGlobalPeriodLimit()

  const formDefaultValues = useMemo<FormType>(() => {
    if (initialData) {
      const startDateTime = parseDateTime(initialData.startDateTime)
      const endDateTime = parseDateTime(initialData.endDateTime)

      return {
        targetType: initialData.targetType,
        startDateTime,
        endDateTime,
        reason: initialData.reason,
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
      const { targetType, startDateTime, endDateTime, reason } = value

      const data = {
        startDateTime: startDateTime!.toString(),
        endDateTime: endDateTime!.toString(),
        reason,
      }

      const mutation = isEdit
        ? updateMutation.mutateAsync({
            limitId: initialData.limitId,
            data,
          })
        : createMutation.mutateAsync({
            ...data,
            targetType,
          })

      const result = await safePromise(mutation)
      if (result) {
        onSuccess?.()
      }
    },
  })

  return (
    <AppForm form={form}>
      <form.AppField name="targetType">
        {(field) => (
          <field.Select
            label="대상 유형"
            isRequired
            items={GlobalPeriodLimitTargetTypes}
            isClearable={false}
            isDisabled={isEdit}
          />
        )}
      </form.AppField>

      <form.AppField name="startDateTime">
        {(field) => <field.DateTimePicker label="시작일시" isRequired />}
      </form.AppField>

      <form.AppField name="endDateTime">
        {(field) => <field.DateTimePicker label="종료일시" isRequired />}
      </form.AppField>

      <form.AppField name="reason">
        {(field) => <field.TextField label="제한 사유" isRequired />}
      </form.AppField>

      <form.SubmitButton>저장</form.SubmitButton>
    </AppForm>
  )
}
