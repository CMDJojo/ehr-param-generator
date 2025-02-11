import {
  ageRangeDistribution,
  avgAssistantVisits,
  avgNurseVisits,
  avgPhycVisits,
  femaleName,
  maleName,
  startYearDistribution,
} from './distributions'
import type { Prng } from './prng'
import { ifGender } from './types'

export class Patient {
  name: string
  age: number
  firstVisitYear: number
  firstVisitDayOffset: number
  firstVisitDate: Date
  phycVisits: Visits
  nurseVisits: Visits
  assistantVisits: Visits
  gender: 'Male' | 'Female'

  constructor(prng: Prng) {
    // Randomize parameters
    const { age, gender } = prng.sampleCustom(ageRangeDistribution)
    this.age = age + prng.sampleRange(0, 5)
    this.gender = gender
    this.firstVisitYear = prng.sampleCustom(startYearDistribution)
    this.firstVisitDayOffset = prng.sampleRange(0, 365)
    const d = new Date(this.firstVisitYear.toString()) // 1st day of the year
    d.setDate(d.getDate() + this.firstVisitDayOffset)
    this.firstVisitDate = d

    this.phycVisits = new Visits(
      prng,
      avgPhycVisits(this.age),
      this.firstVisitYear,
      this.firstVisitDayOffset,
      1,
    )
    this.nurseVisits = new Visits(
      prng,
      avgNurseVisits,
      this.firstVisitYear,
      this.firstVisitDayOffset,
    )
    this.assistantVisits = new Visits(
      prng,
      avgAssistantVisits,
      this.firstVisitYear,
      this.firstVisitDayOffset,
    )

    const dist = ifGender(gender, maleName, femaleName)
    this.name = formatName(prng.sampleCustom(dist))
  }

  description(): string {
    return `Patient is a ${this.gender} with ${this.age} years of age.
    His first visit was at ${this.firstVisitDate.toDateString()}.
    Phsycisian/nurse/assistant visits 2020: ${this.phycVisits.year2020}/${this.nurseVisits.year2020}/${this.assistantVisits.year2020}
    Phsycisian/nurse/assistant visits 2021: ${this.phycVisits.year2021}/${this.nurseVisits.year2021}/${this.assistantVisits.year2021}
    Phsycisian/nurse/assistant visits 2022: ${this.phycVisits.year2022}/${this.nurseVisits.year2022}/${this.assistantVisits.year2022}
    Phsycisian/nurse/assistant visits 2023: ${this.phycVisits.year2023}/${this.nurseVisits.year2023}/${this.assistantVisits.year2023}
    Phsycisian/nurse/assistant visits 2024: ${this.phycVisits.year2024}/${this.nurseVisits.year2024}/${this.assistantVisits.year2024}
    `
  }
}

export class Visits {
  year2020: number = 0
  year2021: number = 0
  year2022: number = 0
  year2023: number = 0
  year2024: number = 0

  constructor(prng: Prng, lambda: number, year: number, dayOffset: number, minFirst: number = 0) {
    const lambdaFirstYear = (lambda * (365 - dayOffset)) / 365
    const firstYearVisits = prng.samplePoisson(lambdaFirstYear)
    this.setYear(year, Math.max(minFirst, firstYearVisits))

    for (let i = year + 1; i < 2025; i++) {
      this.setYear(i, prng.samplePoisson(lambda))
    }
  }

  setYear(year: number, value: number) {
    switch (year) {
      case 2020:
        this.year2020 = value
        return
      case 2021:
        this.year2021 = value
        return
      case 2022:
        this.year2022 = value
        return
      case 2023:
        this.year2023 = value
        return
      case 2024:
        this.year2024 = value
        return
    }
    throw new Error(`Year ${year} out of range (2020-2024)`)
  }

  getYear(year: number) {
    switch (year) {
      case 2020:
        return this.year2020
      case 2021:
        return this.year2021
      case 2022:
        return this.year2022
      case 2023:
        return this.year2023
      case 2024:
        return this.year2024
    }
    throw new Error(`Year ${year} out of range (2020-2024)`)
  }
}

function formatName(name: string): string {
  return name
    .split('-')
    .map((seg) => seg.charAt(0) + seg.substring(1).toLowerCase())
    .join('-')
}
