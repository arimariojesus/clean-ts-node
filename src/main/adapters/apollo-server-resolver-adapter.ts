import { Controller } from '@/presentation/protocols'

export const adaptResolver = async (controller: Controller, args: any): Promise<void> => {
  const httpResponse = await controller.handle(args)
  return httpResponse.body
}
