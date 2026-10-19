import { describe, expect, it } from 'vitest'
import cases from './__golden__/slug-golden.json'
import { slugify } from './slug'

describe('slugify', () => {
  it.each(cases)('"$input" -> "$generate"', ({ input, generate }) => {
    expect(slugify(input)).toBe(generate)
  })

  it('handles empty and whitespace', () => {
    expect(slugify('')).toBe('')
    expect(slugify('   ')).toBe('')
  })
})
