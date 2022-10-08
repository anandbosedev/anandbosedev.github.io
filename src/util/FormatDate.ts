
export const Months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const Days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function FormatDate(input: string): string {
    const parsedDate = new Date(input)
    const day = Days[parsedDate.getDay()]
    const month = Months[parsedDate.getMonth()]
    return `${day}, ${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
}
