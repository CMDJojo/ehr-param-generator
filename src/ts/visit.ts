import { chronicalDiseaseBaseProb, extraQuestionBaseProb } from './distributions'
import { fileDistributions, type FileDist } from './fileDistributions'
import type { Prng } from './prng'
import { type Staff, staffDistribution } from './staff'

export class Visit {
  mainDiagnosis: string = 'Unknown'
  extraQuestionDiagnoses: string[] = []
  chronicDiseaseDiagnoses: string[] = []
  staff: Staff

  constructor(prng: Prng, patientAge: number) {
    this.staff = prng.sampleCustom(staffDistribution)

    const fileDist = (fileDistributions.value as { result: FileDist }).result

    this.mainDiagnosis = prng.sampleCustom(fileDist.mainDiagnoses)

    const extraBase = extraQuestionBaseProb(patientAge)
    const extras = prng.sampleStrangeNegBin1(extraBase)
    for (let i = 0; i < extras; i++) {
      this.extraQuestionDiagnoses.push(prng.sampleCustom(fileDist.extraQuestions))
    }

    const chronicBase = chronicalDiseaseBaseProb(patientAge)
    const chronicals = prng.sampleStrangeNegBin1(chronicBase)
    for (let i = 0; i < chronicals; i++) {
      this.chronicDiseaseDiagnoses.push(prng.sampleCustom(fileDist.chronicDiseases))
    }
  }
}
