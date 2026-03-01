export interface OrderPayload {
  name: string
  email: string
  phone: string
  fulfillment: 'pickup' | 'delivery'
  deliveryAddress?: string
  payment: 'call' | 'on-pickup'
  items: Array<{
    id: string
    quantity: number
  }>
  notes?: string
}

export interface OrderResponse {
  success: true
  orderRef: string
  message: string
}

export interface OrderError {
  success: false
  message: string
}
