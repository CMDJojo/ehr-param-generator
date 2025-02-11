export type Gender = 'Male' | 'Female'

export function ifGender<A>(gender: Gender, male: A, female: A): A {
  if (gender === 'Male') return male
  else return female
}
