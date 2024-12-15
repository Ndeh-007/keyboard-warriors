import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Challenge } from "../core/interfaces/data";
import { FROM_TO_GROUPS, SAMPLE_CHALLENGE } from "../core/utils/variables";
import {
  Accordion,
  FilterBar,
  FromToFilterEntry,
} from "../components/Singletons";
import FindChallengeCard from "../components/FindChallengeCard";
import { APP_ROUTES } from "../core/routes";

const FindChallengesPageSubheader: React.FC = () => {
  let navigate = useNavigate();

  function handleBtnClick() {
    navigate(APP_ROUTES["issueChallenge"].url);
  }

  return (
    <div className="find-challenges-page-subheader">
        <button className="item" onClick={() => handleBtnClick()}>
          Issue Challenge {" "}<span className="material-icons">add</span>
        </button>
    </div>
  );
};

const FindChallengesPage: React.FC = () => {
  let navigate = useNavigate();

  let c: Challenge = SAMPLE_CHALLENGE;

  const c_arr = [c, c, c, c, c, c, c, c, c, c, c];
  const filterGroups = FROM_TO_GROUPS.map((g) => {
    g.callback = filterGroupsCallbackHandler;
    return g;
  });

  // #region workers
  function handleCardButtonClicked(opts: Challenge) {
    let url = `/accept/${opts.id}`;
    navigate(url, {
      state: {
        challenge_id: opts.id,
      },
    });
  }

  function filterGroupsCallbackHandler(opts: any) {
    console.log(opts);
  }

  function filterBarCallback() {
    console.log("filter bar callback");
  }

  return (
    <div className="w-full h-screen find-challenges-page">
      <Header subheader={<FindChallengesPageSubheader />} />

      {/* page body */}
      <div className="challenges-body">
        <div className="p-5">
          {/* content holder */}
          <div className="container mx-auto">
            {/* filter region */}
            <div className="find-challenges-content">
              {/* accordion holder */}
              <div className="filter-holder filter-box overflow-scrollbar hidden lg:block">
                <Accordion title="Order By">
                  <fieldset>
                    <div>
                      <input
                        type="radio"
                        id="asc"
                        name="order"
                        value="asc"
                        className="mr-4 mt-1"
                      />
                      <label htmlFor="asc">Oldest First</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="desc"
                        name="order"
                        value="desc"
                        className="mr-4 mt-2"
                        checked
                      />
                      <label htmlFor="desc">Newest First</label>
                    </div>
                  </fieldset>
                </Accordion>

                {filterGroups.map((filter, index) => {
                  return (
                    <FromToFilterEntry
                      key={index}
                      title={filter?.title}
                      callback={filter.callback}
                      pid={filter.pid}
                    />
                  );
                })}
              </div>

              {/* filter results */}
              <div className="filter-results filter-box overflow-scrollbar">
                <div className="filter-options">
                  <FilterBar filters={[]} callback={filterBarCallback} />
                </div>

                {/* card region */}
                <div className="challenge-cards-holder">
                  {c_arr.map((v, index) => {
                    return (
                      <FindChallengeCard
                        key={index}
                        view="browse"
                        challenge={v}
                        btnClickedCallback={handleCardButtonClicked}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The page footer */}
      <Footer />
    </div>
  );
};

export default FindChallengesPage;
