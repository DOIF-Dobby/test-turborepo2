import { DeleteButton, EditButton } from '@/components/button/action-buttons'
import { SectionCard } from '@/components/section/section-card'
import { SectionItem } from '@/components/section/section-item'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { Frame } from '@repo/ui/components/frame'
import { useRouter } from 'next/navigation'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'
import { useDeleteTradingSetting } from '../services/settings.hooks'
import { TradingSettingsActivationSwitch } from './settings.activation-switch'
import { TradingSettingsEditModal } from './settings.edit-modal'

interface TradingSettingDetailInfoSectionProps {
  tradingSettingData: TradingSettingWithAlgorithmResponse
}

export function TradingSettingDetailInfoSection({
  tradingSettingData,
}: TradingSettingDetailInfoSectionProps) {
  const {
    algorithmName,
    currency,
    isActive,
    orderAmountRatio,
    tradingSettingId,
  } = tradingSettingData

  const router = useRouter()

  const deleteMutation = useDeleteTradingSetting()
  const editModal = useDisclosure()

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(tradingSettingId)
    router.push('/trading/settings')
  }

  return (
    <>
      <section>
        <SectionToolbar
          title="자동 거래 설정 정보"
          actions={
            <>
              <EditButton onPress={editModal.open} isDisabled={isActive} />
              <DeleteButton onDelete={handleDelete} isDisabled={isActive} />
            </>
          }
        />
        <SectionCard>
          <Frame direction="col">
            <SectionItem title="ID:" value={tradingSettingId} />
            <SectionItem title="통화:" value={currency} />
            <SectionItem title="알고리즘:" value={algorithmName} />
            <SectionItem
              title="주문 금액 비율:"
              value={`${orderAmountRatio}%`}
            />
            <SectionItem
              title="활성화"
              value={
                <TradingSettingsActivationSwitch
                  algorithmName={algorithmName}
                  currency={currency}
                  isActive={isActive}
                  tradingSettingId={tradingSettingId}
                />
              }
            />
          </Frame>
        </SectionCard>
      </section>

      <TradingSettingsEditModal
        disclosure={editModal}
        data={tradingSettingData}
      />
    </>
  )
}
