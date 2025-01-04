// TypingTest.tsx
import React, { useState, useEffect, useRef } from "react";
import { Challenge } from "../core/interfaces/data";
import {
  DEFAULT_CHALLENGE,
  DEFAULT_INVALID_CHAR,
  DEFAULT_TYPING_CONFIG,
  DEFAULT_WORDS,
} from "../core/utils/variables";
import { TypingTestConfig } from "../core/interfaces/components";

const TypingTest: React.FC<{
  challenge?: Challenge;
  onTestComplete: Function;
  text: string[];
}> = ({
  challenge = DEFAULT_CHALLENGE,
  onTestComplete,
  text = DEFAULT_WORDS,
}) => {
  const [words, setWords] = useState<string[]>(text);
  const [timeElasped, setTimeElapsed] = useState(challenge.duration);
  const [config, setConfig] = useState<TypingTestConfig>(DEFAULT_TYPING_CONFIG);
  const configRef = useRef(config);

  // #region event handlers

  function handleKeyDown(event: KeyboardEvent) {
    let key = event.key;
    event.preventDefault();

    switch (key) {
      case "Tab":
        handleTabKey();
        break;

      case "Backspace":
        handleBackspaceKey();
        break;

      case " ":
        handleSpace();
        break;

      default:
        recordEntry(key);
        break;
    }
  }

  function handleTabKey() {
    // clear all config
    configRef.current = {...DEFAULT_TYPING_CONFIG}
    setConfig((prev) => ({ ...DEFAULT_TYPING_CONFIG }));
  }

  function handleBackspaceKey() {
    // undo the history by one step
    /*
      cases to handle
      - base case
        - nothing in the history buffer, reset to defualt
      
      - center cases
        - something in buffer, 
          - remove the entry one at a time, 
            - if the entry is the last in its group, remove the group and go back on word
            - also shift the cursor behind one step
        - last group and last character in the buffer, reset the buffer to defualt
      */

    // base case, nothing in buffer
    if (configRef.current.typedHistory.length === 0) {
      return setConfig(DEFAULT_TYPING_CONFIG);
    }

    // center case

    // current group, if empty, remove from buffer and shift backwards one step
    if (
      configRef.current.typedHistory[configRef.current.currentWordIndex]
        .length === 0
    ) {
      let typed_history = [...configRef.current.typedHistory];
      typed_history.pop();
      return setConfig((prev) => ({
        ...prev,
        currentWordIndex:
          prev.currentWordIndex - 1 === -1 ? 0 : prev.currentWordIndex - 1,
        cursor: prev.cursor - 1 === -1 ? 0 : prev.cursor - 1,
        typedHistory: [...typed_history],
      }));
    } else {
      // current group, has entries
      // remove the last entry in current group and shift the cursor one step backwards
      let typed_history = [...configRef.current.typedHistory];
      typed_history[configRef.current.currentWordIndex].pop();

      return setConfig((prev) => ({
        ...prev,
        cursor: prev.cursor - 1 === -1 ? 0 : prev.cursor - 1,
        typedHistory: [...typed_history],
      }));
    }
  }

  function handleSpace() {
    // move to the next word
    // if we are within the range of used words, stepforward
    // otherwise trigger complete

    // if space was pressed when the word was not completed, padd the rest with
    // the default invalid character DEFAULT_INVALID_CHAR

    // resolve completion if all the word have been attempted
    if (configRef.current.typedHistory.length === words.length)
      return triggerComplete();

    // check whether the current word history is incomplete and pad it
    let cur_word = words[configRef.current.currentWordIndex];
    let cur_his_word =
      configRef.current.typedHistory[configRef.current.currentWordIndex].join(
        ""
      );
    let offset = cur_word.length - cur_his_word.length;

    if (offset > 0) {
      let padd = Array(Math.abs(offset)).fill(DEFAULT_INVALID_CHAR).join("");
      cur_his_word = cur_his_word + padd;
      configRef.current.typedHistory[configRef.current.currentWordIndex] =
        cur_his_word.split("");
    }

    setConfig((prev) => {
      return {
        ...prev,
        currentWordIndex: prev.currentWordIndex + 1,
        cursor: prev.cursor + Math.abs(offset),
        typedHistory: [...prev.typedHistory, []],
      };
    });
  }

  function recordEntry(key: string) {
    // reject invalid characters
    if (key.length > 1) return;

    //  if there is no history entry holder, create one
    if (configRef.current.typedHistory.length === 0) {
      configRef.current.typedHistory.push([]);
    }

    // modify the last history group entry
    let _his =
      configRef.current.typedHistory[configRef.current.currentWordIndex];
    _his.push(key);

    // replace the last entry
    configRef.current.typedHistory[configRef.current.currentWordIndex] = _his;

    // propagate the changes
    setConfig((prev) => ({
      ...prev,
      cursor: prev.cursor + 1,
      typedHistory: [...prev.typedHistory],
    }));
  }

  // #endregion

  // #region helpers

  function triggerComplete() {
    console.log("test complete triggered");
    onTestComplete();
  }

  function hasExtraChar(wordIndex: number) {
    // if the index is invalid, reject
    if (wordIndex >= configRef.current.typedHistory.length) return false;

    // if index is valid, check if there are extra
    let state =
      words[wordIndex].length <
      configRef.current.typedHistory[wordIndex].length;

    // resolve the verdict
    return state;
  }

  function isValidChar(wordIndex: number, charIndex: number) {
    if (wordIndex >= configRef.current.typedHistory.length) return false;

    let c_char = words[wordIndex][charIndex];
    let h_char = configRef.current.typedHistory[wordIndex][charIndex];

    return c_char === h_char;
  }

  function isErrorChar(wordIndex: number, charIndex: number) {
    if (wordIndex >= configRef.current.typedHistory.length) return false;

    let c_char = words[wordIndex][charIndex];
    let h_char = configRef.current.typedHistory[wordIndex][charIndex];

    // in the case where the h_char doesn't exist,
    // the test fails
    if (h_char === undefined) return false;

    // otherwise, check for the fail state
    return c_char !== h_char;
  }

  // #endregion

  // #region effects

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // #endregion

  return (
    <div className="typing-test">
      <div className="action-bar">
        <div>
          <span className="time-left">{timeElasped} s</span>
        </div>
        <div>
          <span className="preview-word">{}</span>
        </div>
        <div className="control">
          <span>Clear Entries</span>{" "}
          <span className="chip">Tab</span> 
        </div>
      </div>
      <div className="text-holder">
        <div className="words">
          {words.map((word, idx) => {
            const isActive = configRef.current.currentWordIndex === idx;
            const caret_offset = 19.923;
            let typedLength = 0;
            if (configRef.current.typedHistory[idx]) {
              let offset = 0.0
              typedLength = configRef.current.typedHistory[idx].length + offset;
            }
            return (
              <div key={word + idx + "caret"} className="word">
                {/* // for current words, show the carate */}
                {isActive && (
                  <span
                    className="caret blink"
                    style={{ left: typedLength * caret_offset }}
                  >
                    |
                  </span>
                )}

                {word.split("").map((char, charId) => {
                  // if the word index and the char index align,
                  // update the value as valid (red or green)
                  // other wise resolve an unset character
                  if (isValidChar(idx, charId)) {
                    return (
                      <span key={char + charId} className="valid-char">
                        {char}
                      </span>
                    );
                  } else if (isErrorChar(idx, charId)) {
                    return (
                      <span key={char + charId} className="error-char">
                        {char}
                      </span>
                    );
                  } else {
                    return (
                      <span key={char + charId} className="unset-char">
                        {char}
                      </span>
                    );
                  }
                })}

                {/* {config.currentWordIndex === idx && (
                    )} */}
                <span>
                  {hasExtraChar(idx) ? (
                    <span>
                      {configRef.current.typedHistory[idx]
                        .slice(words[idx].length - 1)
                        .map((char, charId) => {
                          return (
                            <span
                              className="key extra-char"
                              key={charId + "_" + char}
                            >
                              {char}
                            </span>
                          );
                        })}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
