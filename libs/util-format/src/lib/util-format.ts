import * as dayjs from 'dayjs'

export function utilFormat(): string {
  return 'util-format'
}

export const formatDateTime = (text: string) => {
  return dayjs(text).format('DD MMM YYYY, HH:mm')
}
