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

export type Couple = {
    people: Person[],
    origin: string,
    originType: string,
    year: number,
    status: string,
    description: string,
    isThereQueerCreators: boolean,
    queerDirectors: boolean,
    image: string,
    altImg: string,
    coupleDescription: string,
    coupleDescriptionIsSpoiler: boolean,
    screenTime: outOfFive,
    storyImportance: outOfFour,
    globalRating: outOfFive,
    romanticConnection: outOfFive,
    chemistry: outOfFive,
    ending: string,
    concernsComingOut: boolean,
    concernsDeath: boolean,
    concernsCheating: boolean,
    concernsHomophobia: outOfFive,
    dateAdded: Date,
    _id?: string
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
    originType?: string,
    year?: number,
    status?: string,
    description?: string,
    isThereQueerCreators?: boolean,
    queerDirectors?: boolean,
    image?: string,
    altImg?: string,
    coupleDescription?: string,
    coupleDescriptionIsSpoiler?: boolean,
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
