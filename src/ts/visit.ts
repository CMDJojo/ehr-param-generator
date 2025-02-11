import type { Prng } from './prng'
import { type Staff, staffDistribution } from './staff'

export class Visit {
  cause: string = 'Unknown'
  staff: Staff

  constructor(prng: Prng) {
    this.staff = prng.sampleCustom(staffDistribution)
  }
}
