import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FindChallengeCard from "../components/FindChallengeCard";
import { DEFAULT_CHALLENGE, SAMPLE_USER } from "../core/utils/variables";
import {
  Card,
  CardBody,
  CardSubTitle,
  CardTitle,
  CardHeader,
  CardFooter,
  CustomTabs,
} from "../components/Singletons";
import { Link, useLocation, useParams } from "react-router-dom";
import { Challenge, User } from "../core/interfaces/data";
import { AlertDialog, InlineAlert } from "../components/dialog";
import { APP_ROUTES } from "../core/routes";
import { ChallengeResultsState } from "../core/interfaces/components";
import { fetchChallenge } from "../core/apis/challenges";

const MakePayment: React.FC<{
  challenge?: Challenge;
  onPaymentComplete: Function;
}> = ({ challenge, onPaymentComplete }) => {
  // #region workers
  function processPayment() {
    onPaymentComplete();
  }

  // #endregion

  return (
    <div className="delete-challenge-body">
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
              <CardTitle>Accept Challage</CardTitle>
              <CardSubTitle>This action cannot be undone</CardSubTitle>
            </CardHeader>
            <CardBody border={true}>
              <div>
                <div>
                  <p>
                    To Complete this action, you will have to match the cost the
                    of the challenge.
                    <br />
                    Once payment is complete, you will begin the challenge. If
                    you do not see the challenge through,
                    <br />
                    it assumed that you have forfeited. Ensure that you have a
                    stable internet connection.
                  </p>
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
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CompleteChallenge: React.FC<{
  challenge?: Challenge;
  onChallengeComplete: Function;
}> = ({ challenge, onChallengeComplete }) => {
  function handleForfietClicked() {
    onChallengeComplete(challenge);
  }

  return (
    <div className="complete-challenge">
      <div className="complete-challenge-header">
        {/* <div className="target-metrics-holder">
        </div> */}

        <div className="target-metrics item-glow">
          {/* <div className="goals">Goals</div> */}
          <div className="stack-items-holder">
            <div className="stack-items">
              <div className="top-item">WPM</div>
              <div className="bottom-item">{challenge?.wpm}</div>
            </div>
            <div className="stack-items">
              <div className="top-item">Acc(%)</div>
              <div className="bottom-item">{challenge?.accuracy}</div>
            </div>
            <div className="stack-items">
              <div className="top-item">Time(s)</div>
              <div className="bottom-item">{challenge?.consistency}</div>
            </div>
            <div className="stack-items">
              <div className="top-item">Consistency(%)</div>
              <div className="bottom-item">{challenge?.errorcount}</div>
            </div>
          </div>
        </div>
        <div className="challenge-buttons item-glow">
          <div>
            <p>Click button below to exit challenge. </p>
          </div>
          <div>
            <button
              onClick={() => handleForfietClicked()}
              className="w-full bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-danger font-semibold py-1 rounded-lg transition duration-300"
            >
              Forfeit Challenge
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

const ChallengeResults: React.FC<{
  challenge?: Challenge;
  challengeResults?: Challenge;
  payEmail?: string;
  resultState?: ChallengeResultsState;
}> = ({ challenge, payEmail, resultState, challengeResults }) => {
  return (
    <div className="challenge-results">
      <div className="challenge-results-banner">
        {resultState === "processing" && (
          <div className="challenge-results-banner-item processing">
            Please wait while we process challenge results
          </div>
        )}

        {resultState === "passed" && (
          <div className="challenge-results-banner-item success">
            You Passed. Sending{" "}
            <span className="chip">${challenge?.earnings} CAD</span> to{" "}
            <span className="chip">{payEmail}</span> via paypal
          </div>
        )}

        {resultState === "failed" && (
          <div className="challenge-results-banner-item failed">
            You failed the challenge.
          </div>
        )}
      </div>

      <div className="challenge-results-body">
        {/* If there are no results available and for some reason this page still loaded */}
        {resultState === undefined && (
          <div className="text-center p-10">
            No Results available. <br />
            <Link
              to={APP_ROUTES["home"].url}
              className="underline text-blue-500"
            >
              Browse
            </Link>{" "}
            other challenges.
          </div>
        )}

        {/* in case where there are results,  */}
        {resultState || resultState === "processing" ? (
          <div>
            <div>
              <table className="table-auto results-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>wpm</th>
                    <th>accuracy (%)</th>
                    <th>consistency (%)</th>
                    <th>errors</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="medium-text-color">
                      <b>Your Metrics</b>
                    </td>
                    <td>{challengeResults?.wpm}</td>
                    <td>{challengeResults?.accuracy}</td>
                    <td>{challengeResults?.consistency}</td>
                    <td>{challengeResults?.errorcount}</td>
                  </tr>
                  <tr>
                    <td className="medium-text-color">
                      <b>Target Metrics</b>
                    </td>
                    <td>{challenge?.wpm}</td>
                    <td>{challenge?.accuracy}</td>
                    <td>{challenge?.consistency}</td>
                    <td>{challenge?.errorcount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="adspace mx-auto mt-10"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const AcceptChallengePage: React.FC = () => {
  const location = useLocation();
  const { challenge_id } = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const [challenge, setChallenge] = useState<Challenge>();
  const [user] = useState<User>(SAMPLE_USER);

  const [beginChallengeAlert, setBeginChallengeAlert] = useState(false);
  const [challengeNotFound, setChallengeNotFound] = useState(false);

  // #region initialize

  instantiate(challenge_id ? challenge_id : "_invalid");

  // #endregion

  // #region workers

  function handlePaymentComplete() {
    // show complete screen and alert
    setTabIndex(1);
    setBeginChallengeAlert(true);
  }

  function handleChallengeComplete(opts: Challenge) {
    setTabIndex(2);
  }

  function handleAlertClose() {
    setBeginChallengeAlert(false);
  }

  function instantiate(cid: string) {
    // fetches challenge with target id
    fetchChallenge(cid)
      .then((ch) => {
        setChallenge(ch);
        setChallengeNotFound(false);
      })
      .catch((e) => {
        console.error(e);
        setChallengeNotFound(true);
      });
  }

  // #endregion

  // #region hooks

  useEffect(() => {
    // handles cases for accepting a challenge via accept button or from browser link
    // accept challenge button takes precedence.

    if (location.state) {
      console.log("state exists")
      console.log(location.state)
      instantiate(location.state.challenge_id);
    }
  }, [location, challenge_id]);

  // #endregion

  return (
    <div className="h-screen w-full">
      <Header></Header>

      <div className="light-background">
        <div className="container mx-auto">
          {challengeNotFound && (
            <div className="pt-3">
              <InlineAlert
                open={challengeNotFound}
                onClose={() => {}}
                text="Challenge not found. Return to home page and search for more."
                color="warning"
              />
            </div>
          )}

          <div className="pt-5 w-full">
            <CustomTabs
              leftEntries={[
                {
                  title: "Make Payment",
                  component: (
                    <MakePayment
                      challenge={challenge}
                      onPaymentComplete={handlePaymentComplete}
                    />
                  ),
                },
                {
                  title: "Complete Challenge",
                  component: (
                    <CompleteChallenge
                      challenge={challenge}
                      onChallengeComplete={handleChallengeComplete}
                    />
                  ),
                },
                {
                  title: "Results",
                  component: (
                    <ChallengeResults
                      challenge={challenge}
                      payEmail={user.paypalEmail}
                      resultState="processing"
                    />
                  ),
                },
              ]}
              rightEntries={[]}
              thinHeader={false}
              externalIndex={tabIndex}
              useExternalIndex={true}
              fitHeader={true}
            ></CustomTabs>
          </div>
        </div>
      </div>
      <Footer></Footer>

      {beginChallengeAlert && (
        <AlertDialog
          onClose={handleAlertClose}
          onConfirm={handleAlertClose}
          open={beginChallengeAlert}
          title="Begin Challenge"
          message={
            "You can begin the challenge. Metrics will start recording when you commence typing. Confirm the dialog to begin."
          }
          color="primary"
        />
      )}
    </div>
  );
};

export default AcceptChallengePage;
