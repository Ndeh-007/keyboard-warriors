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
  LANGUAUGE_CHALLENGE_OPTIONS,
  SAMPLE_CHALLENGE,
  TEXT_TYPE_CHALLENGE_OPTIONS,
  TIME_CHALLENGE_OPTIONS,
} from "../core/utils/variables";
import CustomSelect from "../components/CustomSelect";
import FindChallengeCard from "../components/FindChallengeCard";

const ConfigureChallenge: React.FC<{
  challenge: Challenge;
  onComplete: (c: Challenge) => any;
}> = ({ challenge, onComplete }) => {
  function handleCustomItemChanged(key: string, option: ChallengeOption) {}

  return (
    <div className="configure-challenge">
      <div className="complete-challenge-header issue-challenge">
        <div className="target-metrics item-glow">
          {/* <div className="goals">Goals</div> */}
          <div className="stack-items-holder">
            <div className="stack-items">
              <CustomSelect
                options={LANGUAUGE_CHALLENGE_OPTIONS}
                label="Language"
                currentOption={0}
                onChange={(opt) => handleCustomItemChanged("lang", opt)}
              />
            </div>
            <div className="stack-items">
              <CustomSelect
                options={TIME_CHALLENGE_OPTIONS}
                label="Time"
                currentOption={0}
                onChange={(opt) => handleCustomItemChanged("time", opt)}
              />
            </div>
            <div className="stack-items">
              <CustomSelect
                options={TEXT_TYPE_CHALLENGE_OPTIONS}
                label="Type"
                currentOption={0}
                onChange={(opt) => handleCustomItemChanged("text_type", opt)}
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
        <div className="h-20"></div>
      </div>
      <div className="complete-challenge-footer"></div>
    </div>
  );
};

const CreateChallenge: React.FC<{
  challenge: Challenge;
  onPaymentComplete: Function;
  onRetakeChallenge: (c: Challenge) => any;
}> = ({ challenge, onPaymentComplete, onRetakeChallenge }) => {
  function processPayment() {
    onPaymentComplete();
  }

  function cancelRelease() {
    onRetakeChallenge(challenge);
  }

  return (
    <div className="release-challenge delete-challenge-body">
      <div className="left-pane">
        <div className="left-pane-content">
          <FindChallengeCard
            showActionBtn={false}
            challenge={SAMPLE_CHALLENGE}
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
                    type="email"
                    id="challenge-cost"
                    placeholder="e.g 200.23"
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
  const [challenge, setChallenge] = useState(SAMPLE_CHALLENGE);
  const [tabIndex, setTabIndex] = useState(0);

  function onConfigComplete(c: Challenge) {
    setTabIndex(1);
  }

  function onPaymentComplete() {
    return;
  }

  function onRetakeChallenge(c: Challenge) {
    setTabIndex(0);
  }

  return (
    <div className="issue-challenge-page h-screen w-full">
      <Header />
      <div className="issue-challenge-body">
        <div className="container mx-auto">
          <div className="pt-3">
            <CustomTabs
              leftEntries={[
                {
                  title: "Configure",
                  component: (
                    <ConfigureChallenge
                      challenge={challenge}
                      onComplete={onConfigComplete}
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
