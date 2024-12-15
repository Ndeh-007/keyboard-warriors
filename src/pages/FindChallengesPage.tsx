import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Challenge } from "../core/interfaces/data";
import { FROM_TO_GROUPS, SAMPLE_CHALLENGES } from "../core/utils/variables";
import {
  Accordion,
  FilterBar,
  FromToFilterEntry,
} from "../components/Singletons";
import FindChallengeCard from "../components/FindChallengeCard";
import { APP_ROUTES } from "../core/routes";
import { FromToFilterData } from "../core/interfaces/components";
import { fetchChallenges } from "../core/apis/challenges";
import { InlineAlert } from "../components/dialog";

const FindChallengesPageSubheader: React.FC = () => {
  let navigate = useNavigate();

  function handleBtnClick() {
    navigate(APP_ROUTES["issueChallenge"].url);
  }

  return (
    <div className="find-challenges-page-subheader">
      <button className="item" onClick={() => handleBtnClick()}>
        Issue Challenge <span className="material-icons">add</span>
      </button>
    </div>
  );
};

const FindChallengesPage: React.FC = () => {
  let navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filters, setFilters] = useState<FromToFilterData[]>([]);

  const filterGroups = FROM_TO_GROUPS.map((g) => {
    g.onEntryChanged = filterGroupsCallbackHandler;
    return g;
  });

  // #region event handlers
  function handleItemOrderChanged(checked: boolean, order: string) {
    console.log(checked, order);
    return;
  }

  function onAcceptChallengeClicked(opts: Challenge) {
    let url = `/accept/${opts.id}`;
    navigate(url, {
      state: {
        challenge_id: opts.id,
      },
    });
  }

  function onRemoveFilter(node: FromToFilterData) {
    if (node.pid === "clear") return setFilters([]);

    let fs = [...filters];
    fs = fs.filter((item) => item.pid !== node.pid);
    setFilters(fs);
  }

  //#endregion

  //#region workers

  function filterGroupsCallbackHandler(opts: FromToFilterData) {
    let fs = [...filters];

    // check if the current filter object has already been created
    let f = fs.filter((v) => v.pid === opts.pid);

    // if it hasn't been created, create it
    if (f.length === 0) {
      fs.push(opts);
    } else {
      // if it has been created,
      // update that entry with the new data
      let i = fs.indexOf(f[0]);
      fs[i] = opts;
    }

    // set the newly updated data
    setFilters(fs);
  }

  // #endregion

  useEffect(() => {
    // every time the filters change, search for new items
    // this would just refetch the db with the new items
    // rather than filter in place, that is just easier on god.
    // although this may cause a lot of db resource usage, but no wahala.

    // this is very BAD PROGRAMMING !!!
    
    // fetch all active challenges
    fetchChallenges({
      quantity: 10,
      filters: filters,
      pool: "active",
    })
      .then((ch) => setChallenges(ch))
      .catch((e) => console.error(e));
  }, [filters]);

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
                        id="asc1"
                        name="order"
                        value="asc"
                        className="mr-4 mt-1"
                        onChange={(e) =>
                          handleItemOrderChanged(
                            e.target.checked,
                            e.target.value
                          )
                        }
                      />
                      <label htmlFor="asc1">Oldest First</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="desc1"
                        name="order"
                        value="desc"
                        className="mr-4 mt-2"
                        onChange={(e) =>
                          handleItemOrderChanged(
                            e.target.checked,
                            e.target.value
                          )
                        }
                      />
                      <label htmlFor="desc1">Newest First</label>
                    </div>
                  </fieldset>
                </Accordion>

                {filterGroups.map((filter, index) => {
                  return (
                    <FromToFilterEntry
                      key={index}
                      title={filter?.title}
                      onEntryChanged={filter.onEntryChanged}
                      pid={filter.pid}
                    />
                  );
                })}
              </div>

              {/* filter results */}
              <div className="filter-results filter-box overflow-scrollbar">
                <div className="filter-options">
                  <FilterBar
                    filters={filters}
                    onRemoveFilter={onRemoveFilter}
                  />
                </div>

                {/* card region */}
                <div className="challenge-cards-holder">
                  {challenges.map((c, index) => {
                    return (
                      <FindChallengeCard
                        key={index}
                        view="browse"
                        challenge={c}
                        btnClickedCallback={onAcceptChallengeClicked}
                      />
                    );
                  })}

                  {challenges.length === 0 && (
                    <InlineAlert
                      color="warning"
                      open={challenges.length === 0}
                      text="No challenges found, refine search parameters"
                      onClose={() => {}}
                    />
                  )}
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
