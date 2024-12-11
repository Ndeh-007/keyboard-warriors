import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyChallengesTabContent from "../components/MyChallengesTabContent";
import { TabEntry } from "../core/interfaces/components";
import { CustomTabs } from "../components/Singletons";

const UserProfilePage: React.FC = () => {
  const leftEntries: TabEntry[] = [
    { title: "My Challenges", component: <MyChallengesTabContent /> },
  ]; 
  return (
    <div className="w-full h-screen">
      <Header />

      {/* page body */}
      <div className="challenges-body">
        <div className="mt-4">
          <div className="light-background">
            <CustomTabs
              leftEntries={leftEntries}
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
