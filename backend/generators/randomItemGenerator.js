class RandomItemGenerator {
    constructor() {
        this.VOWELS = 'aeiou'.split('');
        this.CONSONANTS = 'bcdfghjklmnpqrstvwxyz'.split('');
        this.SYLLABLES = []
        for (let i = 0; i < this.VOWELS.length; i++) {
            for (let j = 0; j < this.VOWELS.length; j++) {
                this.SYLLABLES.push(this.CONSONANTS[j] + this.VOWELS[i])
            }       
        }
    }

    randBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    getAbjadName(syls) {
        let tempName = ''
        for (let i = 0; i < syls.length; i++) {
            tempName += this.SYLLABLES[this.randBetween(0, this.SYLLABLES.length - 1)]
        }
        return tempName;
    }

    getRandomItem() {

        //determine Type
        

        //determine Rarity



        let tempItem = {
            name: this.getAbjadName(4)
        }
        return tempItem;
    }
}

module.exports = RandomItemGenerator;