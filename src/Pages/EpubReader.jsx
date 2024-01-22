import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ePub from "epubjs";
import axios from "axios";
import "../index.css";
import { CiBookmark } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineFullscreen } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FiMoon } from "react-icons/fi";
import { CircularProgress } from "@nextui-org/react";
import { BiHomeAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import TextSelectionCoordinates from "../components/Modals/TextSelectionCoordinates";
import { ReaderMenu } from "../components/Modals/ReaderMenu";

function EpubReader() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookValue = searchParams.get("book");
  console.log(bookValue);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentCFI, setCurrentCFI] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [book, setBook] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTextCoords, setSelectedTextCoords] = useState({ x: 55, y: 0 });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${bookValue}`
        );
        const bookInfo = response.data.items[0].volumeInfo;
        setBookData(bookInfo);
        console.log(bookInfo);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBook();
  }, [bookValue]);

  useEffect(() => {
    const loadBook = async () => {
      if (!bookData) {
        console.error("Invalid book or missing EPUB link");
        return;
      }

      try {
        const response = await fetch("test3.epub");
        const arrayBuffer = await response.arrayBuffer();
        const newBook = ePub(arrayBuffer);

        await newBook.ready;
        setBook(newBook);
        if (newBook.locations.total === 0) {
          await newBook.locations.generate(1024);
        }

        renderBook(newBook);
      } catch (error) {
        console.error("Error loading book:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [bookData]);

  const renderBook = (loadedBook) => {
    if (!loadedBook) {
      return;
    }

    const newRendition = loadedBook.renderTo("viewer", {
      width: "100%",
      height: "90vh",
      ignoreClass: "annotator-hl",
      manager: "default",
    });

    newRendition.display();
    console.log(newRendition);

    setRendition(newRendition);

    newRendition.themes.register("dark", {
      body: { background: "black", color: "white" },
    });
    newRendition.themes.register("default", {
      body: {
        background: "white",
        color: "black",
        
      },
    });
    newRendition.themes.select(isDarkTheme ? "dark" : "default");
  };

  useEffect(() => {
    const savedCFI = localStorage.getItem("currentCFI");

    if (rendition && savedCFI) {
      rendition.display(savedCFI);
    }
  }, [rendition]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextBtn();
      } else if (event.key === "ArrowLeft") {
        backBtn();
      }
    };

    if (rendition) {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [rendition]);

  const nextBtn = () => {
    if (rendition) {
      rendition.next();
      const newCFI = rendition.location.start.cfi;
      const newPercentage =
        rendition.book.locations.percentageFromCfi(newCFI) * 100;
      setCurrentCFI((prevCFI) => {
        localStorage.setItem("currentCFI", newCFI);
        localStorage.setItem("currentPercentageFromCFI", newPercentage);
        return { newCFI, newPercentage };
      });
    }
  };

  const backBtn = () => {
    if (rendition) {
      rendition.prev();
      const newCFI = rendition.location.start.cfi;
      const newPercentage =
        rendition.book.locations.percentageFromCfi(newCFI) * 100;
      setCurrentCFI((prevCFI) => {
        localStorage.setItem("currentCFI", newCFI);
        localStorage.setItem("currentPercentageFromCFI", newPercentage);
        return { newCFI, newPercentage };
      });
    }
  };
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (rendition) {
      rendition.themes.select(isDarkTheme ? "default" : "dark");
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedBook", JSON.stringify(bookData));
  }, [bookData]);
  const toggleFullscreen = () => {
    const root = document.getElementById("root");
    if (root) {
      if (isFullscreen) {
        document.exitFullscreen();
      } else {
        root.requestFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress size="lg" label="Loading..." />
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="addBook-error-handle">
        <p>Sorry, we don't have this book.</p>
        <div>
          <input type="file" accept=".epub" />
          <button>Add to Collection</button>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkTheme ? "dark h-lvh	" : "default h-lvh	"}>
      <div className="titlebar">
        <TextSelectionCoordinates rendition={rendition} />

        <div className="flex gap-5">
          <Link to="/">
            <BiHomeAlt2 className="icon-bookmark-empty" />
          </Link>
          <ReaderMenu
            book={book}
            rendition={rendition}
            className="icon-bookmark-empty"
            bookValue={bookValue}
          />
        </div>

        <div id="metainfo">
          <span id="book-title">{bookData.authors}</span>
          <span id="title-separator">&nbsp;&nbsp;–&nbsp;&nbsp;</span>
          <span id="chapter-title">{bookData.title}</span>
        </div>
        <div id="title-controls">
          <a
            onClick={toggleTheme}
            id="darkmode"
            className=" cursor icon-resize-full"
          >
            <FiMoon />
          </a>
          <a id="bookmark" className="icon-bookmark-empty">
            <CiBookmark />
          </a>
          <a id="setting" className="icon-cog">
            <IoSettingsOutline />
          </a>
          <a
            id="fullscreen"
            onClick={toggleFullscreen}
            className="icon-resize-full cursor"
          >
            <AiOutlineFullscreen />
          </a>
        </div>
      </div>

      <div className={isDarkTheme ? "dark" : "default"}>
        <div
          id="divider"
          className={
            !book ? "hidden" : `show ${isDarkTheme ? "lightDivider" : ""}`
          }
        />
        <div
          id="viewer"
          className={`epub-viewer ${isFullscreen ? "h-lvh	" : ""}`}
        />

        <button
          className={
            !book
              ? "hidden"
              : `prev reset-btn ${isDarkTheme ? "light-button" : ""}`
          }
          onClick={backBtn}
        >
          <GrPrevious />
        </button>
        <button
          className={
            !book
              ? "hidden"
              : `next reset-btn ${isDarkTheme ? "light-button" : ""}`
          }
          onClick={nextBtn}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
}

export default EpubReader;
