export default function parseFilter(unparsedFilter, tag) {

    let filter = {}
    let sort: any = { "dateAdded": -1 }

    switch (unparsedFilter) {
        case "most-liked":
            sort = {"romanticConnection": -1, "chemistry": -1, "globalRating": -1}
            break;
        case "recently-added":
            sort = { "dateAdded": -1 }
            break;
        case "most-recent":
            sort = { "year": -1 }
            break;
        case "more-diverse":
            filter = {
                "$or": [
                    { "people.gender": "Non-Binary" },
                    { "people.genderIdentity": "Trans" },
                    { "people.ethnicity": "black" },
                    { "people.ethnicity": "asian" },
                    { "people.ethnicity": "indigenous" },
                    { "people.ethnicity": "latinx" },
                    { "people.genderExpression": "Butch" }
                ]
            }
            break;
        case "happy-endings":
            filter = { "ending": "Happy" }
            break;
        default:
            break
    }

    if (tag) filter = {...filter, "tags": tag}

    return {sort, filter}
}