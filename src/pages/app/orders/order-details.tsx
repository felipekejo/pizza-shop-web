import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enAU } from 'date-fns/locale'

import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderDetailsSkeleton } from './order-details-skeleton'

export interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const { data: order } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

  if (!order) return null

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Order: {orderId}</DialogTitle>
        <DialogDescription>Order Details</DialogDescription>
      </DialogHeader>
      {order ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Client</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Phone</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.phone ?? 'N/A'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Email</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Order Placed
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(order.createdAt, {
                    locale: enAU,
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      AU
                      {(item.priceInCents / 100).toLocaleString('en-AU', {
                        style: 'currency',
                        currency: 'AUD',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {' '}
                      AU
                      {(
                        (item.priceInCents * item.quantity) /
                        100
                      ).toLocaleString('en-AU', {
                        style: 'currency',
                        currency: 'AUD',
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total Order</TableCell>
                <TableCell className="text-right font-medium">
                  AU
                  {(order.totalInCents / 100).toLocaleString('en-AU', {
                    style: 'currency',
                    currency: 'AUD',
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DialogContent>
  )
}
