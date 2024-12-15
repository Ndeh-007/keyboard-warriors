import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FindChallengeCard from "../components/FindChallengeCard";
import { DEFAULT_CHALLENGE } from "../core/utils/variables";
import {
  Card,
  CardBody,
  CardSubTitle,
  CardTitle,
  CardHeader,
  CardFooter,
} from "../components/Singletons";
import { useLocation } from "react-router-dom";

const DeleteChallengePage: React.FC = () => {

  // const {challenge_id} = useParams()

  let location = useLocation()

  useEffect(()=>{
    if(location.state){
      let {challenge_id} = location.state
      console.log('deleteing challenge with id ' + challenge_id, )
    }
  }, [location])

  return (
    <div className="h-screen w-full">
      <Header></Header>
      <div className="light-background">
        <div className="container mx-auto">
          <div className="delete-challenge-body">
            <div className="left-pane">
              <div className="left-pane-content">
                <FindChallengeCard
                  showActionBtn={false}
                  challenge={DEFAULT_CHALLENGE}
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
                              <span className="label">Cost (CAD)</span>: <span>{200}</span>
                            </li>
                            <li>
                              <span className="label">Deduction (%)</span>: <span>{50}</span>
                            </li>
                            <li>
                              <span className="label">Amount (CAD)</span>:{" "}
                              <span className="chip">
                                {100}
                              </span>  -{" "}
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
                    <button className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300">
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
