import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

// Gets the time passed string
export function getTimeAgoString(value: number = Date.now()) {

    return timeAgo.format(value)
}