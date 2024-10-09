"use server"

import clientPromise from "@/app/lib/mongo"

function transformQuery(query, prefix = '') {
  const transformedQuery = {};
  
  if ('people' in query) {
    transformedQuery["$or"] = [{}, {}];
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === "default") continue;

    if (key === 'people' && typeof value === 'object') {
      // Handle the 'people' object specially
      for (const [peopleKey, peopleValue] of Object.entries(value)) {
        if (peopleValue === "default") continue;
        const newKey1 = `people.0.${peopleKey}`;
        const newKey2 = `people.1.${peopleKey}`;
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


export async function searchCouples(unparsedSearchCouple) {
  console.log("start search")

  let searchCouple = { ...unparsedSearchCouple }
  searchCouple.people = unparsedSearchCouple.person
  delete searchCouple.person

  console.log()
  console.log(searchCouple)
  console.log()

  let filter = transformQuery(searchCouple)
  console.log("filter", filter)


  try {
    const client = await clientPromise
    const database = client.db('couples');
    const collection = database.collection('couples');
    const data = await
      collection
        .find(filter)
        .toArray();

    const logDB = client.db('log');
    const searchLog = logDB.collection('search')
    searchLog.insertOne({ timestamp: new Date(), query: filter, userId: "admin" }) // Don't await?

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log("Server error on couples route")
    console.log(error)
  }
  return ({ error: "There was an error" });
}