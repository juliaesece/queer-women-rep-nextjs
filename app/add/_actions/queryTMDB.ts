"use server";

const addApiKey = (url:string) => (url.concat(`&api_key=${process.env.TMDB_API_KEY}`))

export async function queryTMDB(query: string) {
    const url = addApiKey(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    try {
        const res = await fetch(url, options)

        if (!res.ok) throw new Error("Problem durint TMDB fetch")

        const data = await res.json()

        const found = data.results.slice(0, 3);
        if (!found) {
            throw new Error("Problem durint TMDB fetch")
        }

        return found

    } catch (error) {
        console.error("[queryTMB] Server error")
        console.error(error)
        return []
    }
}


export async function getOneTMDB(media_type: string, id: string) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    try {


        // release_date or first_air_date

        const detailsURL = addApiKey(`https://api.themoviedb.org/3/${media_type}/${id}?append_to_response=credits`)

        const detailsResponse = await fetch(detailsURL, options);

        if (!detailsResponse.ok) throw new Error("Problem durint TMDB fetch")

        const details = await detailsResponse.json()

        return details

    } catch (error) {
        console.error("[queryTMB] Server error")
        console.error(error)
        return {}
    }
}