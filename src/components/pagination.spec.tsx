import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from './pagination'

const onChangePageCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onChangePageCallback.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onChangePageCallback}
      />,
    )

    expect(wrapper.getByText('Page 1 of 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total of 200 item(s)')).toBeInTheDocument()
  })
  it('should be able to navigate to the next page', async () => {
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onChangePageCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Next Page',
    })

    await user.click(nextPageButton)

    expect(onChangePageCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onChangePageCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Previous Page',
    })

    await user.click(nextPageButton)

    expect(onChangePageCallback).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the first page', async () => {
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onChangePageCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'First Page',
    })

    await user.click(nextPageButton)

    expect(onChangePageCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    const user = userEvent.setup()
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onChangePageCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Last Page',
    })

    await user.click(nextPageButton)

    expect(onChangePageCallback).toHaveBeenCalledWith(19)
  })
})
