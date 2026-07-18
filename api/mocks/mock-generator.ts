import { Chance } from 'chance';

class MockGenerator extends Chance {
    constructor() {
        super();
    }

    generatePost() {
        return {
            title: this.word(),
            body: this.sentence({ words: 5 }),
            userId: this.integer({ min: 1, max: 1000 }),
            id: this.integer({ min: 1, max: 10000 })
        }
    }
}


export const mockGenerator = new MockGenerator();