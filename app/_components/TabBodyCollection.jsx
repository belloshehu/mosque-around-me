"use client";
import TabBody from "./TabBody";

const TabBodyCollection = ({ tabDataArray, visible, children }) => {
  return (
    <div className="flex space-x-5">
      {tabDataArray.map(({ id }, index) => (
        <TabBody children={children[index]} id={id} visible={visible} />
      ))}
    </div>
  );
};

export default TabBodyCollection;
