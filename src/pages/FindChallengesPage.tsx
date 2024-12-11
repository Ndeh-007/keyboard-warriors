import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FindChallengesTabContent from "../components/FindChallengesTabContent";
import { CustomTabs } from "../components/Singletons";

const FindChallengesPage: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <Header />

      {/* page body */}
      <div className="challenges-body">
        <div>
          <div className="light-background">
            <CustomTabs
              leftEntries={[
                {
                  title: "Browse Challenges",
                  component: <FindChallengesTabContent />,
                },
              ]}
              rightEntries={[
                {
                  title: "Issue Challenge",
                  component: <div>Issue Challenge</div>,
                },
              ]}
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

export default FindChallengesPage;
