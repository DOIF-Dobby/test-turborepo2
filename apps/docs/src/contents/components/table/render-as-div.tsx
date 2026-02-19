import { Table } from '@repo/ui/components/table'

export default function RenderAsDiv() {
  return (
    <Table renderAs="div">
      <Table.HeaderGroup>
        <Table.HeaderRow>
          <Table.Head>주문번호</Table.Head>
          <Table.Head>체결일</Table.Head>
          <Table.Head>체결시간</Table.Head>
          <Table.Head>체결상태</Table.Head>
          <Table.Head>상품종류</Table.Head>
          <Table.Head>체결구분</Table.Head>
          <Table.Head>거래통화</Table.Head>
          <Table.Head>거래방향</Table.Head>
          <Table.Head>체결금액</Table.Head>
          <Table.Head>체결환율</Table.Head>
          <Table.Head>상대금액</Table.Head>
          <Table.Head>사용자명</Table.Head>
          <Table.Head>거래방식</Table.Head>
        </Table.HeaderRow>
      </Table.HeaderGroup>
      <Table.Body>
        <Table.Row>
          <Table.Cell>10001</Table.Cell>
          <Table.Cell>2026-01-01</Table.Cell>
          <Table.Cell>10:00:30</Table.Cell>
          <Table.Cell>FILLED</Table.Cell>
          <Table.Cell>현물환</Table.Cell>
          <Table.Cell>시장가</Table.Cell>
          <Table.Cell>USD_KRW</Table.Cell>
          <Table.Cell>BUY</Table.Cell>
          <Table.Cell>100,000</Table.Cell>
          <Table.Cell>1451.80</Table.Cell>
          <Table.Cell>145,180,000</Table.Cell>
          <Table.Cell>TRADING_BOT</Table.Cell>
          <Table.Cell>자동</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>10002</Table.Cell>
          <Table.Cell>20246-01-01</Table.Cell>
          <Table.Cell>10:00:15</Table.Cell>
          <Table.Cell>FILLED</Table.Cell>
          <Table.Cell>현물환</Table.Cell>
          <Table.Cell>시장가</Table.Cell>
          <Table.Cell>USD_KRW</Table.Cell>
          <Table.Cell>BUY</Table.Cell>
          <Table.Cell>100,000</Table.Cell>
          <Table.Cell>1451.80</Table.Cell>
          <Table.Cell>145,180,000</Table.Cell>
          <Table.Cell>TRADING_BOT</Table.Cell>
          <Table.Cell>자동</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
