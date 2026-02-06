'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Heading5, Paragraph2 } from '@repo/ui/components/typography'
import { Modal } from '@repo/ui/components2/modal'

const modalHandle = Modal.createHandle<{ name: string; age: number }>()

export default function Default() {
  return (
    <>
      <div className="gap-sw-md flex">
        <Modal.Trigger
          handle={modalHandle}
          payload={{ name: 'Apple', age: 10 }}
        >
          <Button>Open Apple</Button>
        </Modal.Trigger>

        <Modal.Trigger
          handle={modalHandle}
          payload={{ name: 'Banana', age: 20 }}
        >
          <Button>Open Banana</Button>
        </Modal.Trigger>

        <Modal.Trigger
          handle={modalHandle}
          payload={{ name: 'Orange', age: 30 }}
        >
          <Button>Open Orange</Button>
        </Modal.Trigger>
      </div>

      <Modal handle={modalHandle}>
        {({ payload }) => {
          return (
            <Frame>
              <Heading5>name: {payload?.name}</Heading5>
              <Paragraph2>age: {payload?.age}</Paragraph2>
            </Frame>
          )
        }}
      </Modal>
    </>
  )
}
