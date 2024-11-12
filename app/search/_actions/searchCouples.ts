"use server"

import client from "@/app/lib/mongo"

function transformQuery(query, prefix = '') {
  const transformedQuery = {};

  if ('people' in query) {
    transformedQuery["$or"] = [{}, {}];
  }

  for (let [key, value] of Object.entries(query)) {
    // Parse strings
    if (typeof value === 'string' && ['0', '1', '2', '3', '4', '5'].includes(value)) value = Number(value)

    if (value === "default" || value === 0 || value === "0") continue; // Avoid empty filters

    if (key === 'people' && typeof value === 'object') {
      // Handle the 'people' object specially
      for (const [peopleKey, peopleValue] of Object.entries(value)) {
        if (peopleValue === "default") continue;

        const newKey1 = `people.0.${peopleKey}`;
        const newKey2 = `people.1.${peopleKey}`;

        if (peopleKey === 'ethnicity') { // Handle ethnicity specially because it is an array
          if (peopleValue.length == 0) continue
          transformedQuery["$or"][0][newKey1] = { "$all": peopleValue };
          transformedQuery["$or"][1][newKey2] = { "$all": peopleValue };
          continue
        }

        if (peopleKey === 'nationality') { // Handle ethnicity specially because it is an array
          transformedQuery["$or"][0]["$or"] = [{"people.0.nationality": peopleValue}, {"people.0.secondNationality": peopleValue}];
          transformedQuery["$or"][1]["$or"] = [{"people.1.nationality": peopleValue}, {"people.1.secondNationality": peopleValue}];
          continue
        }

        transformedQuery["$or"][0][newKey1] = peopleValue;
        transformedQuery["$or"][1][newKey2] = peopleValue;
      }
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively transform nested objects
      const nestedTransformed = transformQuery(value, key);
      Object.assign(transformedQuery, nestedTransformed);
    } else {
      // Handle non-object values
      const newKey = prefix ? `${prefix}.${key}` : key;
      transformedQuery[newKey] = value;
    }
  }

  return transformedQuery;
}


export async function searchCouples(unparsedSearchCouple, session) {

  let filter

  if (Object.keys(unparsedSearchCouple).length == 0) {
    filter = {}
  } else {
    let searchCouple = { ...unparsedSearchCouple }
    if ('person' in searchCouple) {
      searchCouple.people = unparsedSearchCouple.person
      delete searchCouple.person
    }

    filter = transformQuery(searchCouple)
  }

  try {

    const database = client.db('couples');
    const collection = database.collection('couples');
    const data = await
      collection
        .find(filter)
        .toArray();

    const logDB = client.db('log');
    const searchLog = logDB.collection('search')
    searchLog.insertOne({ timestamp: new Date(), query: filter, userId: session ? session.user.id : null, username: session ? session.user.username : "no-user" }) // Don't await?

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("[searchCouples] Server error on couples route")
    console.error(error)
  }
  return ({ error: "There was an error" });
}