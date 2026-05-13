import { MetadataRoute } from 'next'
import { getAllCouples, getUniqueNationalities } from '@/app/utils/sitemapActions'
import { ethnicityOptions } from '@/app/utils/couplesOptions'

const BASE_URL = 'https://everythingsapphic.com'

const orientations = ['Lesbian', 'Bisexual', 'Pansexual']
const mediaTypes = ['Movie', 'TV Show', 'Videogame', 'Webseries']
const genderIdentities = ['Trans', 'Non-Binary']
const nationalities = await getUniqueNationalities()
const ethnicities = ethnicityOptions
    .filter(e => e.value !== 'other')
    .map(e => e.value)

const encodePerson = (personObj) => {
    const parts = Object.entries(personObj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join('%2C') : v}`)
        .join('&')
    return encodeURIComponent(parts)
}

const buildUrl = (base: any, { person, ...rest }: any = {}): string => {
    const urlParams = new URLSearchParams()
    Object.entries(rest)
        .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
        .forEach(([k, v]) => urlParams.set(k, v))

    const restQuery = urlParams.toString()
    const personQuery = person ? `person=${encodePerson(person)}` : ''

    const query = [personQuery, restQuery].filter(Boolean).join('&amp;')
    return `${base}/search?${query}`
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/search`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/tv-shows`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/movies`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/books`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/add`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        }
    ]
    const entries = []

    // orientation alone
    orientations.forEach(orientation => {
        entries.push({
            url: buildUrl(BASE_URL, { person: { sexualOrientation: orientation } }),
            changeFrequency: 'weekly',
            priority: 0.8
        })

        // orientation + mediaType
        mediaTypes.forEach(mediaType => {
            entries.push({
                url: buildUrl(BASE_URL, { person: { sexualOrientation: orientation }, mediaType }),
                changeFrequency: 'weekly',
                priority: 0.7
            })
        })

        // orientation + happy ending
        entries.push({
            url: buildUrl(BASE_URL, { person: { sexualOrientation: orientation }, ending: 'Happy' }),
            changeFrequency: 'weekly',
            priority: 0.7
        })

        // orientation + no death
        entries.push({
            url: buildUrl(BASE_URL, { person: { sexualOrientation: orientation }, 'concerns.death': 'false' }),
            changeFrequency: 'weekly',
            priority: 0.7
        })

        // orientation + nationality
        nationalities.forEach(nationality => {
            entries.push({
                url: buildUrl(BASE_URL, { person: { sexualOrientation: orientation, nationality } }),
                changeFrequency: 'weekly',
                priority: 0.6
            })
        })

        // orientation + ethnicity
        ethnicities.forEach(ethnicity => {
            entries.push({
                url: buildUrl(BASE_URL, { person: { sexualOrientation: orientation, ethnicity } }),
                changeFrequency: 'weekly',
                priority: 0.6
            })
        })
    })

    // genderIdentity alone + combos
    genderIdentities.forEach(genderIdentity => {
        entries.push({
            url: buildUrl(BASE_URL, { person: { genderIdentity } }),
            changeFrequency: 'weekly',
            priority: 0.7
        })

        mediaTypes.forEach(mediaType => {
            entries.push({
                url: buildUrl(BASE_URL, { person: { genderIdentity }, mediaType }),
                changeFrequency: 'weekly',
                priority: 0.6
            })
        })

        entries.push({
            url: buildUrl(BASE_URL, { person: { genderIdentity }, 'concerns.death': 'false' }),
            changeFrequency: 'weekly',
            priority: 0.6
        })
    })

    // mediaType alone
    mediaTypes.forEach(mediaType => {
        entries.push({
            url: buildUrl(BASE_URL, { mediaType }),
            changeFrequency: 'weekly',
            priority: 0.6
        })
    })

    // nationality alone
    nationalities.forEach(nationality => {
        entries.push({
            url: buildUrl(BASE_URL, { person: { nationality } }),
            changeFrequency: 'weekly',
            priority: 0.5
        })
    })

    // ethnicity alone
    ethnicities.forEach(ethnicity => {
        entries.push({
            url: buildUrl(BASE_URL, { person: { ethnicity } }),
            changeFrequency: 'weekly',
            priority: 0.5
        })
    })


    try {
        // Fetch dynamic blog posts
        const couples = await getAllCouples()

        const couplePages: MetadataRoute.Sitemap = couples.map((couple) => ({
            url: `${BASE_URL}/info/${couple._id}`,
            lastModified: new Date(couple.dateAdded),
            changeFrequency: 'yearly',
            priority: 0.6,
        }))


        // Combine all pages
        return [...staticPages, ...couplePages, ...entries]

    } catch (error) {
        console.error('Error generating sitemap:', error)
        // Return static pages if dynamic content fails
        return staticPages
    }
}