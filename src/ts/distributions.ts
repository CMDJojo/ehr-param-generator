import { CustomDiscreteDistribution } from './sample'
import { type Gender } from './types'

export const genderDistribution: CustomDiscreteDistribution<Gender> =
  CustomDiscreteDistribution.fromPmf([
    { probMass: 0.503, elem: 'Male' },
    { probMass: 0.497, elem: 'Female' },
  ])

export const startYearDistribution: CustomDiscreteDistribution<number> =
  CustomDiscreteDistribution.fromPmf([
    { probMass: 0.8, elem: 2020 },
    { probMass: 0.05, elem: 2021 },
    { probMass: 0.05, elem: 2022 },
    { probMass: 0.05, elem: 2023 },
    { probMass: 0.05, elem: 2024 },
  ])

const ageDistData: number[] = [
  0.026, 0.028, 0.028, 0.03, 0.029, 0.03, 0.028, 0.029, 0.027, 0.03, 0.031, 0.033, 0.037, 0.04,
  0.034, 0.036, 0.03, 0.032, 0.03, 0.031, 0.03, 0.031, 0.032, 0.033, 0.027, 0.028, 0.026, 0.025,
  0.024, 0.023, 0.024, 0.022, 0.016, 0.014, 0.01, 0.007, 0.005, 0.002, 0.001, 0.0,
]

export const ageRangeDistribution: CustomDiscreteDistribution<{ age: number; gender: Gender }> =
  CustomDiscreteDistribution.fromPmf(
    ageDistData.map((prob: number, index: number) => ({
      probMass: prob,
      elem: {
        age: Math.floor(index / 2) * 5,
        gender: index % 2 == 0 ? 'Female' : 'Male',
      },
    })),
  )

export const ageRangeDistributionOld: CustomDiscreteDistribution<number> =
  CustomDiscreteDistribution.fromPmf([
    { probMass: 0.026 + 0.028 + 0.028 + 0.03, elem: 0 },
    { probMass: 0.029 + 0.03 + 0.028 + 0.029, elem: 10 },
    { probMass: 0.027 + 0.03 + 0.031 + 0.033, elem: 20 },
    { probMass: 0.037 + 0.04 + 0.034 + 0.036, elem: 30 },
    { probMass: 0.03 + 0.032 + 0.03 + 0.031, elem: 40 },
    { probMass: 0.03 + 0.031 + 0.032 + 0.033, elem: 50 },
    { probMass: 0.027 + 0.028 + 0.026 + 0.025, elem: 60 },
    { probMass: 0.024 + 0.023 + 0.024 + 0.022, elem: 70 },
    { probMass: 0.016 + 0.014 + 0.01 + 0.007, elem: 80 },
    { probMass: 0.005 + 0.002 + 0.001 + 0.0, elem: 90 },
    { probMass: 0, elem: 100 },
  ])

export function avgPhycVisits(age: number): number {
  if (age <= 6) return 1.65
  else if (age <= 17) return 0.77
  else if (age <= 24) return 1.04
  else if (age <= 44) return 1.12
  else if (age <= 64) return 1.41
  else if (age <= 79) return 1.83
  else return 2.54
}

export const avgNurseVisits: number = 1.061
export const avgAssistantVisits: number = 0.149

export function visitsPerAge(age: number): number {
  switch (Math.floor(age / 10)) {
    case 0: // age 0-9
      return (2.8 + 3.6) / 2
    case 1: // age 10-19
      return 1.7
    case 2: // 20-29
      return 1.9
    case 3: // 30-39
      return 2.4
    case 4: // 40-49
      return 2.9
    case 5: //50-59
      return 3.8
    case 6:
      return 4.8
    case 7:
      return 6.2
    case 8:
      return 6.5
    case 9:
      return 4.6
    default:
      return 2.9
  }
}

export const femaleName: CustomDiscreteDistribution<string> = CustomDiscreteDistribution.uniform([
  'ANNA',
  'EVA',
  'MARIA',
  'KARIN',
  'SARA',
  'CHRISTINA',
  'LENA',
  'EMMA',
  'KERSTIN',
  'MARIE',
  'MALIN',
  'JENNY',
  'INGRID',
  'HANNA',
  'LINDA',
  'ANNIKA',
  'SUSANNE',
  'ELIN',
  'MONICA',
  'BIRGITTA',
  'SOFIA',
  'JOHANNA',
  'INGER',
  'CARINA',
  'JULIA',
  'ELISABETH',
  'ULLA',
  'LINNÉA',
  'KATARINA',
  'EMELIE',
  'IDA',
  'HELENA',
  'CAMILLA',
  'ÅSA',
  'ANETTE',
  'SANDRA',
  'MAJA',
  'GUNILLA',
  'ANN',
  'ANITA',
  'AMANDA',
  'MARIANNE',
  'ANNELI',
  'MARGARETA',
  'THERESE',
  'JOSEFIN',
  'CECILIA',
  'JESSICA',
  'HELEN',
  'LISA',
  'ALICE',
  'MATILDA',
  'CAROLINE',
  'FRIDA',
  'ELSA',
  'ULRIKA',
  'BARBRO',
  'SIV',
  'KLARA',
  'EBBA',
  'REBECCA',
  'MADELEINE',
  'SOFIE',
  'ISABELLE',
  'WILMA',
  'AGNETA',
  'LINA',
  'ELLA',
  'GUN',
  'PIA',
  'BERIT',
  'ELLEN',
  'OLIVIA',
  'ASTRID',
  'LOUISE',
  'YVONNE',
  'MOA',
  'AGNES',
  'ALVA',
  'EMILIA',
  'NATHALIE',
  'ALEXANDRA',
  'MONA',
  'VICTORIA',
  'ERIKA',
  'BRITT',
  'FELICIA',
  'ANN-CHRISTIN',
  'ANN-MARIE',
  'LOVISA',
  'PERNILLA',
  'SONJA',
  'CHARLOTTE',
  'BRITT-MARIE',
  'LINN',
  'NINA',
  'SAGA',
  'ALMA',
  'KAROLINA',
  'MIKAELA',
])

export const maleName: CustomDiscreteDistribution<string> = CustomDiscreteDistribution.uniform([
  'LARS',
  'MIKAEL',
  'ANDERS',
  'JOHAN',
  'ERIK',
  'PER',
  'PETER',
  'THOMAS',
  'KARL',
  'JAN',
  'DANIEL',
  'FREDRIK',
  'MOHAMMAD',
  'ANDREAS',
  'STEFAN',
  'HANS',
  'MATS',
  'MARCUS',
  'MATTIAS',
  'MAGNUS',
  'OSCAR',
  'JONAS',
  'ALEXANDER',
  'NIKLAS',
  'MARTIN',
  'BENGT',
  'BO',
  'NILS',
  'VIKTOR',
  'PATRIK',
  'BJÖRN',
  'DAVID',
  'FILIP',
  'HENRIK',
  'LEIF',
  'JOAKIM',
  'EMIL',
  'CHRISTER',
  'ULF',
  'SIMON',
  'SVEN',
  'CHRISTOFFER',
  'ANTON',
  'WILLIAM',
  'CHRISTIAN',
  'ROBERT',
  'GUSTAV',
  'LUCAS',
  'TOMMY',
  'KJELL',
  'RICKARD',
  'HÅKAN',
  'ADAM',
  'GÖRAN',
  'JACOB',
  'JONATHAN',
  'ELIAS',
  'SEBASTIAN',
  'ROBIN',
  'LENNART',
  'ROLF',
  'TOBIAS',
  'JOHN',
  'AXEL',
  'OLIVER',
  'LINUS',
  'STIG',
  'HUGO',
  'KENT',
  'ISAK',
  'ROGER',
  'CLAES',
  'JESPER',
  'ALBIN',
  'LUDVIG',
  'RASMUS',
  'JÖRGEN',
  'ALI',
  'MAX',
  'JIMMY',
  'JOEL',
  'KENNETH',
  'JOSEF',
  'DENNIS',
  'LIAM',
  'GUNNAR',
  'OLLE',
  'LEO',
  'JOHNNY',
  'OLOF',
  'PONTUS',
  'ÅKE',
  'KEVIN',
  'SAMUEL',
  'GABRIEL',
  'ARVID',
  'EDVIN',
  'FELIX',
  'KURT',
  'TORBJÖRN',
])
