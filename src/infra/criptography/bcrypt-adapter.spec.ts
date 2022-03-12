import bcrypt from 'bcrypt'
import { BcyptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Shoudl call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcyptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
