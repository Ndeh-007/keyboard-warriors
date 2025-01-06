import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Challenge, ChallengeOption } from "../core/interfaces/data";
import {
  CardHeader,
  CardTitle,
  CustomTabs,
  Card,
  CardBody,
  CardFooter,
  CardSubTitle,
} from "../components/Singletons";
import {
  DEFAULT_CHALLENGE,
  DEFAULT_INLINE_ALERT,
  DEFAULT_OPERATION_SETTINGS,
  LANGUAUGE_CHALLENGE_OPTIONS,
  TEXT_TYPE_CHALLENGE_OPTIONS,
  TIME_CHALLENGE_OPTIONS,
} from "../core/utils/variables";
import CustomSelect from "../components/CustomSelect";
import FindChallengeCard from "../components/FindChallengeCard";
import { InlineAlert } from "../components/dialog";
import { InlineAlertOptions } from "../core/interfaces/components";
import { issueChallenge } from "../core/apis/challenges";
import { APP_ROUTES } from "../core/routes";
import { useNavigate } from "react-router-dom";
import TypingTest from "../components/TypingTest";

const ConfigureChallenge: React.FC<{
  challenge: Challenge;
  onChallengeChanged: (c: Challenge) => any;
  onComplete: (c: Challenge) => any;
  words:string[]
}> = ({ challenge, onComplete, onChallengeChanged, words }) => {
  const [optionIndex, setOptionsIndex] = useState({
    time: 0,
    language: 0,
    type: 0,
  });

  function handleCustomItemChanged(key: string, option: ChallengeOption) {
    let c = { ...challenge };
    let optIdx = { ...optionIndex };

    switch (key) {
      case "language":
        c.language = option.tag as string;
        optIdx.language = option.index;
        break;

      case "time":
        c.duration = option.tag as number;
        optIdx.time = option.index;
        break;

      case "type":
        c.characters = option.tag as string;
        optIdx.type = option.index;
        break;

      default:
        break;
    }

    onChallengeChanged(c);
    setOptionsIndex(optIdx);
  }

  // useEffect(()=>{
  //   setOptionsIndex({

  //   })

  // }, [challenge])
  return (
    <div className="configure-challenge">
      <div className="complete-challenge-header issue-challenge">
        <div className="challenge-metrics item-glow">
          {/* <div className="goals">Goals</div> */}
          <div className="stack-items-holder">
            <div className="stack-items">
              <CustomSelect
                options={LANGUAUGE_CHALLENGE_OPTIONS}
                label="Language"
                currentOption={optionIndex.language}
                onChange={(opt) => handleCustomItemChanged("language", opt)}
              />
            </div>
            <div className="stack-items">
              <CustomSelect
                options={TIME_CHALLENGE_OPTIONS}
                label="Time"
                currentOption={optionIndex.time}
                onChange={(opt) => handleCustomItemChanged("time", opt)}
              />
            </div>
            <div className="stack-items">
              <CustomSelect
                options={TEXT_TYPE_CHALLENGE_OPTIONS}
                label="Type"
                currentOption={optionIndex.type}
                onChange={(opt) => handleCustomItemChanged("type", opt)}
              />
            </div>
          </div>
        </div>
        <div className="challenge-buttons item-glow">
          <div></div>
          <div>
            <button
              onClick={() => onComplete(challenge)}
              className="w-full bg-blue-500 border border-blue-500 text-white hover:bg-blue-600 hover:text-white text-blue font-semibold py-1 rounded-lg transition duration-300"
            >
              Complete
            </button>
            <button
              onClick={() => {}}
              className="mt-2 w-full bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white font-semibold py-1 rounded-lg transition duration-300"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="complete-challenge-body">
        <div className="test-holder item-glow my-3">
          <TypingTest onTestComplete={()=>{}} text={words} challenge={challenge} />
        </div>
      </div>
      <div className="complete-challenge-footer"></div>
    </div>
  );
};

const CreateChallenge: React.FC<{
  challenge: Challenge;
  onPaymentComplete: Function;
  onChallengeChanged: (c: Challenge) => any;
  onRetakeChallenge: (c: Challenge) => any;
}> = ({
  challenge,
  onPaymentComplete,
  onRetakeChallenge,
  onChallengeChanged,
}) => {
  function processPayment() {
    onPaymentComplete();
  }

  function cancelRelease() {
    onRetakeChallenge(challenge);
  }

  function handleCostChanged(value: string) {
    let cost = parseFloat(value);
    if (isNaN(cost)) return;

    let c = { ...challenge };
    c.cost = cost;
    c.earnings = DEFAULT_OPERATION_SETTINGS.earningsMultiplier * cost;

    onChallengeChanged(c);
  }

  return (
    <div className="release-challenge delete-challenge-body">
      <div className="left-pane">
        <div className="left-pane-content">
          <FindChallengeCard
            showActionBtn={false}
            challenge={challenge}
            view="delete"
            btnClickedCallback={() => {}}
          />
        </div>
      </div>
      <div className="right-pane">
        <div className="right-pane-content">
          <Card>
            <CardHeader border={true}>
              <CardTitle>Issue Challage</CardTitle>
              <CardSubTitle>This action cannot be undone</CardSubTitle>
            </CardHeader>
            <CardBody border={true}>
              <div>
                <div>
                  <p>
                    On creation of this challenge, it will be available in the
                    circulation pool.
                    <br />
                    Created challenges can be removed from circulation with the
                    creator gettting a percentage refunded.
                    <br />
                    To complete challenge creation, you define a cost of your
                    challenge which will determine your potential winnings.
                    <br />
                    <br />
                    If you are not comfortable with your typing metrics, use the
                    cancel button to return and take the challenge again.
                  </p>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="challenge-cost"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Challenge Cost <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="challenge-cost"
                    placeholder="e.g 200.23"
                    onChange={(e) => handleCostChanged(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <p className="pt-3">Below is the cost breakdown.</p>
                </div>

                <div className="pt-3">
                  <div className="payout-break-down">
                    <ul>
                      <li>
                        <span className="label">Cost (CAD)</span>:{" "}
                        <span>{challenge?.cost}</span>
                      </li>
                      <li>
                        <span className="label">Deduction (%)</span>:{" "}
                        <span>{0.0}</span>
                      </li>
                      <li>
                        <span className="label">Amount (CAD)</span>:{" "}
                        <span className="chip">{challenge?.cost}</span> +{" "}
                        <b className="fees">
                          <i>fees</i>
                        </b>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <p className="pt-3">
                    Enter the paypal account to which the payment will be
                    requested.
                  </p>
                </div>
              </div>
              <div>
                <div className="mt-4">
                  <label
                    htmlFor="paypal-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Paypal Account <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="paypal-email"
                    placeholder="paypal email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <button
                onClick={() => processPayment()}
                className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Make Payment
              </button>
              <button
                onClick={() => cancelRelease()}
                className="w-full border border-gray-400 bg-white-200 hover:bg-gray-700 hover:text-white text-gray-400 font-semibold py-2 rounded-lg transition duration-300 mt-2"
              >
                Retake Challenge
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

const IssueChallengePage: React.FC = () => {
  const [challenge, setChallenge] = useState<Challenge>(DEFAULT_CHALLENGE);
  const [tabIndex, setTabIndex] = useState(0);
  const [inlineAlertOpts, setInlineAlertOpts] = useState<InlineAlertOptions>(DEFAULT_INLINE_ALERT);
  const [words, setWords] = useState<string[]>([]) 
  const navigate = useNavigate()

  // #region event handlers

  function onPaymentComplete() {
    issueChallenge(challenge)
      .then((c) => {
        // show the alert
        setInlineAlertOpts({
          color: "success",
          text: "Challenge issued. Returning to main view in 3 seconds",
          open: true,
        });

        const timeout = setTimeout(()=>{
          navigate(APP_ROUTES['browse'].url)
        }, 3000)

        return () => clearTimeout(timeout)
      })
      .catch((error) => {
        // log the error
        console.error(error);

        // show the alert
        setInlineAlertOpts({
          color: "danger",
          text: "Failed to issue challenge",
          open: true,
        });
      });
  }

  function onRetakeChallenge(c: Challenge) {
    setChallenge(c);
    setTabIndex(0);
  }

  function onConfigComplete(c: Challenge) {
    setChallenge(c);
    setTabIndex(1);
  }

  function onChallengeChanged(c: Challenge) {
    setChallenge(c);
  }

  // #endregion

  // #region hooks

  // #endregion

  return (
    <div className="issue-challenge-page h-screen w-full">
      <Header />
      <div className="issue-challenge-body">
        <div className="container mx-auto">
          {inlineAlertOpts.open && (
            <div className="pt-3">
              <InlineAlert
                color={inlineAlertOpts.color}
                open={inlineAlertOpts.open}
                onClose={() => {
                  setInlineAlertOpts({ ...inlineAlertOpts, open: false });
                }}
                text={inlineAlertOpts.text}
                timeout={2500}
              />
            </div>
          )}

          <div className="pt-3">
            <CustomTabs
              leftEntries={[
                {
                  title: "Configure",
                  component: (
                    <ConfigureChallenge
                      challenge={challenge}
                      onComplete={onConfigComplete}
                      onChallengeChanged={onChallengeChanged}
                      words={words}
                    />
                  ),
                },
                {
                  title: "Release",
                  component: (
                    <CreateChallenge
                      challenge={challenge}
                      onPaymentComplete={onPaymentComplete}
                      onRetakeChallenge={onRetakeChallenge}
                      onChallengeChanged={onChallengeChanged}
                    />
                  ),
                },
              ]}
              rightEntries={[]}
              thinHeader={false}
              fitHeader={true}
              useExternalIndex={true}
              externalIndex={tabIndex}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IssueChallengePage;
