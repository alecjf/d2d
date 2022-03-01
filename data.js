const paliWords = {
  ajiva: "livelihood",
  attavadupadana: "self-doctrine clinging",
  dana: "generosity or charity",
  "dhamma vicaya": "investigation",
  ditthi: "understanding",
  ditthupadana: "wrong-view clinging",
  dukkha: "unsatisfactoriness",
  dvesa: "anger",
  jhana: "meditative absorption",
  kamacchanda: "sensory desire",
  kammanta: "action",
  kamupadana: "sense-pleasure clinging",
  ksanti: "patience",
  maggha: "noble path",
  moha: "ignorance",
  paramita: "virtue",
  passaddhi: "tranquility",
  piti: "joy or rapture",
  prajna: "wisdom",
  raga: "greed or attachment",
  rupa: "form or matter",
  samadhi: "concentration",
  samjna: "perceptions",
  samskara: "mental formations or volition",
  sankappa: "thought",
  sati: "mindfulness",
  sila: "ethical conduct",
  silabbatupadana: "rites-and-rituals clinging",
  skandha: "aggregate",
  tanha: "craving or thirst",
  "thina-middha": "sloth-and-torpor",
  "uddhacca-kukkucca": "restlessness and worry",
  upadana: "clinging or fuel",
  uppekha: "equanimity",
  vaca: "speech",
  vayama: "effort",
  vedana: "feelings or sensations",
  vicikiccha: "doubt",
  vijnana: "consciousness",
  viriya: "energy or determination",
  vyapada: "ill-will",
};

const dharmaLists = {
  "Eightfold Path": {
    definition: "This is the way to the ending of suffering.",
    pali: ["maggha"],
    parts: {
      "wisdom group": ["right understanding", "right thought"],
      "morality group": ["right speech", "right action", "right livelihood"],
      "meditation group": [
        "right effort",
        "right mindfulness",
        "right concentration",
      ],
    },
  },
  "Five Precepts": {
    definition:
      "Standards for lay Buddhists to live an ethical life in pursuit of enlightenment.",
    parts: [
      "no killing",
      "no stealing",
      "no sexual misconduct",
      "no lying",
      "no taking intoxicants",
    ],
  },
  "Ten Wholesome Conducts": {
    definition:
      "These levels of action are grouped into those of the body, speech, and mind.",
    parts: {
      body: ["no killing", "no stealing", "no sexual misconduct"],
      speech: [
        "no lying",
        "no frivolous speech",
        "no harsh words",
        "no idle chatter",
      ],
      mind: ["no craving or lusting", "no anger", "no wrong views"],
    },
  },
  "Six Virtues": {
    definition:
      "These are ideal qualities of Mahayana Buddhists (Theravada has 10 qualities).",
    pali: ["paramita"],
    parts: {
      pali: ["dana", "sila", "ksanti", "viriya", "jhana", "prajna"],
    },
  },
  "Five Aggregates": {
    definition:
      "Temporary conditioned phenomena that create the illusion of self.",
    pali: ["skandha"],
    parts: {
      pali: ["rupa", "vedana", "samjna", "samskara", "vijnana"],
    },
  },
  "Three Poisons": {
    definition: "The source of all unskillful actions.",
    parts: {
      pali: ["raga", "dvesa", "moha"],
    },
  },
  "Four Attachments": {
    definition: "These are the attachments which lead to unsatisfactoriness.",
    pali: ["upadana"],
    parts: {
      pali: ["attavadupadana", "ditthupadana", "silabbatupadana", "kamupadana"],
    },
  },
  "Six Internal and External Spheres of Sense": {
    definition:
      "Experiences, either pleasant, unpleasant or neutral, comes through these portals.",
    parts: {
      bodyparts: {
        eye: "seeing",
        ear: "hearing",
        nose: "smelling",
        tongue: "tasting",
        body: "touching",
        mind: "thoughts",
      },
    },
  },
  "Six Realms of Existence": {
    definition:
      "Analogies for conditioned experiences within samsara where beings are reborn.",
    parts: {
      "higher experiences": ["heaven", "asura", "human"],
      "lower experiences": ["animal", "hungry ghost", "hell"],
    },
  },
  "Five Hinderances": {
    definition: "Obstacles to meditative absorption.",
    parts: {
      pali: [
        "kamacchanda",
        "vyapada",
        "thina-middha",
        "uddhacca-kukkucca",
        "vicikiccha",
      ],
    },
  },
  "Seven Constituents of Awakening": {
    definition: "NEEDS DEFINITION",
    parts: {
      pali: [
        "sati",
        "dhamma vicaya",
        "viriya",
        "piti",
        "passaddhi",
        "samadhi",
        "uppekha",
      ],
    },
  },
  "Four Meditative Absorptions": {
    definition: "Evolving states of meditation.",
    pali: ["jhana"],
    parts: [
      "aloof from sense desires and unwholesome thoughts, resulting in applied and sustained thought, joy and bliss.",
      "replacing applied and sustained thought with single-pointedness of mind, tranquility, joy and bliss.",
      "replacing mental joy with equanimity, mindfulness and bodily bliss.",
      "beyond joy and bliss, suffering, and sorrow: total equanimity and mindfulness.",
    ],
    isOrdered: true,
    suttas: [
      {
        title: "Jhana Sutta",
        section: "Anguttara Nikaya",
        verse: 9.36,
        link: "https://google.com",
      },
    ],
  },
};

const makeListDisplay = (key) => {
  return {
    name: key,
    parts: [dharmaLists[key]],
  };
};

const fourNobleTruths = {
  name: "Four Noble Truths",
  parts: [
    {
      definition: "The truth of suffering.",
      pali: ["dukkha"],
      concatenate: true,
      parts: [
        "birth",
        "aging",
        "death",
        "bodily pain",
        "mental pain",
        "despair",
        "unfulfilled desires",
        makeListDisplay("Five Aggregates"),
      ],
    },
    {
      definition: "The truth of the arising of suffering.",
      parts: [
        {
          definition: "desire or greed",
          pali: ["tanha"],
          concatenate: true,
          parts: ["sense pleasures", "existence", "non-existence"],
        },
      ],
    },
    {
      definition: "The truth of the cessation of suffering",
      parts: ["detaching from craving, desire and greed"],
    },
    {
      definition:
        "The truth of the path leading to the cessation of suffering.",
      parts: ["This Noble Eightfold Path"],
    },
  ],
};

const specificMentalObjects = {
  name: "Specific Mental Objects",
  parts: [
    makeListDisplay("Five Hinderances"),
    makeListDisplay("Five Aggregates"),
    makeListDisplay("Six Internal and External Spheres of Sense"),
    makeListDisplay("Seven Constituents of Awakening"),
    {
      name: "Four Noble Truths",
      parts: ["see Right Understanding"],
    },
  ],
};

const thePath = [
  {
    pali: ["prajna"],
    parts: [
      {
        pali: ["ditthi"],
        parts: [fourNobleTruths],
      },
      {
        pali: ["sankappa"],
        parts: ["renunciation", "goodwill", "not harming"],
      },
    ],
  },
  {
    pali: ["sila"],
    parts: [
      {
        pali: ["vaca"],
        parts: ["no lying", "no abusive speech", "no idle chatter"],
      },
      {
        pali: ["kammanta"],
        parts: ["no killing", "no stealing", "no sexual misconduct"],
      },
      {
        pali: ["ajiva"],
        parts: [
          "no trading in weapons",
          "no trading in human trafficking",
          "no trading in meat",
          "no trading in intoxicants",
          "no trading in poison",
        ],
        suttas: [
          {
            title: "Vanijja Sutta",
            section: "Anguttara Nikaya",
            verse: 5.177,
            link: "https://google.com",
          },
        ],
      },
    ],
  },
  {
    pali: ["samadhi"],
    parts: [
      {
        pali: ["vayama"],
        parts: [
          "abandon arisen unwholesome states of mind",
          "prevent unarisen unwholesome states of mind",
          "arouse unarisen wholesome states of mind",
          "maintain arisen wholesome states of mind",
        ],
        title: "sammappadhana",
      },
      {
        pali: ["sati"],
        parts: [
          {
            concatenate: true,
            parts: ["body", "feelings", "general state of mind"],
          },
          specificMentalObjects,
        ],
        suttas: [
          {
            title: "Satipatthana Sutta",
            section: "Majjhima Nikaya",
            verse: 10,
            link: "https://google.com",
          },
          {
            title: "Mahasatipatthana Sutta",
            section: "Digha Nikaya",
            verse: 22,
            link: "https://google.com",
          },
        ],
      },
      {
        pali: ["samadhi"],
        parts: [dharmaLists["Four Meditative Absorptions"]],
      },
    ],
  },
];

const getPathsWithoutCategory = (path) => path.map((cat) => cat.parts).flat();

const justPaths = getPathsWithoutCategory(thePath);

function writeData() {
  return {
    dharmaLists,
    justPaths,
    paliWords,
    thePath,
  };
}

writeData();
