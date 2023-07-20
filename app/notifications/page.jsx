"use client";
import TabCollection from "../_components/TabCollection";
import { notificationPageTabsData } from "../data";

const Program = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">Notifications</h2>
      <TabCollection tabDataArray={notificationPageTabsData}>
        <div>
          <p>You have no nofitications</p>
        </div>
        <div>
          <p>You have no hidden nofitications</p>
        </div>
      </TabCollection>
    </div>
  );
};

export default Program;
