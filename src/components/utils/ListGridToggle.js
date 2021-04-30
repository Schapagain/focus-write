import React from "react";
import { FaBars, FaThLarge } from "react-icons/fa";
import classNames from "classnames";

const Tab = ({ tab, Icon, setCurrentView, currentView }) => {
  const classes = classNames("transition-normal", {
    [`hover:bg-white cursor-pointer ml-2 hover:text-theme p-3`]: true,
    [`bg-theme text-white`]: currentView !== tab,
    [`bg-white text-theme`]: currentView === tab,
  });
  return (
    <li
      className={classes}
      onClick={(e) => {
        e.preventDefault();
        setCurrentView(tab);
      }}
      role="tab"
    >
      <Icon />
    </li>
  );
};

const tabs = [
  { tab: "list", icon: FaBars },
  { tab: "grid", icon: FaThLarge },
];

/**
 *
 * @param {Object} props - Configurations for the list-grid toggle
 * @param {String} props.color - theme color (used on active and hover states)
 * @param {String} props.currentView - list / grid
 * @param {Function} props.setCurrentView - callback to switch views
 * @returns
 */
export default function ViewSelector(props) {
  return (
    <ul className="my-2 flex overflow-hidden justify-center" role="tablist">
      {tabs.map((tab, index) => (
        <Tab {...props} tab={tab.tab} key={index} Icon={tab.icon} />
      ))}
    </ul>
  );
}
