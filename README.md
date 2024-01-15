# Web Doctor

Web Doctor is an online diagnosing tools to check for medical conditions and treatment drugs based on symptoms.

Web Doctor is built with NextJS and deployed on vercel: [medlyves-web-diagnosis.vercel.app](medlyves-web-diagnosis.vercel.app)

## Set Up

clone this github repo and install dependencies
```bash
git clone https://github.com/gohyongjing/medlyves-web-diagnosis
cd medlyves-web-diagnosis
npm install
```

Set up environment variables in a .env file at the root of the project
```
POSTGRES_URL="postgres://xxxxx"
POSTGRES_PRISMA_URL="postgres://xxxxx"
POSTGRES_URL_NON_POOLING="xxxxx"
POSTGRES_USER="default"
POSTGRES_HOST="xxxxx.postgres.vercel-storage.com"
POSTGRES_PASSWORD="xxxxx"
POSTGRES_DATABASE="verceldb"
```

Run the development server:

```bash
npm run dev
```

Run end-to-end tests:

```bash
npm run test
```

Seed the database with medical conditions and symptoms using the csv file in /data

```bash
npm run seed
```

## Design Decisions

### Reducing Latency

* Medical conditions and symptoms are stored as 2 columns in an SQL database. This allows only related conditions and symptoms to be fetched while allowing further scaling when adding more medical conditions and symptoms with minimal increase in latency in the future.
  * This is based on the assumption that each medical condition has a small number of symptoms (< 20), and fetching conditions based on symptoms would not return a large number of rows
* NextJS prefetching is used to allow clients to automatically fetch subsequent pages while the user is still reading the previous page.
* NextJS caching is used to skip database fetching on the server by caching recently requested webpages.
  * This is based on the assumption that the medical conditions and symptoms are static, and does not change often in the database.
* Search bar only fetches the first 20 symptoms per user input, which can be further expanded with the 'show more' button. This reduces latency by reducing the payload size.

### User Experience

#### Streamlined Process

* The diagnosis process is split into multiple pages to streamline the process of finding conditions, selecting conditions, looking through potential diagnosis and finding out related drugs. Each page is kept simple to use for users of all age groups.
  * The user is first greeted by a welcome message that describes the purpose of the website.
  * The user then type in keywords based on their experienced symptoms.
    * The input in matched based on sub strings of the actual symptoms, allowing greater versatility of search (typing 'hand' matches 'cold hands and feet' even though 'hands' is the second word).
    * Selected symptoms appear as pills with a close button for ease of removal (users do not need to  type the symptom again to remove them).
    * Options are hiighlighted in blue on hover for ease of selection.
    * If no symptoms are found based on user's input, a user-friendly 'no results' message is given to the user.
  * The user looks at the list of potential diagnosis
    * Medical conditions with more symptoms experienced by the user appears at the top of the list as they are more liekly to be relevant.
  * The user selects a diagnosis to look at potential drug treatments.
    * If no drug treatments are found, a user-friendly 'not found' message is given to the user, accompanied by alternative advice to consult a doctor.

#### Navgiation

* The user can navigate forward using the next buttons, which all provide immediate feedback (such as a loading message and being greyed out when clicked).
* The Web Doctor logo in the navigation bar allows for quick navigation back to the home apge
* The back button from the conditions page to the symptoms page retains the selected symptoms and can be quickly modified as needed.
