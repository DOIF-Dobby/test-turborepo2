import type { ColumnDef } from '@tanstack/react-table'
import { SquareArrowRightEnter } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { TradingSettingsActivationSwitch } from '../components/settings.activation-switch'
import type { TradingSettingWithAlgorithmResponse } from '../services/settings.api'

export function useTradingSettingColumns() {
  const columns = useMemo<ColumnDef<TradingSettingWithAlgorithmResponse>[]>(
    () => [
      {
        accessorKey: 'tradingSettingId',
        header: 'ID',
        size: 100,
      },
      {
        accessorKey: 'currency',
        header: '통화',
        size: 150,
      },
      {
        accessorKey: 'algorithmName',
        header: '알고리즘',
        size: 250,
      },
      {
        accessorKey: 'orderAmountRatio',
        header: '주문 금액 비율',
        size: 150,
        accessorFn: ({ orderAmountRatio }) => `${orderAmountRatio}%`,
      },
      {
        accessorKey: 'isActive',
        header: '활성화',
        size: 80,
        cell: ({ row }) => {
          const { original } = row
          const { isActive, tradingSettingId, algorithmName, currency } =
            original

          return (
            <TradingSettingsActivationSwitch
              isActive={isActive}
              tradingSettingId={tradingSettingId}
              algorithmName={algorithmName}
              currency={currency}
            />
          )
        },
      },
      {
        accessorKey: '_',
        header: '',
        cell: ({ row }) => {
          const {
            original: { tradingSettingId },
          } = row

          return (
            <Link
              href={`/trading/settings/${tradingSettingId}`}
              className="flex items-center gap-sw-2xs text-base-600 hover:text-base-800"
            >
              <span>상세 설정</span>
              <SquareArrowRightEnter size={20} />
            </Link>
          )
        },
      },
    ],
    [],
  )

  return columns
}
