import { UnreachableCaseError } from "./errors";
import { Result } from "./result";

// lib

function divide(a: number, b: number): Result<number, "division_by_zero"> {
    if (b === 0) { return Result.err("division_by_zero"); }
    return Result.ok(a / b);
}

function compute(a: number, b: number, operand: string): Result<number, "division_by_zero" | "operand_does_not_exist"> {
    if (operand !== "/") { return Result.err("operand_does_not_exist"); }
    return divide(40, b);
}

// controller

function compute40(b: number, operand: string): number {
    const result = compute(40, b, operand);

    if (Result.isOk(result)) { return Result.unwrap(result); }
    
    const err = Result.unwrapErr(result);
    switch (err) {
        case "division_by_zero": throw new Error(err); // BadRequestError(result.message)
        case "operand_does_not_exist": throw new Error(err); // NotFoundError(result.message)
        default: throw new UnreachableCaseError(err);
    }
}

// main for testing

console.log(compute40(10, "/"));
