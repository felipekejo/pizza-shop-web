import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    {
      product: 'Pizza 1',
      amount: 98,
    },
    {
      product: 'Pizza 2',
      amount: 22,
    },
    {
      product: 'Pizza 3',
      amount: 44,
    },
    {
      product: 'Pizza4',
      amount: 23,
    },
    {
      product: 'Pizza 5',
      amount: 11,
    },
  ])
})
