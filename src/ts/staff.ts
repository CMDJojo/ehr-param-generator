import { CustomDiscreteDistribution } from './sample'

export type Staff = { name: string; age: number; occupation: string; description: string }

const michael: Staff = {
  name: 'Mikael',
  age: 62,
  occupation: 'Specialist',
  description:
    'Mikael´s documentation style is brief and his documentation mostly focuses on clinical findings. His level of medical competence is generally high. He takes special interest in psychiatric disorders. ',
}

const sara: Staff = {
  name: 'Sara',
  age: 40,
  occupation: 'Specialist',
  description:
    "Saras's documentation style is moderate and concise. Her level of medical competence is overall moderate and she is unusually proficient in the locomotor system since she studied physiotherapy before starting medical school.",
}

const johan: Staff = {
  name: 'Johan',
  age: 37,
  occupation: 'Resident',
  description:
    'Johan´s documentation style is moderate. His level of medical competence varies, he is effective but at the cost of sometimes being sloppy. His threshold for referring patients to other specialists is low.',
}

const mariam: Staff = {
  name: 'Mariam',
  age: 31,
  occupation: 'Intern physician',
  description:
    'Mariam´s documentation style is detailed with great focus on anamnestic information. Her level of medical competence is moderate but like all intern physicians she has limited knowledge in some areas, especially in cardiology and orthopedics.',
}

export const staffDistribution: CustomDiscreteDistribution<Staff> =
  CustomDiscreteDistribution.uniform([michael, sara, johan, mariam])
