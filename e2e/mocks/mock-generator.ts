import { Chance } from 'chance';

class MockGenerator extends Chance {
    constructor() {
        super();
    }

    generateCheckoutDetails() {
        return {
            firstName: this.first(),
            lastName: this.last(),
            postalCode: this.zip()
        }
    }
}


export const mockGenerator = new MockGenerator();