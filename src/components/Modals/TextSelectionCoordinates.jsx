import React, { useEffect, useState } from "react";

const TextSelectionCoordinates = ({ rendition }) => {
  const [selectedTextCoords, setSelectedTextCoords] = useState({ x: 0, y: 0 });
  const [selectedColor, setSelectedColor] = useState(null);
  const [lastCfiRange, setLastCfiRange] = useState(null);

  useEffect(() => {
    const handleTextSelection = (cfiRange) => {
      const range = rendition.getRange(cfiRange);

      if (range) {
        // Clear all previous highlights

        const rect = range.getBoundingClientRect();
        setSelectedTextCoords({ x: rect.x, y: rect.y });
        const selectedText = range.toString();

        console.log(cfiRange);
        console.log("Selected Text:", selectedText);

        setLastCfiRange(cfiRange);
      } else {
        // No valid selection, hide the div
        setLastCfiRange(null);
        setSelectedTextCoords({ x: 0, y: 0 });
      } // Update the lastCfiRange
    };

    if (rendition) {
      rendition.on("selected", handleTextSelection);
    }

    return () => {
      if (rendition) {
        rendition.off("selected", handleTextSelection);
        setSelectedTextCoords({ x: 0, y: 0 });
      }
    };
  }, [rendition, selectedColor]);

  const handleColorSelection = (color) => {
    setSelectedColor(color);

    // Manually trigger the highlighting when color is selected
    // Clear all previous highlights
    if (lastCfiRange && rendition.annotations._annotations) {
      const keyToDelete = lastCfiRange + "highlight";

      rendition.annotations.highlight(
        lastCfiRange,
        {},
        (e) => {
          console.log(e);
        },
        undefined,
        { fill: color }
      );

      // Reset selectedTextCoords to hide the div
      setSelectedTextCoords({ x: 0, y: 0 });
      rendition.display(lastCfiRange);
    }
  };

  return (
    <div
      className={
        selectedTextCoords.x === 0 && selectedTextCoords.y === 0 ? "hidden" : ""
      }
      style={{
        position: "absolute",
        left: `44%`,
        top: `${selectedTextCoords.y}px`,
      }}
    >
      <div className="max-w-sm p-6 border border-gray-200 rounded-lg bg-gray-100 gap-2.5 flex">
        <div
          className="w-5 h-5 rounded-full bg-lime-500 cursor-pointer"
          onClick={() => handleColorSelection("#00FF00")} // Lime Green
        ></div>
        <div
          className="w-5 h-5 rounded-full bg-green-700 cursor-pointer"
          onClick={() => handleColorSelection("#008000")} // Green
        ></div>
        <div
          className="w-5 h-5 rounded-full bg-sky-800 cursor-pointer"
          onClick={() => handleColorSelection("#87CEEB")} // Sky Blue
        ></div>
        <div
          className="w-5 h-5 rounded-full bg-violet-900 cursor-pointer"
          onClick={() => handleColorSelection("#8A2BE2")} // Violet
        ></div>
      </div>
    </div>
  );
};

export default TextSelectionCoordinates;
