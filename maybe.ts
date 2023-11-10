type Some<T> = { raw: T, _type: "some" };
type None = { _type: "none" };

export type Maybe<T> =
    | Some<T>
    | None;

export module Maybe {
    export function some<T>(raw: T): Maybe<T> {
        return { raw, _type: "some" };
    }

    export function none<T>(): Maybe<T> {
        return { _type: "none" };
    }

    export function isSome<T>(maybe: Maybe<T>): maybe is Some<T> {
        return maybe._type === "some";
    }

    export function isNone<T>(maybe: Maybe<T>): maybe is None {
        return maybe._type === "none";
    }

    export function map<T, U>(maybe: Maybe<T>, f: (_: T) => U): Maybe<U> {
        switch (maybe._type) {
            case "some": return some(f(maybe.raw));
            case "none": return maybe;
        }
    }

    export function bind<T, U>(maybe: Maybe<T>, f: (_: T) => Maybe<U>): Maybe<U> {
        switch (maybe._type) {
            case "some": return f(maybe.raw);
            case "none": return maybe;
        }
    }

    export function unwrap<T>(some: Some<T>): T {
        return some.raw;
    }
}
