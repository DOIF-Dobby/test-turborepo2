import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { TradingSettingParameterResponse } from '../services/parameter.api'

export function useTradingParameterColumns() {
  return useMemo<ColumnDef<TradingSettingParameterResponse>[]>(
    () => [
      {
        accessorKey: 'parameterId',
        header: 'ID',
        size: 100,
      },
      {
        accessorKey: 'ruleKey',
        header: '규칙 Key',
        size: 250,
      },
      {
        accessorKey: 'ruleName',
        header: '규칙명',
        size: 250,
      },
      {
        accessorKey: 'ruleDescription',
        header: '규칙 설명',
        size: 300,
      },
      {
        accessorKey: 'parameterType',
        header: '파라미터 타입',
        size: 200,
      },
      {
        accessorKey: 'parameterValue',
        header: '파라미터 값',
        size: 200,
      },
    ],
    [],
  )
}
