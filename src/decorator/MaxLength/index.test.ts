import { MaxLength } from './index';
import { validate } from '../../validate';

class Foo {

    @MaxLength(4)
    name!: string;

}

describe('MaxLength', () => {

    test('No valid string', async () => {
        const foo = new Foo();

        foo.name = '!!!!!';

        const errors = await validate(foo);

        expect(errors).toHaveProperty('name');
    });

    test('Valid', async () => {
        const foo = new Foo();

        foo.name = '!!!!';

        const errors = await validate(foo);

        expect(errors).toEqual({});
    });

});