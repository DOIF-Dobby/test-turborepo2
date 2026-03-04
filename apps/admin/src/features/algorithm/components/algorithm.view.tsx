'use client'

import { getTableSelection, useAppTable } from '@repo/table'
import { AlgorithmColumns } from '../constants/columns'
import { useAlgorithms } from '../services/algorithm.hooks'
import { AlgorithmSection } from './algorithm.section'
import { AlgorithmParameterRuleSection } from './parameter-rule.section'

/**
 * 알고리즘 View
 */
export function AlgorithmView() {
  // 알고리즘 목록 조회
  const { data, isLoading } = useAlgorithms()

  const table = useAppTable({
    data,
    columns: AlgorithmColumns,
    enableRowSelection: true,
  })

  const { selectionItem } = getTableSelection(table)

  return (
    <>
      <div className="flex flex-col gap-sw-xl">
        <AlgorithmSection table={table} isLoading={isLoading} />
        <AlgorithmParameterRuleSection
          algorithmId={selectionItem?.algorithmId}
        />
      </div>
    </>
  )
}
