export type PartyVote = {
    name: string;
    count: number;
    seat?: number;
}

export function calculateSeat(votes: PartyVote[], seat: number): PartyVote[] {
    let lague: {[key: string]: PartyVote} = {};

    votes.forEach((party) => {
        lague[party.name] = {
            ...party,
            seat: 0
        }
    })

    for (let i = 0; i < seat; i++) {
        let leaderBoard: PartyVote[] = [];

        for (const key in lague) {
            if (Object.prototype.hasOwnProperty.call(lague, key)) {
                const party = lague[key];
                let currentSeat = party.seat ? party.seat : 0;
                let count = party.count / (2 * currentSeat + 1);
                leaderBoard.push({
                    ...party,
                    count
                })
            }
        }

        leaderBoard.sort((a,b) => b.count - a.count);

        if (leaderBoard.length > 0) {
            let lead = leaderBoard[0];
            lague[lead.name].seat = (lague[lead.name].seat ?? 0) + 1;
        }

    }

    let result = [];

    for (const key in lague) {
        if (Object.prototype.hasOwnProperty.call(lague, key)) {
            const element = lague[key];
            result.push(element)
        }
    }

    return result;
}