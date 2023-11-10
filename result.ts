type Ok<T> = { raw: T, _type: "ok" };
type Err<E> = { raw: E, _type: "err" };

export type Result<T, E> =
    | Ok<T>
    | Err<E>;

export module Result {
    export function ok<T, E>(raw: T): Result<T, E> {
        return { raw, _type: "ok" };
    }

    export function err<T, E>(raw: E): Result<T, E> {
        return { raw, _type: "err" };
    }

    export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
        return result._type === "ok";
    }

    export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
        return result._type === "err";
    }

    export function map<T, U, E>(result: Result<T, E>, f: (_: T) => U): Result<U, E> {
        switch (result._type) {
            case "ok": return ok(f(result.raw));
            case "err": return result;
        }
    }

    export function bind<T, U, E, F>(result: Result<T, E>, f: (_: T) => Result<U, F>): Result<U, E | F> {
        switch (result._type) {
            case "ok": return f(result.raw);
            case "err": return result;
        }
    }

    export function unwrap<T>(ok: Ok<T>): T {
        return ok.raw;
    }

    export function unwrapErr<E>(err: Err<E>): E {
        return err.raw;
    }
}
