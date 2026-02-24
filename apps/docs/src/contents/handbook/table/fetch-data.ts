import { makeData } from './make-data'

const data = makeData(10000)

export async function fetchData(options: {
  pageIndex: number
  pageSize: number
}) {
  await new Promise((r) => setTimeout(r, 500))

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  }
}
