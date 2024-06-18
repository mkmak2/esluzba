import { Duty } from "../types";

export function isValidDateFormat(dateString: string): boolean {
    // Regularne wyrażenie sprawdzające format DD-MM-YYYY
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;

    // Sprawdzamy, czy dateString pasuje do wyrażenia regularnego
    if (!dateRegex.test(dateString)) {
        return false;
    }

    // Wyciągamy poszczególne części daty
    const parts = dateString.match(dateRegex);
    if (!parts) {
        return false;
    }

    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10);
    const year = parseInt(parts[3], 10);

    // Sprawdzamy, czy miesiąc jest w zakresie od 1 do 12
    if (month < 1 || month > 12) {
        return false;
    }

    // Sprawdzamy, ile dni ma dany miesiąc w danym roku
    const daysInMonth = new Date(year, month, 0).getDate();

    // Sprawdzamy, czy dzień jest w zakresie od 1 do ilości dni w miesiącu
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    return true;
}

function parseDate(dateString: string): Date | null {
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
        return null;
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Miesiące w obiekcie Date są zerobazowe
    const year = parseInt(dateParts[2], 10);

    // Sprawdzenie poprawności daty
    const date = new Date(year, month, day);
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return null;
    }

    return date;
}

function areDatesAtLeastTwoDaysApart(dateStr1: string, dateStr2: string): boolean {
    const date1 = parseDate(dateStr1);
    const date2 = parseDate(dateStr2);

    if (date1 === null || date2 === null) {
        throw new Error("Invalid date format. Please use 'DD-MM-YYYY'.");
    }

    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24); // Przeliczenie różnicy czasu na dni

    if(dayDiff<2) return false
    else return true
}

export const compareDates = (duty: Duty[], personId: string, assitantId: string, date: string) => {
    const personDuty = duty.filter( d => d.onDuty.id === personId || d.assistant.id === personId)
    const assistantDuty = duty.filter( d => d.onDuty.id === assitantId || d.assistant.id === assitantId)
    let status: boolean = true

    if(personDuty.length === 0 && assistantDuty.length === 0)
        status = true

    personDuty.forEach(d => {
        if(!areDatesAtLeastTwoDaysApart(d.date, date))
            status = false
    })

    personDuty.forEach(d => {
        if(!areDatesAtLeastTwoDaysApart(d.date, date))
            status = false
    })

    return status
}

export const hasPersonGotDuty = (personId: string, duty: Duty[]) => {
    const onDuty = duty.filter(d => d.onDuty.id === personId)
    const assistance = duty.filter(d => d.assistant.id === personId)

    if(onDuty.length !== 0 || assistance.length !== 0)
        return false

    return true
}