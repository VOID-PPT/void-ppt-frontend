import { describe, expect, it } from 'vitest'
import { env } from '@/shared/config/env'

describe('env config', () => {
  it('exposes the API base URL', () => {
    expect(env.apiBaseUrl).toBe('/api/v1')
  })
})
