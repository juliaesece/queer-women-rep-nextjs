import { Couple } from "./types";

type Option = {
    value: string;
    label: string;
}

type NumericOption = {
    value: number;
    label: string;
}

type Concern = {
    key: keyof Pick<Couple['concerns'], 'comingOut' | 'death' | 'cheating'>;
    question: string;
}

type DbConcern = {
    key: string;
    question: string;
}

export const genderOptions: Option[] = [
    { value: 'Woman', label: 'Woman' },
    { value: 'Non-Binary', label: 'Non-Binary' },
    { value: 'Other', label: 'Other' },
];

export const sexualOrientationOptions: Option[] = [
    { value: 'Lesbian', label: 'Lesbian' },
    { value: 'Bisexual', label: 'Bisexual' },
    { value: 'Pansexual', label: 'Pansexual' },
    { value: 'Queer', label: 'Undefined, assumed wlw/queer' },
    { value: 'Other', label: 'Other' },
];

export const genderIdentityOptions: Option[] = [
    { value: 'Cisgender', label: 'Cisgender' },
    { value: 'Trans', label: 'Trans' },
    { value: 'Non-Binary', label: 'Non-Binary' },
    { value: 'Other', label: 'Other' },
];

export const genderExpressionOptions: Option[] = [
    { value: 'Femme', label: 'Femme' },
    { value: 'None', label: 'None/somewhere in between' },
    { value: 'Soft-butch', label: 'Soft-butch' },
    { value: 'Stem', label: 'Stem' },
    { value: 'Butch', label: 'Butch' },
    { value: 'Stud', label: 'Stud' },
    { value: 'Androgynous', label: 'Androgynous' },
    { value: 'Fluid or other', label: 'Fluid/other' },
];

export const lifeStageOptions: Option[] = [
    { value: 'Children', label: 'Children' },
    { value: 'Teenager', label: 'Teenager' },
    { value: 'Young-adult', label: 'Young-adult' },
    { value: 'Adult', label: 'Adult' },
    { value: 'Senior', label: 'Senior' },
    { value: 'undefined', label: 'Not relevant (e.g. fantasy) or unknown' },
];

export const ethnicityOptions: Option[] = [
    { value: 'black', label: 'Black/African American' },
    { value: 'indigenous', label: 'Indigenous' },
    { value: 'white', label: 'White' },
    { value: 'asian', label: 'Asian' },
    { value: 'latinx', label: 'Latinx' },
    { value: 'other', label: 'Other' },
];

export const screenTimeOptions: NumericOption[] = [
    { value: 1, label: 'Less than 10 minutes' },
    { value: 2, label: '10 to 30 minutes' },
    { value: 3, label: '30 minutes to 1 hour' },
    { value: 4, label: '1 hour to 1h30' },
    { value: 5, label: 'More than 1h30' },
];

export const storyImportanceOptions: NumericOption[] = [
    { value: 1, label: 'Primary — it is the main subject of the content' },
    { value: 2, label: 'Secondary — it is not the main subject, but still very important' },
    { value: 3, label: 'Tertiary — it is not important but not unimportant either' },
    { value: 4, label: 'Extras — it is a detail in the story' },
];

export const numberAndHigherOptions: NumericOption[] = [
    { value: 5, label: '5 stars' },
    { value: 4, label: '4 stars or more' },
    { value: 3, label: '3 stars or more' },
    { value: 2, label: '2 stars or more' },
    { value: 1, label: '1 star or more' },
];

export const endingOptions: Option[] = [
    { value: 'Happy', label: 'Happy' },
    { value: 'Bittersweet', label: 'Bittersweet' },
    { value: 'Sad', label: 'Sad' },
    { value: 'Other', label: 'Other' },
];

export const booleanOptions: Option[] = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
];

export const concerns: Concern[] = [
    { key: 'comingOut', question: 'Is coming out a thing in this story?' },
    { key: 'death', question: 'Does someone of the couple die?' },
    { key: 'cheating', question: 'Is there cheating (on a third party)?' },
];

export const searchConcerns: DbConcern[] = [
    { key: 'concerns.comingOut', question: 'Coming out is a big part of the plot in this story:' },
    { key: 'concerns.death', question: 'Someone in the couple dies:' },
    { key: 'concerns.cheating', question: 'There is cheating (on a third party):' },
];

export const homophobiaOptions: NumericOption[] = [
    { value: 1, label: 'None at all' },
    { value: 2, label: 'A little bit' },
    { value: 3, label: 'A solid amount' },
    { value: 4, label: 'A considerable amount' },
    { value: 5, label: 'An unusually high, brutal amount' },
];

export const originTypeOptions: Option[] = [
    { value: 'TV Show', label: 'TV Show' },
    { value: 'Movie', label: 'Movie' },
    { value: 'Videogame', label: 'Videogame' },
    { value: 'Webseries', label: 'Webseries' }
];

export const statusOptions: Option[] = [
    { value: 'Ongoing', label: 'Ongoing' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Uncertain', label: 'Uncertain (might continue, might get cancelled)' },
];