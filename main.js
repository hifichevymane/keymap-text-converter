import prompts from "prompts";

import { EN_KEYMAP, UA_KEYMAP } from "./keymaps.js";

const convertTextKeymap = (inputText, keymap) => {
  let keymapToConvert;
  if (keymap === "ua") {
    keymapToConvert = EN_KEYMAP.map((letter, index) => [
      letter,
      UA_KEYMAP[index],
    ]);
  } else {
    keymapToConvert = UA_KEYMAP.map((letter, index) => [
      letter,
      EN_KEYMAP[index],
    ]);
  }
  keymapToConvert = new Map(keymapToConvert);

  let convertedText = [];
  for (const letter of inputText) {
    const convertedLetter = keymapToConvert.get(letter) || letter;
    convertedText.push(convertedLetter);
  }

  return convertedText.join("");
};

const main = async () => {
  const questions = [
    {
      type: "text",
      name: "inputText",
      message: "Enter the text to convert the keymap of it: ",
    },
    {
      type: "select",
      name: "keymap",
      message: "Which keymap do you want to use to convert the text?: ",
      choices: [
        { title: "Ukrainian", value: "ua" },
        { title: "English", value: "en" },
      ],
      initial: 0,
    },
  ];

  const { inputText, keymap } = await prompts(questions);

  const convertedText = convertTextKeymap(inputText, keymap);
  console.log(`The converted string: ${convertedText}`);
};

main();
