'use client'

import { AddButton, EditButton } from '@/components/button/action-buttons'
import { SectionToolbar } from '@/components/section/section-toolbar'
import { useDisclosure } from '@repo/hooks/use-disclosure'
import { AppTable, getTableSelection, useAppTable } from '@repo/table'
import { useMarketInstrumentColumns } from '../hooks/use-market-instrument.columns'
import { useMarketInstruments } from '../services/market-instrument.hooks'
import { MarketInstrumentAddModal } from './market-instrument.add-modal'
import { MarketInstrumentEditModal } from './market-instrument.edit-modal'

export function MarketInstrumentSection() {
  const addModal = useDisclosure()
  const editModal = useDisclosure()

  const { data = [], isLoading } = useMarketInstruments()
  const columns = useMarketInstrumentColumns()

  const table = useAppTable({
    data,
    columns,
    enableRowSelection: true,
  })

  const { hasSelection, selectionItem } = getTableSelection(table)

  const existingCurrencies = data.map((item) => item.currency)

  return (
    <>
      <section>
        <SectionToolbar
          title="월물 코드 관리"
          actions={
            <>
              <AddButton onPress={addModal.open} />
              <EditButton isDisabled={!hasSelection} onPress={editModal.open} />
            </>
          }
        />
        <AppTable table={table} isLoading={isLoading} />
      </section>

      <MarketInstrumentAddModal
        disclosure={addModal}
        existingCurrencies={existingCurrencies}
      />
      <MarketInstrumentEditModal disclosure={editModal} data={selectionItem} />
    </>
  )
}
