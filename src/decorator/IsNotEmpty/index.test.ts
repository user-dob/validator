import { IsNotEmpty } from './index';
import { validate } from '../../validate';

class Foo {

    @IsNotEmpty()
    name!: string;

}

describe('IsNotEmpty', () => {

    test('No valid empty string', async () => {
        const foo = new Foo();

        foo.name = '';

        const errors = await validate(foo);

        expect(errors).toHaveProperty('name');
    });

    test('Valid', async () => {
        const foo = new Foo();

        foo.name = '!';

        const errors = await validate(foo);

        expect(errors).toEqual({});
    });

});