import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FindChallengeCard from "../components/FindChallengeCard";
import {
  DEFAULT_INLINE_ALERT,
  DEFAULT_OPERATION_SETTINGS,
} from "../core/utils/variables";
import {
  Card,
  CardBody,
  CardSubTitle,
  CardTitle,
  CardHeader,
  CardFooter,
} from "../components/Singletons";
import { useLocation, useParams } from "react-router-dom";
import { Challenge } from "../core/interfaces/data";
import { deleteChallenge, fetchChallenge } from "../core/apis/challenges";
import { InlineAlertOptions } from "../core/interfaces/components";
import { InlineAlert } from "../components/dialog";

const DeleteChallengePage: React.FC = () => {
  const [challenge, setChallenge] = useState<Challenge>();
  const [inlineAlertOpts, setInlineAlertOpts] =
    useState<InlineAlertOptions>(DEFAULT_INLINE_ALERT);

  const [deduction, setDeduction] = useState<number>();
  const location = useLocation();
  const { challenge_id } = useParams();

  // #region event handlers
  function onDeleteButtonClicked() {
    deleteChallenge(challenge ? challenge.id : "_invalid")
      .then((c) => {
        let opts = { ...inlineAlertOpts };
        opts.color = "success";
        opts.text = `Challenge with id <${c.id}> Successfully deleted, refund sent. Return to main screen to browse more challenges`;
        opts.open = true;
        setInlineAlertOpts(opts);
      })
      .catch((e) => {
        console.error(e);
        let opts = { ...inlineAlertOpts };
        opts.color = "danger";
        opts.text = e.message;
        opts.open = true;
        setInlineAlertOpts(opts);
      });
  }
  // #endregion

  // #region workers

  function instantiate(cid: string) {
    fetchChallenge(cid)
      .then((c) => {
        setChallenge(c);
        computeDeduction(c.cost, DEFAULT_OPERATION_SETTINGS.refundPercent);
      })
      .catch((e) => {
        console.error(e);
        let opts = { ...inlineAlertOpts };
        opts.color = "danger";
        opts.text = e.message;
        opts.open = true;
        setInlineAlertOpts(opts);
      });
  }

  function computeDeduction(cost: number, percentage: number) {
    let c = cost - percentage * 1e-2 * cost;
    setDeduction(c);
  }

  // #endregion

  // #region hooks

  useEffect(() => {
    if (location.state) return instantiate(location.state.challenge_id);
    instantiate(challenge_id ? challenge_id : "_invalid");
  }, [location, challenge_id]);

  // #endregion

  return (
    <div className="h-screen w-full">
      <Header></Header>
      <div className="light-background">
        <div className="container mx-auto">
          {inlineAlertOpts.open && (
            <div className="pt-3">
              <InlineAlert
                color={inlineAlertOpts.color}
                open={inlineAlertOpts.open}
                onClose={() => {}}
                text={inlineAlertOpts.text}
              />
            </div>
          )}
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
                    <CardTitle>Delete Challage</CardTitle>
                    <CardSubTitle>This action cannot be undone</CardSubTitle>
                  </CardHeader>
                  <CardBody border={true}>
                    <div>
                      <p>
                        On completion of this action, this challenge will be
                        removed from the challenge circulation pool.
                        <br />
                        This challenge will not be visible to others.
                      </p>
                      <p className="pt-3">
                        As a result of deleting this challenge, you will be
                        reimbursed a percentation of the challenge creation
                        cost. <br /> See below for details.
                      </p>

                      <div className="pt-3">
                        <div className="payout-break-down">
                          <ul>
                            <li>
                              <span className="label">
                                Cost ({DEFAULT_OPERATION_SETTINGS.currency})
                              </span>
                              : <span>{challenge?.cost}</span>
                            </li>
                            <li>
                              <span className="label">Deduction (%)</span>:{" "}
                              <span>
                                {DEFAULT_OPERATION_SETTINGS.refundPercent}
                              </span>
                            </li>
                            <li>
                              <span className="label">
                                Amount ({DEFAULT_OPERATION_SETTINGS.currency})
                              </span>
                              : <span className="chip">{deduction}</span> -{" "}
                              <b className="fees">
                                <i>fees</i>
                              </b>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <p className="pt-3">
                        Enter the mailing address of the target paypal account
                        to which you wish to receive the reimburement.
                      </p>
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
                      onClick={() => onDeleteButtonClicked()}
                      className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                      Delete Challenge
                    </button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DeleteChallengePage;
