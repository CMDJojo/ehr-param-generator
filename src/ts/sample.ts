export function samplePoisson(u: number, lambda: number): number {
  let x = 0
  let p = Math.exp(-lambda)
  let s = p

  while (u > s) {
    x += 1
    p *= lambda / x
    s += p
  }
  return x
}

export class CustomDiscreteDistribution<A> {
  cdf: { prob: number; elem: A }[]

  constructor(cdf: { prob: number; elem: A }[]) {
    this.cdf = cdf
    this.checkCdf()
  }

  checkCdf() {
    const { prob } = this.cdf[this.cdf.length - 1]
    const delta = Math.abs(prob - 1)
    if (delta > 0.02) {
      throw new Error(`Last elements CDF should be 1, but is ${prob}`)
    } else if (delta > 0.01) {
      console.warn(`CDF far from 1, last prob is ${prob}`)
    }

    for (let i = 1; i < this.cdf.length; i++) {
      const prevProb = this.cdf[i - 1].prob
      const thisProb = this.cdf[i].prob
      if (thisProb < prevProb) {
        throw new Error(`CDF invariant broken: prob[${i - 1}]=${prevProb}, prob[${i}]=${thisProb}`)
      }
    }
  }

  static uniform<A>(elems: A[]): CustomDiscreteDistribution<A> {
    const probMass = 1 / elems.length
    return this.fromPmf(
      elems.map((elem) => ({
        probMass,
        elem,
      })),
    )
  }

  static fromPmf<A>(pmf: { probMass: number; elem: A }[]): CustomDiscreteDistribution<A> {
    let cprob = 0
    const cdf: { prob: number; elem: A }[] = []
    for (const { probMass, elem } of pmf) {
      cprob += probMass
      cdf.push({ prob: cprob, elem })
    }
    return new CustomDiscreteDistribution(cdf)
  }

  sample(u: number): A {
    let start = 0
    let end = this.cdf.length - 1
    while (start <= end) {
      const mid = Math.floor(start + (end - start) / 2)
      const thisProb = this.cdf[mid].prob
      const prevProb = mid === 0 ? 0 : this.cdf[mid - 1].prob
      if (thisProb >= u && prevProb < u) {
        return this.cdf[mid].elem
      }
      if (thisProb < u) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
    throw new Error(`Sample failed (u=${u})`)
  }
}
