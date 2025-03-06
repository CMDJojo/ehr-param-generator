import { type Ref, ref } from 'vue'
import { CustomDiscreteDistribution } from './sample'

export type FileDist = {
  mainDiagnoses: CustomDiscreteDistribution<string>
  chronicDiseases: CustomDiscreteDistribution<string>
  extraQuestions: CustomDiscreteDistribution<string>
}

export const fileDistributions: Ref<
  | { status: 'not started' }
  | { status: 'loading' }
  | { status: 'error'; error: unknown }
  | { status: 'success'; result: FileDist }
> = ref({ status: 'not started' })

export async function loadFiles() {
  if (fileDistributions.value.status !== 'loading') {
    fileDistributions.value = { status: 'loading' }
    try {
      const [main, chronic, extra] = await Promise.all([
        CustomDiscreteDistribution.fromFreqFile('main_diagnoses.txt'),
        CustomDiscreteDistribution.fromFreqFile('chronic_diseases.txt'),
        CustomDiscreteDistribution.fromFreqFile('extra_questions.txt'),
      ])
      fileDistributions.value = {
        status: 'success',
        result: {
          mainDiagnoses: main,
          chronicDiseases: chronic,
          extraQuestions: extra,
        },
      }
    } catch (error) {
      fileDistributions.value = { status: 'error', error }
    }
  }
}
