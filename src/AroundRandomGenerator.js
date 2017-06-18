const randomEnglishWords = [
    "balance",
    "point",
    "space",
    "stew",
    "egg",
    "van",
    "match",
    "quiet",
    "cup",
    "pass",
    "pretty",
    "gifted",
    "mushy",
    "train",
    "voyage",
    "bright",
    "press",
    "birds",
    "obey",
    "visitor",
    "ethereal",
    "trust",
    "plane",
    "multiply",
    "rain",
    "fish",
    "rabid",
    "imperfect",
    "cars",
    "argue",
    "short",
    "zoo",
    "record",
    "capricious",
    "scintillating",
    "show",
    "suggestion",
    "education",
    "previous",
    "verse"
];

const randomBetween = (start, end) => {
    return Math.floor(Math.random() * end) + start;
}

const pickRandomWord = () => {
    return randomEnglishWords[randomBetween(1, randomEnglishWords.length - 1)];
}

const randomId = () => {
    return Math.ceil(Math.random()*100000).toString();
};

const generateRandomLocation = (latLongLocation, radius) => {
    const x0 = latLongLocation.lng;
    const y0 = latLongLocation.lat;
    const rand1 = Math.random();
    const rand2 = Math.random();
    const w = radius * Math.sqrt(rand1);
    const t = 2 * Math.PI * rand2;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
    const xd = x / Math.cos(y0);
    return {
        lng: xd + x0,
        lat: y + y0
    };
}

const generateAround = (latLongLocation) => {
    return {
        messageBody: pickRandomWord() + " " + pickRandomWord() + " " + pickRandomWord(), 
        date: new Date(), 
        id: randomId(),
        location: generateRandomLocation(latLongLocation, 0.01)
    };
}

export default generateAround;