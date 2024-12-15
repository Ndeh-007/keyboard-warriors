import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  FromToFilterData,
  FromToFilterGroup,
  TabEntry,
} from "../core/interfaces/components";

export const Accordion: React.FC<{ title?: string; children?: ReactNode }> = ({
  title,
  children,
}) => {
  const [isVisibile, setIsVisible] = useState<boolean>(false);

  // toggle the accordion view state
  function handleAccordionHeaderClicked() {
    let state = !isVisibile;
    setIsVisible(state);
  }
  return (
    <div className="accordion">
      <div
        className="accordion-header"
        onClick={() => handleAccordionHeaderClicked()}
      >
        <div className="accordion-header-text">{title}</div>
        <div className="accordion-header-icon">
          {isVisibile ? (
            <span className="material-icons">keyboard_arrow_up</span>
          ) : (
            <span className="material-icons">keyboard_arrow_down</span>
          )}
        </div>
      </div>
      {isVisibile && <div className="accordion-body">{children}</div>}
    </div>
  );
};

export const FromToFilterEntry: React.FC<FromToFilterGroup> = ({
  title,
  pid,
  onEntryChanged,
}) => {
  const [entries, setEntries] = useState<FromToFilterData>({
    pid: pid ? pid : "",
    from: undefined,
    to: undefined,
    text: "",
  });

  function collectInputValues(target: "from" | "to", value: string) {
    let v = parseFloat(value);
    let opts = { ...entries };

    // check if correct data was passed into the collectors
    opts[target] = isNaN(v) ? undefined : v;

    // create the search string to be shown in the chip
    const _parseStr = (_v: number | undefined) =>
      _v === undefined ? "" : `${_v}`;
    opts["text"] = `${opts["pid"]}: ${_parseStr(opts["from"])} - ${_parseStr(
      opts["to"]
    )}`;

    // trigger the on entry changed callback
    onEntryChanged(opts);

    // update the current entries
    setEntries(opts);
  }

  function clearEntries() {
    let e = { ...entries };
    e.from = undefined;
    e.to = undefined;
    setEntries(e);
  }

  return (
    <Accordion title={title}>
      <div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="from"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => collectInputValues("from", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="to"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => collectInputValues("to", e.target.value)}
          />
        </div>
      </div>
    </Accordion>
  );
};

export const FilterNode: React.FC<{
  data: FromToFilterData;
  onCancelClicked: (node: FromToFilterData) => any;
  mode: "clear" | "full";
}> = ({ data, onCancelClicked, mode }) => {
  return (
    <div
      className={`filter-node filter-node-${mode}`}
      onClick={() => onCancelClicked(data)}
    >
      <div className="filter-node-text">{data.text}</div>
      <div className="filter-node-button">
        {mode === "clear" ? (
          <span className="material-icons">delete</span>
        ) : (
          <span className="material-icons">close</span>
        )}
      </div>
    </div>
  );
};

export const FilterBar: React.FC<{
  filters: FromToFilterData[];
  onRemoveFilter: (data: FromToFilterData) => any;
}> = ({ filters, onRemoveFilter }) => {
  return (
    <div className="filter-bar">
      <div className="dynamic-nodes-holder">
        {filters.map((node, index) => {
          return (
            <FilterNode
              key={index}
              mode="full"
              onCancelClicked={onRemoveFilter}
              data={node}
            />
          );
        })}
      </div>
      <div className="static-nodes-holder">
        <FilterNode
          data={{
            from: undefined,
            to: undefined,
            text: "Clear All",
            pid: "clear",
          }}
          mode="clear"
          onCancelClicked={onRemoveFilter}
        />
      </div>
    </div>
  );
};

const CustomTabHeaderEntry: React.FC<{
  index: number;
  callback: Function;
  text: string;
  activeIndex: number;
  externalIndex?: boolean;
}> = ({ index, callback, text, activeIndex, externalIndex }) => {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    if (externalIndex) return;
    callback(index);
  }

  // change styling of the item every
  // time the active index has changed
  useEffect(() => {
    setIsActive(activeIndex === index);
  }, [activeIndex, index]);

  return (
    <div
      className={`custom-tab-header-entry ${
        isActive ? "active-tab-entry" : ""
      }`}
      onClick={() => handleClick()}
    >
      {text}
    </div>
  );
};

export const CustomTabs: React.FC<{
  leftEntries: TabEntry[];
  rightEntries: TabEntry[];
  thinHeader?: boolean;
  useExternalIndex?: boolean;
  externalIndex?: number;
  fitHeader?: boolean;
}> = ({
  leftEntries,
  rightEntries,
  thinHeader,
  useExternalIndex = false,
  externalIndex = 0,
  fitHeader = false,
}) => {
  const nLeft = leftEntries.length;
  // const nRight = rightEntries.length;

  // const [tabEntries] = useState([...leftEntries, ...rightEntries]);
  const tabEntries = useMemo(
    () => [...leftEntries, ...rightEntries],
    [leftEntries, rightEntries]
  );
  const [currentTabIndex, setCurrentTabIndex] = useState(
    useExternalIndex ? externalIndex : 0
  );

  function assignCurrentIndex(value: number) {
    setCurrentTabIndex(value);
  }

  useEffect(() => {
    if (useExternalIndex) {
      assignCurrentIndex(externalIndex);
    }
  }, [externalIndex, useExternalIndex]);

  return (
    <div className="custom-tabs">
      <div
        className={`custom-tabs-header ${
          fitHeader ? "custom-tabs-header-fit" : ""
        }`}
      >
        <div className={`${thinHeader ? "container mx-auto" : ""}`}>
          <div className={`custom-tabs-header-entries`}>
            <div className="left-header-entries">
              {leftEntries.map((entry, index) => {
                return (
                  <CustomTabHeaderEntry
                    callback={assignCurrentIndex}
                    index={index}
                    key={index}
                    text={entry.title}
                    activeIndex={currentTabIndex}
                    externalIndex={useExternalIndex}
                  />
                );
              })}
            </div>
            <div className="right-header-entries">
              {rightEntries.map((entry, index) => {
                return (
                  <CustomTabHeaderEntry
                    callback={assignCurrentIndex}
                    index={index + nLeft}
                    key={index + nLeft}
                    text={entry.title}
                    activeIndex={currentTabIndex}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="custom-tabs-body">
        {tabEntries[currentTabIndex].component}
      </div>
    </div>
  );
};

export const Card: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className="custom-card">{children}</div>;
};

export const CardHeader: React.FC<{
  children?: ReactNode;
  border?: boolean;
}> = ({ children, border = false }) => {
  return (
    <div className={`${border ? "custom-card-header-border" : ""}`}>
      <div className={"custom-card-header"}>{children}</div>
    </div>
  );
};

export const CardTitle: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className="custom-card-title">{children}</div>;
};

export const CardSubTitle: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return <div className="custom-card-subtitle">{children}</div>;
};

export const CardBody: React.FC<{ children?: ReactNode; border?: boolean }> = ({
  children,
  border = false,
}) => {
  return (
    <div className={border ? "custom-card-body-border" : ""}>
      <div className="custom-card-body .custom-card-body-text">{children}</div>
    </div>
  );
};

export const CardFooter: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return <div className="custom-card-footer">{children}</div>;
};
