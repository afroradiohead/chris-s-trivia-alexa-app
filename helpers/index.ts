export function getLetterAfterIncrementing(letter: string, incrementer: number): string {
    return String.fromCharCode(letter.charCodeAt(0) + incrementer)
}