import {
  AddButton,
  DeleteButton,
  EditButton,
} from '@/components/button/action-buttons'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, getTableSelection, useAppTable } from '@repo/table'
import { AlgorithmParameterRuleColumns } from '../constants/columns'
import {
  useAlgorithmParameterRules,
  useDeleteParameterRule,
} from '../services/parameter-rule.hooks'
import { ParameterRuleAddModal } from './parameter-rule.add-modal'
import { ParameterRuleEditModal } from './parameter-rule.edit-modal'

interface AlgorithmParameterRuleSectionProps {
  algorithmId?: number
}

/**
 * 알고리즘 파라미터 규칙 섹션
 */
export function AlgorithmParameterRuleSection({
  algorithmId,
}: AlgorithmParameterRuleSectionProps) {
  const addModal = useDisclosure()
  const editModal = useDisclosure()
  const deleteMutation = useDeleteParameterRule()

  const { data, isLoading } = useAlgorithmParameterRules(algorithmId)
  const table = useAppTable({
    data,
    columns: AlgorithmParameterRuleColumns,
    enableRowSelection: true,
  })

  const { selectionItem, hasSelection } = getTableSelection(table)

  const handleDelete = async () => {
    if (selectionItem && algorithmId) {
      await deleteMutation.mutateAsync({
        algorithmId,
        ruleId: selectionItem.parameterRuleId,
      })

      table.resetRowSelection()
    }
  }

  return (
    <>
      <section>
        <SectionToolbar
          title="알고리즘 파라미터 규칙 목록"
          actions={
            <>
              <AddButton onPress={addModal.open} isDisabled={!algorithmId} />
              <EditButton onPress={editModal.open} isDisabled={!hasSelection} />
              <DeleteButton
                isDisabled={!hasSelection}
                onDelete={handleDelete}
              />
            </>
          }
        />
        <AppTable table={table} isLoading={isLoading} />
      </section>

      <ParameterRuleAddModal disclosure={addModal} algorithmId={algorithmId} />
      <ParameterRuleEditModal
        disclosure={editModal}
        data={selectionItem}
        algorithmId={algorithmId}
      />
    </>
  )
}
