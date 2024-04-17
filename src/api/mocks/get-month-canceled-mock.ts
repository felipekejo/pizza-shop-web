import { http, HttpResponse } from 'msw'

import { GetMonthCanceledOrdersAmountResponse } from '../get-mount-canceled-orders-amount'

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: 1,
  })
})
