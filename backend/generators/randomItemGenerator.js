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
        for (let i = 0; i < syls; i++) {
            tempName += this.SYLLABLES[this.randBetween(0, this.SYLLABLES.length - 1)]
        }
        return tempName;
    }

    getRandomItem() {

        //determine Rarity
        var rarity = 'error'
        var rarityKey = this.randBetween(0,99)
        if (rarityKey < 50) {
            rarity = 'Junk'
        } else if (rarityKey >= 50 && rarityKey < 75) {
            rarity = 'Stock'
        } else if (rarityKey >= 75 && rarityKey < 87) {
            rarity = 'Perfomance'
        } else if (rarityKey >= 87 && rarityKey < 93 ) {
            rarity = 'Elite'
        } else if (rarityKey >= 93 && rarityKey < 98 ) {
            rarity = 'Master'
        } else if (rarityKey >= 98 && rarityKey < 100 ) {
            rarity = 'Perfect'
        }
        

        //determine Type
        var type = 'error'
        var typeKey = this.randBetween(0,99)
        if (typeKey < 20) {
            var type = 'Chassis'
        } else if (typeKey >=20 && typeKey < 40) {
            var type = 'Arms'
        } else if (typeKey >=20 && typeKey < 60) {
            var type = 'Legs'
        } else if (typeKey >=20 && typeKey < 80) {
            var type = 'Weapon'
        } else if (typeKey >=20 && typeKey < 100) {
            var type = 'Head'
        }

        let tempItem = {
            name: this.getAbjadName(4),
            type: type,
            rarity: rarity,
        }
        return tempItem;
    }
}

module.exports = RandomItemGenerator;