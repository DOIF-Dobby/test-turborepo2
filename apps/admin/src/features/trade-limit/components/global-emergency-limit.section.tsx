import { SectionCard } from '@/components/section/section-card'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { Frame } from '@repo/ui/components/frame'
import { useGlobalEmergencyLimit } from '../services/global-emergency-limit.hooks'
import { GlobalEmergencyLimitActivateItem } from './global-emergency-limit.activate-item'
import { GlobalEmergencyLimitDeactivateItem } from './global-emergency-limit.deactivate-item'

export function GlobalEmergencyLimitSection() {
  const { data } = useGlobalEmergencyLimit()

  if (!data) {
    return null
  }

  return (
    <div>
      <SectionToolbar title="전역 긴급 제한" />
      <SectionCard>
        <Frame>
          {data.isActivated ? (
            <GlobalEmergencyLimitDeactivateItem
              latestActivatedAt={data.latestActivatedAt!}
              latestActivatedBy={data.latestActivatedBy!}
            />
          ) : (
            <GlobalEmergencyLimitActivateItem />
          )}
        </Frame>
      </SectionCard>
    </div>
  )
}
