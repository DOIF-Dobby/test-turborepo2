import type { Currency } from '@/constants/domain'
import { currencyUtils } from '@/utils/domain'
import { AppForm, useAppForm } from '@repo/forms'
import { onInputAmount, onKeyDownAmount } from '@repo/utils/mask'
import { parseAmount } from '@repo/utils/number'
import { safePromise } from '@repo/utils/promise'
import { vAmountString } from '@repo/validators'
import * as v from 'valibot'
import { useActivateTradingSetting } from '../services/settings.hooks'

const FormSchema = v.object({
  initialPosition: v.union([v.literal(''), vAmountString()]),
})

type FormType = v.InferInput<typeof FormSchema>

const defaultValues: FormType = {
  initialPosition: '0',
}

interface SettingsActivationFormProps {
  tradingSettingId: number
  currency: Currency
  onSuccess?: () => void
}

export function SettingsActivationForm({
  tradingSettingId,
  currency,
  onSuccess,
}: SettingsActivationFormProps) {
  const activate = useActivateTradingSetting()
  const endContent = currencyUtils.getSuffix(currency)

  const form = useAppForm({
    defaultValues,
    validators: {
      onDynamic: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const { initialPosition } = value

      const result = await safePromise(
        activate.mutateAsync({
          id: tradingSettingId,
          data: {
            initialPosition: parseAmount(initialPosition),
          },
        }),
      )

      if (result) {
        onSuccess?.()
      }
    },
  })

  return (
    <AppForm form={form} className="flex flex-col gap-sw-md">
      <form.AppField name="initialPosition">
        {(field) => (
          <field.TextField
            label="초기 포지션"
            description="+ 이면 매수, - 이면 매도"
            onInput={onInputAmount}
            onKeyDown={onKeyDownAmount}
            isClearable={false}
            endContent={
              <span className="min-w-fit text-sm text-base-700">
                {endContent}
              </span>
            }
            classNames={{
              input: 'text-right',
            }}
          />
        )}
      </form.AppField>

      <form.SubmitButton>활성화</form.SubmitButton>
    </AppForm>
  )
}
