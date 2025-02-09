/**
 * @jest-environment jsdom
 */



// Now import the module
import { handleSubmit } from '../src/client/ts/formHandler'

describe('Testing the submit functionality', () => {
    test('Testing the handleSubmit() function', () => {
        expect(handleSubmit).toBeDefined();
    });
});