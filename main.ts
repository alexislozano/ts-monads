import { UnreachableCaseError } from "./errors";
import { Maybe } from "./maybe";
import { Result } from "./result";

type Gender = "M" | "F" | "Other";

type User = {
    id: string;
    username: string;
    gender: Maybe<Gender>;
    email: Maybe<string>;
};

type UserRepository = {
    findById: (id: string) => Result<User, "no_user_found">;
    findAll: () => User[];
};

function getUserGender(user: User): Result<Gender, "no_gender_defined"> {
    const { gender } = user;
    if (Maybe.isSome(gender)) { return Result.ok(Maybe.unwrap(gender)); }
    if (Maybe.isNone(gender)) { return Result.err("no_gender_defined"); }
    throw new UnreachableCaseError(gender);
}

export function fetchUserGender(repo: UserRepository, id: string): Result<Gender, "no_gender_defined" | "no_user_found"> {
    const user = repo.findById(id);
    return Result.bind(user, getUserGender);
}

type GenderAndEmail = {
    gender: Gender;
    email: string;
};

function getUserGenderAndEmail(user: User): Result<GenderAndEmail, "no_gender_defined" | "no_email_defined"> {
    const { gender, email } = user;
    if (Maybe.isNone(gender)) { return Result.err("no_gender_defined"); }
    if (Maybe.isNone(email)) { return Result.err("no_email_defined"); }
    return Result.ok({
        gender: Maybe.unwrap(gender),
        email: Maybe.unwrap(email)
    });
}

export function fetchUserGenderAndEmail(repo: UserRepository, id: string): Result<GenderAndEmail, "no_gender_defined" | "no_email_defined" | "no_user_found"> {
    const user = repo.findById(id);
    return Result.bind(user, getUserGenderAndEmail);
}
