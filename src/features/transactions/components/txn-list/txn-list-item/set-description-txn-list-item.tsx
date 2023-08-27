import { SetDescriptionEvent } from '@liftedinit/many-js'
import { EditIcon, Text } from '@liftedinit/ui'
import { TxnFirstCol, TxnItemRow } from './base-txn-list-item'

export function SetDescriptionTxnListItem({
  txn,
}: {
  txn: SetDescriptionEvent
}) {
  return (
    <TxnItemRow
      first={
        <TxnFirstCol
          icon={<EditIcon boxSize={5} />}
          txnTypeName="Set Description"
          txnTime={txn?.time}
        />
      }
      secondProps={{ colSpan: 2 }}
      second={
        <>
          <Text fontSize="xs">New description:</Text>
          <Text
            fontWeight="medium"
            whiteSpace="pre-wrap"
            title={txn.description}
            fontSize="sm"
          >
            {txn.description}
          </Text>
        </>
      }
    />
  )
}
