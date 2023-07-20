"use client";
import React, { useState, useEffect } from "react";
import TabHeadingCollection from "./TabHeadingCollection";
import TabBodyCollection from "./TabBodyCollection";

const TabCollection = ({ tabDataArray, children }) => {
  // show the first tab
  const [visible, setVisible] = useState(tabDataArray[0].id);
  useEffect(() => {}, [visible]);

  return (
    <section className="w-full flex flex-col space-y-5 mt-4">
      <TabHeadingCollection
        tabDataArray={tabDataArray}
        setVisible={setVisible}
        visible={visible}
      />
      <TabBodyCollection
        children={children}
        tabDataArray={tabDataArray}
        visible={visible}
      />
    </section>
  );
};

export default TabCollection;
