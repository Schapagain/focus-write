import React, { useEffect, useState } from "react";

const ESCAPE_KEY = 27;

export default function DocumentTitle({ title, onChange }) {
  const [tempTitle, setTempTitle] = useState(title);
  const [showInput, setShowInput] = useState(false);
  const [originalTitle, setOriginalTitle] = useState(title);

  useEffect(() => {
    setTempTitle(title);
    setOriginalTitle(title);
  }, [title]);

  const handleSave = () => {
    if (tempTitle && tempTitle != originalTitle) {
      onChange(tempTitle);
      setOriginalTitle(tempTitle);
    }
    setShowInput(false);
  };

  const handleDiscard = () => {
    setTempTitle(originalTitle);
    setShowInput(false);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === ESCAPE_KEY) {
      handleDiscard();
    }
  };

  return showInput ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <input
        className="p-1 w-full text-center bg-theme dark:bg-theme-dark focus:outline-none focus:ring-2 focus:ring-blue-300 transition-fast"
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        value={tempTitle || ""}
        onChange={(e) => setTempTitle(e.target.value)}
        autoFocus={true}
      />
    </form>
  ) : (
    <div
      className="text-xl w-full h-full truncate"
      onClick={() => setShowInput(true)}
    >
      {tempTitle}
    </div>
  );
}

DocumentTitle.defaultProps = {
  onChange: () => null,
};
