type Option = {
    value: string;
    label: string;
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
