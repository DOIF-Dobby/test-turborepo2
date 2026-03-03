import type { ColumnDef } from '@tanstack/react-table'
import type { AlgorithmParameterRuleResponse } from '../services/algorithm-parameter-rule.api'
import type { AlgorithmResponse } from '../services/algorithm.api'
import { ALGORITHM_TYPES_MAP } from './definitions'

export const ALGORITHM_COLUMNS: ColumnDef<AlgorithmResponse>[] = [
  {
    accessorKey: 'algorithmId',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'algorithmKey',
    header: '알고리즘 키',
    size: 200,
  },
  {
    accessorKey: 'algorithmName',
    header: '알고리즘명',
    size: 200,
  },
  {
    accessorKey: 'algorithmDescription',
    header: '알고리즘 설명',
    size: 300,
  },
  {
    accessorKey: 'algorithmType',
    header: '알고리즘 타입',
    size: 120,
    accessorFn: (row) => ALGORITHM_TYPES_MAP[row.algorithmType],
  },
]

export const ALGORITHM_PARAMETER_RULE_COLUMNS: ColumnDef<AlgorithmParameterRuleResponse>[] =
  [
    {
      accessorKey: 'parameterRuleId',
      header: 'ID',
      size: 80,
    },
    {
      accessorKey: 'ruleKey',
      header: '규칙 키',
      size: 200,
    },
    {
      accessorKey: 'ruleName',
      header: '규칙명',
      size: 200,
    },
    {
      accessorKey: 'ruleDescription',
      header: '규칙 설명',
      size: 300,
    },
    {
      accessorKey: 'parameterType',
      header: '파라미터 타입',
      size: 120,
    },
    {
      accessorKey: 'upperBound',
      header: '상한 값',
      size: 120,
    },
    {
      accessorKey: 'lowerBound',
      header: '하한 값',
      size: 120,
    },
  ]
