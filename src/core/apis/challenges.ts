import { Challenge, FetchChallengeOptions } from "../interfaces/data";
import { SAMPLE_CHALLENGES } from "../utils/variables";

export function fetchChallenges(opts: FetchChallengeOptions): Promise<Challenge[]> {
    return new Promise((resolve, reject) => {
        try {
            let chs = SAMPLE_CHALLENGES.slice(0, opts.quantity)

            // if no filters, resolve the basic
            if (opts.filters.length === 0) resolve(chs)

            // todo
            // if there are filters,
            // filter the items by the fiters
            // in future, when db is present,
            // change this to just fetch from the db accordingly


            // here we filter only by cost.
            // when db is connected, do as above.
            chs = chs.filter((item, index) => {
                let state = true
                opts.filters.forEach((filter, f_index) => {
                    if (filter.pid === "cost") {
                        if (filter.from) {
                            state = item.cost >= filter.from && state
                        }
                        if (filter.to) {
                            state = item.cost <= filter.to && state
                        }
                    }
                })
                return state
            })

            resolve(chs)
        } catch (error) {
            reject(error)
        }
    })
}

export function fetchChallenge(cid: string): Promise<Challenge> {
    return new Promise((resolve, reject) => {
        try {

            // find the challenge with id from the database.
            // currently our database is just and array
            let ch = SAMPLE_CHALLENGES.filter((ch) => ch.id === cid)
            if (ch.length === 0) throw new Error(`Challenge with id <${cid}> not found`);
            resolve(ch[0])
        } catch (error) {
            reject(error)
        }
    })
}

export function deleteChallenge(cid: string): Promise<Challenge> {
    return new Promise((resolve, reject) => {

        try {

            // when the db is connected, challange will be deleted directly from there

            let chs = SAMPLE_CHALLENGES.filter((c) => c.id === cid)

            if (chs.length === 0) throw new Error(`Challenge with id <${cid}> does not exist`)

            // delete this challenge from all required pools.
            resolve(chs[0])

        } catch (error) {
            reject(error)
        }
    })
}