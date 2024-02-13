import React, { useEffect, useState } from "react";
import { ReaderMenu } from "./ReaderMenu";
import { EpubReaderDrawer } from "../EpubReaderComponents/EpubReaderDrawer";

const TextSelectionCoordinates = ({ rendition, setForceUpdate, book, bookValue }) => {
  const [state, setState] = useState({
    selectedTextCoords: { x: 0, y: 0 },
    selectedText: "",
    selectedColor: null,
    lastCfiRange: null,
  });

  useEffect(() => {
    const handleTextSelection = (cfiRange) => {
      const range = rendition.getRange(cfiRange);

      if (range) {
        const rect = range.getBoundingClientRect();
        setState({
          ...state,
          selectedTextCoords: { x: rect.x, y: rect.y },
          selectedText: range.toString(),
          lastCfiRange: cfiRange,
        });
      } else {
        setState({
          ...state,
          lastCfiRange: null,
          selectedTextCoords: { x: 0, y: 0 },
        });
      }
    };

    if (rendition) {
      rendition.on("selected", handleTextSelection);
    }

    return () => {
      if (rendition) {
        rendition.off("selected", handleTextSelection);
        setState({
          selectedTextCoords: { x: 0, y: 0 },
          selectedText: "",
          selectedColor: null,
          lastCfiRange: null,
        });
      }
    };
  }, [rendition, state.selectedColor]);

  const handleColorSelection = (color) => {
    setForceUpdate({});

    if (state.lastCfiRange && rendition.annotations._annotations) {
      const keyToDelete = state.lastCfiRange + "highlight";

      rendition.annotations.highlight(
        state.lastCfiRange,
        {},
        (e) => {
          console.log(e);
        },
        undefined,
        { fill: color }
      );

      setState({
        ...state,
        selectedTextCoords: { x: 0, y: 0 },
        selectedText: "",
      });

      rendition.display(state.lastCfiRange);
    }
  };

  return (
    <>
      <ReaderMenu
        book={book}
        bookValue={bookValue}
        rendition={rendition}
        selectedText={state.selectedColor}
        className="icon-bookmark-empty"
      />

      <div
        className={`${
          state.selectedText === "" ? "hidden" : ""
        }`}
        style={{
          position: "absolute",
          left: `44%`,
          top: `${state.selectedTextCoords.y}px`,
        }}
      >
        <div className="h-8 items-center px-1 max-w-sm  border border-gray-200 rounded-lg bg-gray-100 gap-2.5 flex">
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
          <div className="h-full">
            <EpubReaderDrawer setSelectedColor={handleColorSelection} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextSelectionCoordinates;
