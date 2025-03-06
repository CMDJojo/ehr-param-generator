import { Patient } from './patient'
import { Prng } from './prng'
import { Visit } from './visit'

export class EHR {
  patient: Patient
  visits: Visit[]

  constructor(patient: Patient, visit: Visit[]) {
    this.patient = patient
    this.visits = visit
  }

  static randomPatient(): EHR {
    const prng = Prng.randomSeed()
    return new EHR(new Patient(prng), [])
  }

  regeneratePatient(): void {
    const prng = Prng.randomSeed()
    this.patient = new Patient(prng)
  }

  addVisit(visit: Visit): void {
    this.visits.push(visit)
  }

  addRandomVisit(): void {
    this.visits.push(this.randomVisit())
  }

  regenerateVisit(index: number): void {
    this.visits[index] = this.randomVisit()
  }

  randomVisit(): Visit {
    return new Visit(Prng.randomSeed(), this.patient.age)
  }
}
