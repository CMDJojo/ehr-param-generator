import * as S from './sample.ts'

export class Prng {
  ugen: () => number

  constructor(f: () => number) {
    this.ugen = f
  }

  sampleUniform(): number {
    return this.ugen()
  }

  /**
   * Sample uniformly from a range
   *
   * @param from Low bound (inclusive)
   * @param to High bound (exclusive)
   * @returns a random number uniformly in the range from `from` to `to-1`
   */
  sampleRange(from: number = 0, to: number): number {
    return Math.floor(this.sampleUniform() * (to - from)) + from
  }

  samplePoisson(lambda: number): number {
    return S.samplePoisson(this.sampleUniform(), lambda)
  }

  sampleCustom<A>(dist: S.CustomDiscreteDistribution<A>): A {
    return dist.sample(this.sampleUniform())
  }

  sampleStrangeNegBin1(p: number): number {
    console.log(`p: ${p}`)
    if (this.ugen() > p) {
      return 0
    }
    let x = 1
    while (this.ugen() < p / 2) {
      x++
    }
    return x
  }

  static randomSeed(): Prng {
    const [a, b, c, d] = randomSeed()
    return new Prng(sfc32(a, b, c, d))
  }
}

function sfc32(a: number, b: number, c: number, d: number): () => number {
  return function () {
    a |= 0
    b |= 0
    c |= 0
    d |= 0
    const t = (((a + b) | 0) + d) | 0
    d = (d + 1) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }
}

function randomSeed(): number[] {
  return [random32(), random32(), random32(), random32()]
}

function random32(): number {
  while (true) {
    const n = (Math.random() * 2 ** 32) >>> 0
    if (n > 1000) {
      return n
    }
  }
}
