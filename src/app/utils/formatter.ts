import {format} from 'date-fns'

export const formatTime = (timestamp: number): string => {
  return format(new Date(timestamp * 1000), 'yyyy-MM-dd HH:mm:ss')
}
