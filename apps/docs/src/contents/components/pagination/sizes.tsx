import type { ButtonProps } from '@repo/ui/components/button'
import { Pagination } from '@repo/ui/components/pagination'

const sizes: ButtonProps['size'][] = ['3xs', '2xs', 'xs', 'sm', 'md']

export default function Sizes() {
  return (
    <div className="gap-sw-md flex flex-col">
      {sizes.map((size) => (
        <div key={size}>
          <div>{size}</div>

          <Pagination size={size}>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous />
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link>1</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link>2</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link>3</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link>4</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link>5</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Next />
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      ))}
    </div>
  )
}
