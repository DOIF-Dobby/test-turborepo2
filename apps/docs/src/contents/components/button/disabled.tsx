import { Button } from '@repo/ui/components/button'
import { Paragraph1 } from '@repo/ui/components/typography'

export default function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Paragraph1>cta1</Paragraph1>
        <div className="flex items-center gap-2">
          <Button isDisabled variant="solid">
            Solid
          </Button>
          <Button isDisabled variant="bordered">
            Bordered
          </Button>
          <Button isDisabled variant="light">
            Light
          </Button>
        </div>
      </div>
      <div>
        <Paragraph1>cta2</Paragraph1>
        <div className="flex items-center gap-2">
          <Button color="cta2" isDisabled variant="solid">
            Solid
          </Button>
          <Button color="cta2" isDisabled variant="bordered">
            Bordered
          </Button>
          <Button color="cta2" isDisabled variant="light">
            Light
          </Button>
        </div>
      </div>
      <div>
        <Paragraph1>destructive</Paragraph1>
        <div className="flex items-center gap-2">
          <Button color="destructive" isDisabled variant="solid">
            Solid
          </Button>
          <Button color="destructive" isDisabled variant="bordered">
            Bordered
          </Button>
          <Button color="destructive" isDisabled variant="light">
            Light
          </Button>
        </div>
      </div>
    </div>
  )
}
