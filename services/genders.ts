import type { Gender } from '~/types/genders'

export const genders: Gender[] = [
  {
    id: 1,
    name: 'Женский',
  },
  {
    id: 2,
    name: 'Мужской',
  },
  {
    id: 3,
    name: 'Другой',
  },
]


export const findGenderById = (id: number | null): Gender | null => {
  return genders.find(gender => gender.id === id) ?? null
}