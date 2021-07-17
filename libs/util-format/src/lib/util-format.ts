// import * as dayjs from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
dayjs.locale('id')

/**
 * Format from string or date
 * 31 January 2021, 12:34
 */
export const formatDateTime = (text: string | Date) => {
  return dayjs(text).format('DD MMMM YYYY, HH:mm')
}
