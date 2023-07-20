"use client";
import TabHeading from "./TabHeading";

const TabHeadingCollection = ({ tabDataArray, setVisible, visible }) => {
  const handleClick = (id) => {
    // make a tab with a given ID visible
    setVisible(id);
  };
  return (
    <div className="flex items-center space-x-10 md:space-x-20 border-b-[1px]">
      {tabDataArray.map(({ id, heading }) => (
        <TabHeading
          text={heading}
          clickHandler={() => handleClick(id)}
          id={id}
          visible={visible}
        />
      ))}
    </div>
  );
};

export default TabHeadingCollection;
