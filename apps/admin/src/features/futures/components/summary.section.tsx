'use client'

import { SectionTitle } from '@/components/section/section-title'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { QueryBoundary } from '@repo/query-utils'
import { Spinner } from '@repo/ui/components/spinner'
import { Toggle, ToggleGroup } from '@repo/ui/components/toggle'
import { swClsx } from '@repo/ui/utils/clsx'
import { formatAmount, range } from '@repo/utils/number'
import {
  ChartLine,
  CircleDollarSignIcon,
  HandCoinsIcon,
  LockKeyholeIcon,
  ShieldAlertIcon,
  TriangleAlertIcon,
  WalletIcon,
} from 'lucide-react'
import { useState } from 'react'
import type { CommodityCurrency } from '../constants/domain'
import { useFuturesSummary } from '../services/futures.hooks'
import {
  FuturesSummarySectionItem,
  FuturesSummarySectionItemSkeleton,
} from './summary.section-item'

export function FutureSummarySection() {
  const [commodityCurrency, setCommodityCurrency] =
    useState<CommodityCurrency>('TKR')

  const query = useFuturesSummary(commodityCurrency)
  const amountSuffix = commodityCurrency === 'TKR' ? '원' : '달러'

  return (
    <section>
      <SectionToolbar
        title={
          <div className="flex items-center gap-sw-2xs">
            <SectionTitle>해외 선물 요약</SectionTitle>
            {query.isLoading && <Spinner size="sm" />}
          </div>
        }
        actions={
          <ToggleGroup
            motionAnimation
            disallowEmpty
            value={commodityCurrency}
            onValueChange={(value) =>
              setCommodityCurrency(value as CommodityCurrency)
            }
          >
            <Toggle
              value="TKR"
              classNames={{
                toggle: 'font-semibold',
              }}
            >
              KRW
            </Toggle>
            <Toggle
              value="TUS"
              classNames={{
                toggle: 'font-semibold',
              }}
            >
              USD
            </Toggle>
          </ToggleGroup>
        }
      />
      <div className="flex flex-wrap gap-sw-3xs">
        <QueryBoundary
          query={query}
          fallback={<FutureSummarySectionContentSkeleton />}
        >
          {(data) => {
            const {
              balance,
              safeRate,
              marginRate,
              totalPnl,
              marketPricePositionValue,
              avgPricePositionValue,
              profitRate,
            } = data

            const {
              totalAsset,
              orderPossibleAmount,
              requiredMargin,
              maintenanceMargin,
              riskRate,
              unrealizedPnl,
              realizedPnl,
            } = balance

            const totalAssetContent = `${formatAmount(totalAsset)} ${amountSuffix}`
            const orderPossibleAmountContent = `${formatAmount(orderPossibleAmount)} ${amountSuffix}`
            const requiredMarginContent = `${formatAmount(requiredMargin)} ${amountSuffix}`
            const maintenanceMarginContent = `${formatAmount(maintenanceMargin)} ${amountSuffix}`
            const marketPricePositionValueContent = `${formatAmount(marketPricePositionValue)} ${amountSuffix}`
            const avgPricePositionValueContent = `${formatAmount(avgPricePositionValue)} ${amountSuffix}`
            const marginRateContent = `${formatAmount(marginRate)}%`

            const profitRateColor =
              profitRate >= 0 ? 'text-green-500' : 'text-red-500'

            const profitRateContent = (
              <span className={profitRateColor}>
                ({formatAmount(profitRate)}%)
              </span>
            )

            const safeRateColor =
              safeRate >= 80
                ? 'text-green-500'
                : safeRate >= 50
                  ? 'text-yellow-500'
                  : 'text-red-500'

            const safeRateContent = (
              <span className={safeRateColor}>{formatAmount(safeRate)}%</span>
            )

            const ristRateColor =
              riskRate === 0 ? 'text-green-500' : 'text-red-500'

            const riskRateContent = (
              <span className={ristRateColor}>{formatAmount(riskRate)}%</span>
            )

            const totalPnlColor =
              totalPnl >= 0 ? 'text-green-500' : 'text-red-500'

            const totalPnlContent = (
              <span className={totalPnlColor}>
                {formatAmount(totalPnl)} {amountSuffix}
              </span>
            )

            const unrealizedPnlColor =
              unrealizedPnl >= 0 ? 'text-green-500' : 'text-red-500'

            const unrealizedPnlContent = (
              <span className={unrealizedPnlColor}>
                {formatAmount(unrealizedPnl)} {amountSuffix}
              </span>
            )

            const realizedPnlColor =
              realizedPnl >= 0 ? 'text-green-500' : 'text-red-500'

            const realizedPnlContent = (
              <span className={realizedPnlColor}>
                {formatAmount(realizedPnl)} {amountSuffix}
              </span>
            )

            return (
              <>
                <FuturesSummarySectionItem
                  title="총 자산"
                  content={totalAssetContent}
                  icon={
                    <CircleDollarSignIcon className="size-5 stroke-blue-500" />
                  }
                  tooltipContent={
                    <>
                      <strong>총 자산이란?</strong>
                      <br />
                      <span>계좌의 전체 자산 총액입니다.</span>
                      <br />
                      <br />
                      <strong>예수금 잔고: </strong>
                      <span>{totalAssetContent}</span>
                      <br />
                      증권사에 예치된 현금 잔고입니다.
                    </>
                  }
                />
                <FuturesSummarySectionItem
                  title="주문 가능 금액"
                  content={orderPossibleAmountContent}
                  icon={<WalletIcon className="size-5 stroke-violet-500" />}
                />
                <FuturesSummarySectionItem
                  title="위탁 증거금"
                  content={
                    <>
                      {requiredMarginContent}({marginRateContent})
                    </>
                  }
                  icon={<LockKeyholeIcon className="size-5 stroke-red-500" />}
                  tooltipContent={
                    <>
                      <strong>위탁증거금이란?</strong>
                      <br />
                      <span>
                        선물 거래 및 유지를 위해 필요한 최소 증거금입니다.
                      </span>
                      <br />
                      <br />
                      <strong>• 위탁증거금: </strong>
                      <span>{requiredMarginContent}</span>
                      <br />
                      <strong>• 유지증거금: </strong>
                      <span>{maintenanceMarginContent}</span>
                      <br />
                      <br />
                      <strong>증거금율이란?</strong>
                      <br />
                      선물 포지션 가치 대비 위탁증거금 비율입니다.
                      <br />
                      증거금 대비 선물 거래의 레버리지를 나타냅니다.
                    </>
                  }
                />
                <FuturesSummarySectionItem
                  title="실시간 포지션 가치"
                  content={
                    <>
                      {marketPricePositionValueContent}
                      {profitRateContent}
                    </>
                  }
                  icon={
                    <ChartLine className={swClsx('size-5', profitRateColor)} />
                  }
                  tooltipContent={
                    <>
                      <strong>실시간 포지션 가치란?</strong>
                      <br />
                      보유 중인 모든 포지션의 현재 시장가치 기준 합계입니다.
                      <br />
                      <br />
                      <strong>• 실시간 포지션 가치(시장가 기준): </strong>
                      <span>{marketPricePositionValueContent}</span>
                      <br />
                      <strong>• 선물 포지션 가치(평단가 기준): </strong>
                      <span>{avgPricePositionValueContent}</span>
                      <br />
                      <span>
                        포지션 가치는 가격×계약수량×계약크기로 산출됩니다.
                      </span>
                      <br />
                      <br />
                      <strong>손익율이란?</strong>
                      <br />
                      <span>
                        보유 중인 모든 포지션의 시장 변동으로 인한 손실률 또는
                        이익률입니다
                      </span>
                      <br />
                      <br />
                      <strong>• 손익율: </strong>
                      <span>{profitRateContent}</span>
                      <br />
                      <span>- 손익율 ≥ 0%: 이익 (녹색)</span>
                      <br />
                      <span>- 손익율 &lt; 0%: 손실 (빨강)</span>
                    </>
                  }
                />
                <FuturesSummarySectionItem
                  title="청산 안전율"
                  content={safeRateContent}
                  icon={
                    <TriangleAlertIcon
                      className={swClsx('size-5', safeRateColor)}
                    />
                  }
                  tooltipContent={
                    <>
                      <strong>청산안전율이란?</strong>
                      <br />
                      <span>
                        총자산이 위탁증거금 수준까지 하락할 경우의 선물 포지션
                        손실율입니다.
                      </span>
                      <br />
                      <span>
                        청산안전율보다 추가 손실이 발생하는 경우 위험도가
                        증가하며 강제 청산될 수 있습니다.
                      </span>
                      <br />
                      <br />
                      <strong>• 청산안전율: </strong>
                      <span>{safeRateContent}</span>
                      <br />
                      <span>
                        청산안전율은 (예수금 - 위탁증거금)/선물 포지션 가치로
                        산출됩니다.
                      </span>
                      <br />
                      <br />
                      <span>- 80% 이상: 안전 (초록색)</span>
                      <br />
                      <span>- 50% 이상 80% 미만: 주의 (노란색)</span>
                      <br />
                      <span>- 50% 미만: 위험 (빨간색)</span>
                    </>
                  }
                />
                <FuturesSummarySectionItem
                  title="위험율"
                  content={riskRateContent}
                  icon={
                    <ShieldAlertIcon
                      className={swClsx('size-5', ristRateColor)}
                    />
                  }
                  tooltipContent={
                    <>
                      <strong>위험율이란?</strong>
                      <br />
                      <span>한국투자증권 API에서 제공하는 지표입니다.</span>
                      <br />
                      <br />
                      <strong>계산 방법:</strong>
                      <br />
                      <span>
                        위험율 = [1-(예탁자산평가금액÷미결제증거금)] * 100%
                      </span>
                      <br />
                      <span>※ TOT_KRW로 환산된 금액으로 계산</span>
                      <br />
                      <br />
                      <strong>• 0%: </strong>
                      <span>안전 (녹색)</span>
                      <br />
                      <strong>• 0% 초과: </strong>
                      <span>위험 (빨간색)</span>
                      <br />
                      <br />
                      <span>0%일 때만 안전한 상태입니다.</span>
                      <br />
                      <span>
                        강제청산 수량 = 종목별 미결제약정 수량 * 위험도
                      </span>
                    </>
                  }
                />
                <FuturesSummarySectionItem
                  title="총 손익"
                  content={totalPnlContent}
                  icon={
                    <HandCoinsIcon
                      className={swClsx('size-5', totalPnlColor)}
                    />
                  }
                  tooltipContent={
                    <>
                      <strong>총 손익이란?</strong>
                      <br />
                      <span>실현손익 + 미실현손익의 합계입니다.</span>
                      <br />
                      <br />
                      <strong>실현손익: </strong>
                      {realizedPnlContent}
                      <br />
                      <span>청산된 포지션의 확정 손익입니다.</span>
                      <br />
                      <br />
                      <strong>미실현손익: </strong>
                      {unrealizedPnlContent}
                      <br />
                      <span>보유 중인 포지션의 평가 손익입니다.</span>
                      <br />
                      <br />
                      <strong>수수료: </strong>
                      <span>{formatAmount(balance.fee)}</span>
                      <br />
                      <span>거래 수수료 총액입니다.</span>
                    </>
                  }
                />
              </>
            )
          }}
        </QueryBoundary>
      </div>
    </section>
  )
}

function FutureSummarySectionContentSkeleton() {
  return range(7).map((i) => <FuturesSummarySectionItemSkeleton key={i} />)
}
