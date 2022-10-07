
const months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function FormatDate(input: string): string {
    const parsedDate = new Date(input)
    const day = days[parsedDate.getDay()]
    const month = months[parsedDate.getMonth()]
    return `${day}, ${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
}
