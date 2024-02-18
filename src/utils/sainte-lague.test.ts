import { expect, test } from "vitest";
import { PartyVote, calculateSeat } from "./sainte-lague";

test("Should return array", () => {
    expect(calculateSeat([],1)).toStrictEqual([]);
})

test("Should give A 3 seats, B 2 seats, C 2 seats ", () => {
    const partyVotes: PartyVote[] = [
        {
            name: "A",
            count: 5300
        },
        {
            name: "B",
            count: 2400
        },
        {
            name: "C",
            count: 2300
        }
    ]

    expect(calculateSeat(partyVotes, 7)).toStrictEqual([
        {
            name: "A",
            count: 5300,
            seat: 3
        },
        {
            name: "B",
            count: 2400,
            seat: 2
        },
        {
            name: "C",
            count: 2300,
            seat: 2
        }
    ])
})