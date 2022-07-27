import { HttpResponse } from '@/presentation/protocols'

export interface Controller<T = any> {
  handle (httpRequest: T): Promise<HttpResponse>
}
