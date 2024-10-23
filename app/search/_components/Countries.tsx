import { useState } from 'react';
import styles from "./Form.module.css";
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function Countries({ name, number, handleChange }: { name: string, number: number, handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void }) {
    // const { couple, setCouple } = useState({})
    // const [inputValue, setInputValue] = useState("")

    let question = "";
    if (name === "nationality") {
        question = "Which country are they from?"
    } else {
        question = "Which is their second country?"
    }

    const countries = [
        { label: "Doesn't apply (fantasy, etc.)", id: 1 },
        { label: "Afghanistan", id: 2 },
        { label: "Albania", id: 3 },
        { label: "Algeria", id: 4 },
        { label: "American Samoa", id: 5 },
        { label: "Andorra", id: 6 },
        { label: "Angola", id: 7 },
        { label: "Anguilla", id: 8 },
        { label: "Antigua & Barbuda", id: 9 },
        { label: "Argentina", id: 10 },
        { label: "Armenia", id: 11 },
        { label: "Aruba", id: 12 },
        { label: "Australia", id: 13 },
        { label: "Austria", id: 14 },
        { label: "Azerbaijan", id: 15 },
        { label: "Bahamas", id: 16 },
        { label: "Bahrain", id: 17 },
        { label: "Bangladesh", id: 18 },
        { label: "Barbados", id: 19 },
        { label: "Belarus", id: 20 },
        { label: "Belgium", id: 21 },
        { label: "Belize", id: 22 },
        { label: "Benin", id: 23 },
        { label: "Bermuda", id: 24 },
        { label: "Bhutan", id: 25 },
        { label: "Bolivia", id: 26 },
        { label: "Bonaire", id: 27 },
        { label: "Bosnia & Herzegovina", id: 28 },
        { label: "Botswana", id: 29 },
        { label: "Brazil", id: 30 },
        { label: "British Indian Ocean Ter", id: 31 },
        { label: "Brunei", id: 32 },
        { label: "Bulgaria", id: 33 },
        { label: "Burkina Faso", id: 34 },
        { label: "Burundi", id: 35 },
        { label: "Cambodia", id: 36 },
        { label: "Cameroon", id: 37 },
        { label: "Canada", id: 38 },
        { label: "Canary Islands", id: 39 },
        { label: "Cape Verde", id: 40 },
        { label: "Cayman Islands", id: 41 },
        { label: "Central African Republic", id: 42 },
        { label: "Chad", id: 43 },
        { label: "Channel Islands", id: 44 },
        { label: "Chile", id: 45 },
        { label: "China", id: 46 },
        { label: "Christmas Island", id: 47 },
        { label: "Cocos Island", id: 48 },
        { label: "Colombia", id: 49 },
        { label: "Comoros", id: 50 },
        { label: "Congo", id: 51 },
        { label: "Cook Islands", id: 52 },
        { label: "Costa Rica", id: 53 },
        { label: "Cote DIvoire", id: 54 },
        { label: "Croatia", id: 55 },
        { label: "Cuba", id: 56 },
        { label: "Curacao", id: 57 },
        { label: "Cyprus", id: 58 },
        { label: "Czech Republic", id: 59 },
        { label: "Denmark", id: 60 },
        { label: "Djibouti", id: 61 },
        { label: "Dominica", id: 62 },
        { label: "Dominican Republic", id: 63 },
        { label: "East Timor", id: 64 },
        { label: "Ecuador", id: 65 },
        { label: "Egypt", id: 66 },
        { label: "El Salvador", id: 67 },
        { label: "Equatorial Guinea", id: 68 },
        { label: "Eritrea", id: 69 },
        { label: "Estonia", id: 70 },
        { label: "Ethiopia", id: 71 },
        { label: "Falkland Islands", id: 72 },
        { label: "Faroe Islands", id: 73 },
        { label: "Fiji", id: 74 },
        { label: "Finland", id: 75 },
        { label: "France", id: 76 },
        { label: "French Guiana", id: 77 },
        { label: "French Polynesia", id: 78 },
        { label: "French Southern Ter", id: 79 },
        { label: "Gabon", id: 80 },
        { label: "Gambia", id: 81 },
        { label: "Georgia", id: 82 },
        { label: "Germany", id: 83 },
        { label: "Ghana", id: 84 },
        { label: "Gibraltar", id: 85 },
        { label: "Great Britain", id: 86 },
        { label: "Greece", id: 87 },
        { label: "Greenland", id: 88 },
        { label: "Grenada", id: 89 },
        { label: "Guadeloupe", id: 90 },
        { label: "Guam", id: 91 },
        { label: "Guatemala", id: 92 },
        { label: "Guinea", id: 93 },
        { label: "Guyana", id: 94 },
        { label: "Haiti", id: 95 },
        { label: "Hawaii", id: 96 },
        { label: "Honduras", id: 97 },
        { label: "Hong Kong", id: 98 },
        { label: "Hungary", id: 99 },
        { label: "Iceland", id: 100 },
        { label: "Indonesia", id: 101 },
        { label: "India", id: 102 },
        { label: "Iran", id: 103 },
        { label: "Iraq", id: 104 },
        { label: "Ireland", id: 105 },
        { label: "Isle of Man", id: 106 },
        { label: "Israel", id: 107 },
        { label: "Italy", id: 108 },
        { label: "Jamaica", id: 109 },
        { label: "Japan", id: 110 },
        { label: "Jordan", id: 111 },
        { label: "Kazakhstan", id: 112 },
        { label: "Kenya", id: 113 },
        { label: "Kiribati", id: 114 },
        { label: "Korea North", id: 115 },
        { label: "Korea South", id: 116 },
        { label: "Kuwait", id: 117 },
        { label: "Kyrgyzstan", id: 118 },
        { label: "Laos", id: 119 },
        { label: "Latvia", id: 120 },
        { label: "Lebanon", id: 121 },
        { label: "Lesotho", id: 122 },
        { label: "Liberia", id: 123 },
        { label: "Libya", id: 124 },
        { label: "Liechtenstein", id: 125 },
        { label: "Lithuania", id: 126 },
        { label: "Luxembourg", id: 127 },
        { label: "Macau", id: 128 },
        { label: "Macedonia", id: 129 },
        { label: "Madagascar", id: 130 },
        { label: "Malaysia", id: 131 },
        { label: "Malawi", id: 132 },
        { label: "Maldives", id: 133 },
        { label: "Mali", id: 134 },
        { label: "Malta", id: 135 },
        { label: "Marshall Islands", id: 136 },
        { label: "Martinique", id: 137 },
        { label: "Mauritania", id: 138 },
        { label: "Mauritius", id: 139 },
        { label: "Mayotte", id: 140 },
        { label: "Mexico", id: 141 },
        { label: "Midway Islands", id: 142 },
        { label: "Moldova", id: 143 },
        { label: "Monaco", id: 144 },
        { label: "Mongolia", id: 145 },
        { label: "Montserrat", id: 146 },
        { label: "Morocco", id: 147 },
        { label: "Mozambique", id: 148 },
        { label: "Myanmar", id: 149 },
        { label: "Nambia", id: 150 },
        { label: "Nauru", id: 151 },
        { label: "Nepal", id: 152 },
        { label: "Netherland Antilles", id: 153 },
        { label: "Netherlands (Holland, Europe)", id: 154 },
        { label: "Nevis", id: 155 },
        { label: "New Caledonia", id: 156 },
        { label: "New Zealand", id: 157 },
        { label: "Nicaragua", id: 158 },
        { label: "Niger", id: 159 },
        { label: "Nigeria", id: 160 },
        { label: "Niue", id: 161 },
        { label: "Norfolk Island", id: 162 },
        { label: "Norway", id: 163 },
        { label: "Oman", id: 164 },
        { label: "Pakistan", id: 165 },
        { label: "Palau Island", id: 166 },
        { label: "Palestine", id: 167 },
        { label: "Panama", id: 168 },
        { label: "Papua New Guinea", id: 169 },
        { label: "Paraguay", id: 170 },
        { label: "Peru", id: 171 },
        { label: "Philippines", id: 172 },
        { label: "Pitcairn Island", id: 173 },
        { label: "Poland", id: 174 },
        { label: "Portugal", id: 175 },
        { label: "Puerto Rico", id: 176 },
        { label: "Qatar", id: 177 },
        { label: "Republic of Montenegro", id: 178 },
        { label: "Republic of Serbia", id: 179 },
        { label: "Reunion", id: 180 },
        { label: "Romania", id: 181 },
        { label: "Russia", id: 182 },
        { label: "Rwanda", id: 183 },
        { label: "St Barthelemy", id: 184 },
        { label: "St Eustatius", id: 185 },
        { label: "St Helena", id: 186 },
        { label: "St Kitts-Nevis", id: 187 },
        { label: "St Lucia", id: 188 },
        { label: "St Maarten", id: 189 },
        { label: "St Pierre & Miquelon", id: 190 },
        { label: "St Vincent & Grenadines", id: 191 },
        { label: "Saipan", id: 192 },
        { label: "Samoa", id: 193 },
        { label: "Samoa American", id: 194 },
        { label: "San Marino", id: 195 },
        { label: "Sao Tome & Principe", id: 196 },
        { label: "Saudi Arabia", id: 197 },
        { label: "Senegal", id: 198 },
        { label: "Seychelles", id: 199 },
        { label: "Sierra Leone", id: 200 },
        { label: "Singapore", id: 201 },
        { label: "Slovakia", id: 202 },
        { label: "Slovenia", id: 203 },
        { label: "Solomon Islands", id: 204 },
        { label: "Somalia", id: 205 },
        { label: "South Africa", id: 206 },
        { label: "Spain", id: 207 },
        { label: "Sri Lanka", id: 208 },
        { label: "Sudan", id: 209 },
        { label: "Suriname", id: 210 },
        { label: "Swaziland", id: 211 },
        { label: "Sweden", id: 212 },
        { label: "Switzerland", id: 213 },
        { label: "Syria", id: 214 },
        { label: "Tahiti", id: 215 },
        { label: "Taiwan", id: 216 },
        { label: "Tajikistan", id: 217 },
        { label: "Tanzania", id: 218 },
        { label: "Thailand", id: 219 },
        { label: "Togo", id: 220 },
        { label: "Tokelau", id: 221 },
        { label: "Tonga", id: 222 },
        { label: "Trinidad & Tobago", id: 223 },
        { label: "Tunisia", id: 224 },
        { label: "Turkey", id: 225 },
        { label: "Turkmenistan", id: 226 },
        { label: "Turks & Caicos Is", id: 227 },
        { label: "Tuvalu", id: 228 },
        { label: "Uganda", id: 229 },
        { label: "United Kingdom", id: 230 },
        { label: "Ukraine", id: 231 },
        { label: "United Arab Emirates", id: 232 },
        { label: "United States of America", id: 233 },
        { label: "Uruguay", id: 234 },
        { label: "Uzbekistan", id: 235 },
        { label: "Vanuatu", id: 236 },
        { label: "Vatican City State", id: 237 },
        { label: "Venezuela", id: 238 },
        { label: "Vietnam", id: 239 },
        { label: "Virgin Islands (Brit)", id: 240 },
        { label: "Virgin Islands (USA)", id: 241 },
        { label: "Wake Island", id: 242 },
        { label: "Wallis & Futana Is", id: 243 },
        { label: "Yemen", id: 244 },
        { label: "Zaire", id: 245 },
        { label: "Zambia", id: 246 },
        { label: "Zimbabwe", id: 247 }
    ];

    return (<></>)

    // return (
    //     <>
    //         <label className={styles.label} htmlFor={name}> {question} </label>
    //         <Autocomplete
    //             disablePortal
    //             options={countries}
    //             value={couple.people[0][name]}
    //             onChange={(event: any, newValue: any) => {
    //                 setCouple(prevCouple => ({
    //                     ...prevCouple,
    //                     people: prevCouple.people.map((person, index) =>
    //                         index === 0 ? { ...person, [name]: newValue?.label ? newValue.label : "" } : person
    //                     )
    //                 }))
    //             }
    //             }
    //             inputValue={inputValue}
    //             onInputChange={(event, newInputValue) => {
    //                 setInputValue(newInputValue);
    //             }}
    //             renderInput={(params) => <TextField {...params} label="Country" name={name} />}
    //         />

    //     </>
    // );
}


