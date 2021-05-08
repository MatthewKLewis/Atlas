const CONSONANT_STRING = 'bcdfghjklmnprstvwxz'
const VOWEL_STRING = 'aeiouy'
const CA = CONSONANT_STRING.split('')
const VA = VOWEL_STRING.split('')
var ABJAD: Array<string> = []
for (let i = 0; i < CA.length; i++) {
    for (let j = 0; j < VA.length; j++) {
        ABJAD.push(CA[i] + VA[j])        
    }    
}

class Episode {
    date: Date
    name:string
    description:string

    constructor(prevEventDate:Date) {
        this.date = this.generateDate(prevEventDate)
        this.name = this.generateName()
        this.description = this.generateDescription()
    }

    generateDate(prevEventDate:Date) {
        var newDate: Date = prevEventDate
        return newDate;
    }

    generateName() {
        var newName = ''
        var syllableCount = Math.floor(Math.random() * 6) + 2
        for (let i = 0; i < syllableCount; i++) {
            newName = newName + ABJAD[Math.floor(Math.random() * ABJAD.length)]            
        }
        return newName;
    }

    generateDescription() {
        var newDesc = ''
        return newDesc;
    }
}

export class Timeline {
    startYear:number;
    chronology: Array<Episode>
    constructor(startYear:number = 0, events:number) {
        this.startYear = startYear
        this.chronology = []
        for (let i = 0; i < events; i++) {
            this.chronology.push(new Episode(new Date))
        }
    }
}