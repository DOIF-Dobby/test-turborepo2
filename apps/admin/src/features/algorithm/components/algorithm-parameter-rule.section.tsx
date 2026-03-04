import { TableToolbar } from '@/components/table/table-toolbar'
import { AppTable, useAppTable } from '@repo/table'
import { ALGORITHM_PARAMETER_RULE_COLUMNS } from '../constants/columns'
import { useAlgorithmParameterRules } from '../services/algorithm-parameter-rule.hooks'

interface AlgorithmParameterRuleSectionProps {
  algorithmId?: number
}

/**
 * 알고리즘 파라미터 규칙 섹션
 */
export function AlgorithmParameterRuleSection({
  algorithmId,
}: AlgorithmParameterRuleSectionProps) {
  const { data: rules, isLoading } = useAlgorithmParameterRules(algorithmId)
  const ruleTable = useAppTable({
    data: rules,
    columns: ALGORITHM_PARAMETER_RULE_COLUMNS,
    enableRowSelection: true,
  })

  return (
    <section>
      <TableToolbar title="알고리즘 파라미터 규칙 목록" />
      <AppTable table={ruleTable} isLoading={isLoading} />
    </section>
  )
}
