import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FromToFilterData } from "../core/interfaces/components";
import {
  CustomTabs,
  FilterBar,
  FromToFilterEntry,
} from "../components/Singletons";
import { Challenge } from "../core/interfaces/data";
import { FROM_TO_GROUPS } from "../core/utils/variables";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../core/routes";
import { Accordion } from "@mui/material";
import FindChallengeCard from "../components/FindChallengeCard";
import { fetchChallenges } from "../core/apis/challenges";

const MyChallengesTabContent: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filters, setFilters] = useState<FromToFilterData[]>([]);

  let navigate = useNavigate();

  const filterGroups = FROM_TO_GROUPS.map((g) => {
    g.onEntryChanged = filterGroupsCallbackHandler;
    return g;
  });

  // #region event handlers
  function handleItemOrderChanged(checked: boolean, order: string) {
    console.log(checked, order);
    return;
  }

  function onDeleteChallengeClicked(opts: Challenge) {
    let url = APP_ROUTES["delete"].url + `/${opts.id}`;
    navigate(url, {
      state: { challenge_id: opts.id },
    });
  }

  function onRemoveFilter(node: FromToFilterData) {
    if (node.pid === "clear") return setFilters([]);

    let fs = [...filters];
    fs = fs.filter((item) => item.pid !== node.pid);
    setFilters(fs);
  }

  // #endregion

  // #region workers

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
    // fetch all user challenges
    fetchChallenges({
      quantity: 10,
      filters: filters,
      pool: "user",
    })
      .then((ch) => setChallenges(ch))
      .catch((e) => console.error(e));
  }, [filters]);

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
                    onChange={(e) =>
                      handleItemOrderChanged(e.target.checked, e.target.value)
                    }
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
                    onChange={(e) =>
                      handleItemOrderChanged(e.target.checked, e.target.value)
                    }
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
                  onEntryChanged={filter.onEntryChanged}
                  pid={filter.pid}
                />
              );
            })}
          </div>

          {/* filter results */}
          <div className="filter-results filter-box overflow-scrollbar">
            <div className="filter-options">
              <FilterBar filters={filters} onRemoveFilter={onRemoveFilter} />
            </div>

            {/* card region */}
            <div className="challenge-cards-holder">
              {challenges.map((c, index) => {
                return (
                  <FindChallengeCard
                    key={index}
                    view="personal"
                    challenge={c}
                    btnClickedCallback={onDeleteChallengeClicked}
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

const UserProfilePage: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <Header />

      {/* page body */}
      <div className="challenges-body">
        <div className="mt-4">
          <div className="light-background">
            <CustomTabs
              leftEntries={[
                {
                  title: "My Challenges",
                  component: <MyChallengesTabContent />,
                },
              ]}
              rightEntries={[]}
              thinHeader={true}
            ></CustomTabs>
          </div>
        </div>
      </div>

      {/* The page footer */}
      <Footer />
    </div>
  );
};

export default UserProfilePage;
