export type outOfFive = 0 | 1 | 2 | 3 | 4 | 5 // 0 is for unset
export type outOfFour = 0 | 1 | 2 | 3 | 4

export type Person = {
    name: string,
    gender: string,
    sexualOrientation: string,
    genderIdentity: string,
    genderExpression: string,
    ethnicity: string[],
    nationality: string,
    moreThanOneCountry: boolean,
    secondNationality: string,
    lifeStage: string,
}

export type ShortCouple = {
    _id: string,
    people: Person[],
    origin: string,
    image: string
}

export type Couple = {
    people: Person[],
    origin: string,
    mediaType: string,
    tags: string[],
    year: any,
    status: string,
    mediaDescription: string,
    areThereQueerCreators: boolean,
    image: string,
    altImg: string,
    shortDescription: string,
    longDescription: string,
    screenTime: outOfFive,
    storyImportance: outOfFour,
    globalRating: outOfFive,
    romanticConnection: outOfFive,
    chemistry: outOfFive,
    ending: string,
    concerns: {
        comingOut: boolean,
        death: boolean,
        cheating: boolean,
        homophobia: outOfFive,
    },
    dateAdded: Date,
    _id?: string,
    webseriesLink?: string
}

export type SearchPerson = {
    name?: string,
    gender?: string,
    sexualOrientation?: string,
    genderIdentity?: string,
    genderExpression?: string,
    ethnicity?: string[],
    nationality?: string,
    moreThanOneCountry?: boolean,
    secondNationality?: string,
    lifeStage?: string,
}


export type SearchCouple = {
    person?: SearchPerson,
    origin?: string,
    mediaType?: string,
    year?: number,
    status?: string,
    areThereQueerCreators?: boolean,
    shortDescription?: string,
    screenTime?: outOfFive,
    storyImportance?: outOfFour,
    globalRating?: outOfFive,
    romanticConnection?: outOfFive,
    chemistry?: outOfFive,
    ending?: string,
    concernsComingOut?: boolean,
    concernsDeath?: boolean,
    concernsCheating?: boolean,
    concernsHomophobia?: outOfFive,
    dateAdded?: Date,
    _id?: string
}
