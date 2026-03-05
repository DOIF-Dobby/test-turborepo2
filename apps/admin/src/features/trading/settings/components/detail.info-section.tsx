import { DeleteButton, EditButton } from '@/components/button/action-buttons'
import { SectionCard } from '@/components/section/section-card'
import { SectionItem } from '@/components/section/section-item'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { Frame } from '@repo/ui/components/frame'
import { useRouter } from 'next/navigation'
import {
  useDeleteTradingSetting,
  useTradingSettingDetail,
} from '../services/settings.hooks'
import { TradingSettingsActivationSwitch } from './settings.activation-switch'
import { SettingsEditModal } from './settings.edit-modal'

interface TradingSettingDetailInfoSectionProps {
  tradingSettingId: number
}

export function TradingSettingDetailInfoSection({
  tradingSettingId,
}: TradingSettingDetailInfoSectionProps) {
  const router = useRouter()

  const { data } = useTradingSettingDetail(tradingSettingId)
  const deleteMutation = useDeleteTradingSetting()
  const editModal = useDisclosure()

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(tradingSettingId)
    router.push('/trading/settings')
  }

  if (!data) {
    return null
  }

  const { algorithmName, currency, isActive, orderAmountRatio } = data

  return (
    <>
      <SectionToolbar
        title="자동 거래 설정 정보"
        actions={
          <>
            <EditButton onPress={editModal.open} />
            <DeleteButton onDelete={handleDelete} />
          </>
        }
      />
      <SectionCard>
        <Frame direction="col">
          <SectionItem title="ID:" value={tradingSettingId} />
          <SectionItem title="통화:" value={currency} />
          <SectionItem title="알고리즘:" value={algorithmName} />
          <SectionItem title="주문 금액 비율:" value={`${orderAmountRatio}%`} />
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

      <SettingsEditModal disclosure={editModal} data={data} />
    </>
  )
}
