'use client'

import { EditButton } from '@/components/button/action-buttons'
import { SectionCard } from '@/components/section/section-card'
import { SectionItem } from '@/components/section/section-item'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { Frame } from '@repo/ui/components/frame'
import { formatAmount } from '@repo/utils/number'
import { useFuturesRiskPolicy } from '../services/futures.hooks'
import { RiskPolicyEditModal } from './risk-policy.edit-modal'

export function RiskPolicySection() {
  const editModal = useDisclosure()

  const { data: riskPolicy } = useFuturesRiskPolicy()

  return (
    <>
      <section>
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
          </Frame>
        </SectionCard>
      </section>

      <RiskPolicyEditModal disclosure={editModal} data={riskPolicy} />
    </>
  )
}
