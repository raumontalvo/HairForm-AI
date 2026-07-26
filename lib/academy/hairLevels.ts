export type HairLevelLessonEntry = {
  level: number;
  name: string;
  depthDescription: string;
  underlyingPigment: string;
  pigmentDescription: string;
  commonServices: string[];
  professionalNote: string;
};

export type HairLevelQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOption: string;
  explanation: string;
};

export const hairLevelLessonEntries: HairLevelLessonEntry[] =
  [
    {
      level: 1,
      name: "Black",
      depthDescription:
        "The deepest visible level in the professional level system.",
      underlyingPigment: "Deep red",
      pigmentDescription:
        "Dense natural pigment makes significant lightening a gradual process.",
      commonServices: [
        "Glossing",
        "Gray blending",
        "Deep brunette formulation",
      ],
      professionalNote:
        "Large level changes from Level 1 require realistic expectations, careful strand testing, and multiple controlled stages.",
    },
    {
      level: 2,
      name: "Darkest Brown",
      depthDescription:
        "An extremely deep brunette with slightly more visible dimension than Level 1.",
      underlyingPigment: "Red",
      pigmentDescription:
        "Strong red warmth becomes visible as natural pigment is exposed.",
      commonServices: [
        "Rich brunette color",
        "Gray coverage",
        "Corrective darkening",
      ],
      professionalNote:
        "Do not confuse reflected cool tone with actual depth. Always identify the level before evaluating tone.",
    },
    {
      level: 3,
      name: "Dark Brown",
      depthDescription:
        "A deep brunette level with visible richness and natural warmth.",
      underlyingPigment: "Red",
      pigmentDescription:
        "Red pigment remains dominant during the early stages of lift.",
      commonServices: [
        "Brunette enhancement",
        "Gray coverage",
        "Dimensional highlighting",
      ],
      professionalNote:
        "When lifting from Level 3, plan for strong warm exposure before expecting lighter orange or yellow stages.",
    },
    {
      level: 4,
      name: "Medium Brown",
      depthDescription:
        "A balanced brunette level commonly used as a visual reference point.",
      underlyingPigment: "Red-orange",
      pigmentDescription:
        "Red begins transitioning toward orange as lift progresses.",
      commonServices: [
        "Brunette formulation",
        "Balayage foundations",
        "Corrective color",
      ],
      professionalNote:
        "Level 4 is a common starting point for blonding services, but several levels of controlled lift may be required.",
    },
    {
      level: 5,
      name: "Light Brown",
      depthDescription:
        "A lighter brunette depth positioned near the transition into blonde.",
      underlyingPigment: "Orange-red",
      pigmentDescription:
        "Orange becomes more prominent while red influence remains present.",
      commonServices: [
        "Brunette-to-blonde transitions",
        "Warm dimensional color",
        "Gray blending",
      ],
      professionalNote:
        "A Level 5 client may appear darker or lighter depending on density, lighting, previous color, and reflected tone.",
    },
    {
      level: 6,
      name: "Dark Blonde",
      depthDescription:
        "The first commonly recognized blonde level in many professional systems.",
      underlyingPigment: "Orange",
      pigmentDescription:
        "Orange is the dominant exposed pigment at this stage.",
      commonServices: [
        "Dark blonde formulation",
        "Highlighting",
        "Warm brunette correction",
      ],
      professionalNote:
        "Blue-based correction can control orange, but the formula must respect porosity and the desired final brightness.",
    },
    {
      level: 7,
      name: "Medium Blonde",
      depthDescription:
        "A balanced blonde depth that still carries noticeable warmth.",
      underlyingPigment: "Orange-yellow",
      pigmentDescription:
        "The exposed pigment transitions from orange toward yellow.",
      commonServices: [
        "Dimensional blonde",
        "Copper formulation",
        "Neutral blonde toning",
      ],
      professionalNote:
        "Level 7 is often misidentified as lighter than it is. Compare it with a trusted level swatch before formulating.",
    },
    {
      level: 8,
      name: "Light Blonde",
      depthDescription:
        "A bright blonde level with less visible depth and softer warmth.",
      underlyingPigment: "Yellow-orange",
      pigmentDescription:
        "Yellow is increasingly dominant, with some remaining orange warmth.",
      commonServices: [
        "Light blonde toning",
        "Beige blondes",
        "Highlight refinement",
      ],
      professionalNote:
        "A toner cannot create lift. The hair must reach the correct underlying level before tonal refinement.",
    },
    {
      level: 9,
      name: "Very Light Blonde",
      depthDescription:
        "A very light blonde with minimal depth and pale visible warmth.",
      underlyingPigment: "Yellow",
      pigmentDescription:
        "Soft yellow pigment is expected and provides the foundation for many pale blonde results.",
      commonServices: [
        "Pearl blonde",
        "Violet-based toning",
        "High-lift refinement",
      ],
      professionalNote:
        "Trying to eliminate every trace of yellow can create dull, violet, gray, or over-toned results.",
    },
    {
      level: 10,
      name: "Lightest Blonde",
      depthDescription:
        "The palest commonly used level in the professional system.",
      underlyingPigment: "Pale yellow",
      pigmentDescription:
        "A faint pale-yellow foundation remains even at the lightest usable blonde level.",
      commonServices: [
        "Platinum blondes",
        "Pastel toning",
        "Creative color preparation",
      ],
      professionalNote:
        "Reaching Level 10 is not appropriate for every head of hair. Structural integrity must remain more important than maximum lift.",
    },
  ];

export const hairLevelQuizQuestions: HairLevelQuizQuestion[] =
  [
    {
      id: "level-four",
      prompt:
        "Which level is generally identified as Medium Brown?",
      options: [
        "Level 2",
        "Level 4",
        "Level 6",
        "Level 8",
      ],
      correctOption: "Level 4",
      explanation:
        "Level 4 is commonly described as Medium Brown in the professional level system.",
    },
    {
      id: "depth-not-tone",
      prompt:
        "What does the hair level system primarily measure?",
      options: [
        "Depth or lightness",
        "Warmth only",
        "Porosity",
        "Developer strength",
      ],
      correctOption: "Depth or lightness",
      explanation:
        "Level measures how dark or light the hair is. Tone describes the color character, such as warm, cool, ash, or gold.",
    },
    {
      id: "level-six-pigment",
      prompt:
        "Which underlying pigment is most associated with Level 6?",
      options: [
        "Violet",
        "Blue",
        "Orange",
        "Green",
      ],
      correctOption: "Orange",
      explanation:
        "Orange is the dominant exposed pigment around Level 6.",
    },
    {
      id: "toner-lift",
      prompt:
        "Can toner lift hair from Level 7 to Level 9?",
      options: [
        "Yes, toner creates two levels of lift",
        "Yes, when applied longer",
        "No, toner refines tone rather than creating the required lift",
        "Only on high-porosity hair",
      ],
      correctOption:
        "No, toner refines tone rather than creating the required lift",
      explanation:
        "The hair must first reach the correct depth. Toner adjusts the tonal result after the necessary lift has occurred.",
    },
    {
      id: "level-ten-safety",
      prompt:
        "What should take priority when attempting to reach Level 10?",
      options: [
        "Maximum processing time",
        "Using the strongest developer",
        "Hair integrity and realistic expectations",
        "Removing every trace of yellow",
      ],
      correctOption:
        "Hair integrity and realistic expectations",
      explanation:
        "The lightest result is not always the safest result. Professional decisions must protect the condition of the hair.",
    },
  ];

export function getHairLevelEntry(
  level: number,
): HairLevelLessonEntry {
  return (
    hairLevelLessonEntries.find(
      (entry) => entry.level === level,
    ) ?? hairLevelLessonEntries[4]
  );
}