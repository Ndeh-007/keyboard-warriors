import React from "react";
import FindChallengeCard from "./FindChallengeCard";
import { Challenge } from "../core/interfaces/data";
import { Accordion, FilterBar, FromToFilterEntry } from "./Singletons";
import { FROM_TO_GROUPS, SAMPLE_CHALLENGE } from "../core/utils/variables";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../core/routes";

const MyChallengesTabContent: React.FC = () => {
  let c: Challenge = SAMPLE_CHALLENGE;
  let navigate = useNavigate();

  const c_arr = [c, c, c, c, c, c, c, c, c, c, c];
  const filterGroups = FROM_TO_GROUPS.map((g) => {
    g.callback = fromToGroupCallbackHandler;
    return g;
  });

  // #region workers
  function handleCardButtonClicked(opts: Challenge) {
    console.log("card-clicked");
    let url = APP_ROUTES["delete"].url + `/${opts.id}`
    navigate(url, {
      state: { challenge_id: opts.id },
    });
  }

  function fromToGroupCallbackHandler(opts: any) {
    console.log(opts);
  }

  function filterBarCallback() {
    console.log("filter bar callback");
  }

  // #endregion

  return (
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
                    view="personal"
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
  );
};

export default MyChallengesTabContent;
