import { EditButton } from '@/components/button/action-buttons'
import { SectionCard } from '@/components/section/section-card'
import { SectionItem } from '@/components/section/section-item'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { Frame } from '@repo/ui/components/frame'
import { formatAmount } from '@repo/utils/number'
import { useMemo } from 'react'
import { useFuturesRiskPolicy, useSafeRate } from '../services/futures.hooks'
import { RiskPolicyEditModal } from './risk-policy.edit-modal'

export function RiskPolicySection() {
  const editModal = useDisclosure()

  const { data: riskPolicy } = useFuturesRiskPolicy()
  const { data: safeRate } = useSafeRate()

  const safeRateValue = useMemo(() => {
    if (!safeRate) {
      return '보유 포지션 없음'
    }

    return `${safeRate.safeRate}%`
  }, [safeRate])

  if (!riskPolicy) {
    return null
  }

  return (
    <>
      <div>
        <SectionToolbar
          title="청산 안전율"
          actions={<EditButton onPress={editModal.open} />}
        />
        <SectionCard>
          <Frame>
            <SectionItem
              title="청산 안전율 리스트 한도:"
              value={`${formatAmount(riskPolicy.liquidationSafeRate)}%`}
            />
            <SectionItem title="현재 청산 안전율:" value={safeRateValue} />
            {safeRate && (
              <>
                <SectionItem
                  title="예수금:"
                  value={`${safeRate.depositBalance}$`}
                />
                <SectionItem
                  title="위탁 증거금:"
                  value={`${safeRate.requiredMargin}$`}
                />
                <SectionItem
                  title="포지션 가치 합계:"
                  value={`${safeRate.totalPositionValue}$`}
                />
                <SectionItem
                  title="총 손익률:"
                  value={`${safeRate.totalProfitRate}%`}
                />
              </>
            )}
          </Frame>
        </SectionCard>
      </div>

      <RiskPolicyEditModal disclosure={editModal} data={riskPolicy} />
    </>
  )
}
