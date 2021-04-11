/**
 * Type of a function with convenience functions.
 */
export type Fun<a, b> = {
    (input: a): b;
    /**
     * Compose a function to be executed after `f`.
     * 
     * Allows easy chaining of functions.
     */
    then: <c>(g: Fun<b, c>) => Fun<a, c>;
}

/**
 * Adds convenience functions to a given function `f`.
 * @summary Constructor for functions of type `Fun<a, b>`.
 * @param f The function to be wrapped. Must take 0 or 1 argument.
 * @returns A new function object containing `f` and the added convenience functions.
 */
export const fun = <a, b>(f: (input: a) => b) : Fun<a, b> =>
    Object.assign<(input: a) => b, Pick<Fun<a, b>, keyof Fun<a, b>>>(
        (input) => f(input), // wrapping f so a 'copy' is created
        {
            then: g => fun(input => g(f(input)))
        }
    );
