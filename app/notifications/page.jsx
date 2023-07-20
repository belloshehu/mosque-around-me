"use client";
import TabCollection from "../_components/TabCollection";
import { notificationPageTabsData } from "../data";

const Program = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">Notifications</h2>
      <TabCollection tabDataArray={notificationPageTabsData}>
        <div>Visible nofitications</div>
        <div>Hidden nofitications</div>
      </TabCollection>
    </div>
  );
};

export default Program;
