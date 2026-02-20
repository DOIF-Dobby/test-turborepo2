import { Pagination } from '@repo/ui/components/pagination'

export default function Default() {
  return (
    <Pagination>
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
  )
}
