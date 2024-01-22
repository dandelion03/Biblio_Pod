import React, { useState } from "react";
import axios from "axios";
import ePub from "epubjs";
import { BookDisplay } from "../components/BookDisplay";
import { ContinueReading } from "../components/ContinueReading";
import { Input } from "../components/ui/input";
import "../index.css";
import { MdNavigateNext } from "react-icons/md";
import { BsListColumnsReverse } from "react-icons/bs";
import { NewNav } from "../components/NewNav";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
export const HomePage = () => {
  const [fileDetails, setFileDetails] = useState([]);
  const [bookGoogle, setbookGoogle] = useState([]);
  const selectedBook = JSON.parse(localStorage.getItem("selectedBook"));

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      try {
        const updatedFileDetails = [];
        const updatedBookGoogleDetails = []; // New array to store bookGoogle details for each file

        for (const file of files) {
          const bookInfo = await parseEpub(file);
          const additionalDetails = await fetchBookDetails(
            bookInfo.title,
            bookInfo.author,
            bookInfo.language
          );
          const combinedDetails = { ...bookInfo, ...additionalDetails };
          updatedFileDetails.push(combinedDetails);

          // Store the bookGoogle details for each file
          updatedBookGoogleDetails.push({ ...additionalDetails });
        }

        setFileDetails((prevFileDetails) => [
          ...prevFileDetails,
          ...updatedFileDetails,
        ]);

        // Update the state with the stored bookGoogle details
        setbookGoogle(updatedBookGoogleDetails);
      } catch (error) {
        console.error("Error processing ePub files:", error);
      }
    }
  };

  const parseEpub = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const book = ePub(reader.result);
          await book.ready;

          const meta = book.package.metadata;

          const bookInfo = {
            title: meta.title || "Unknown Title",
            author: meta.creator || "Unknown Author",
            publisher: meta.publisher || "Unknown Publisher",
            language: meta.language || "en",
          };

          resolve(bookInfo);
          console.log(bookInfo);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const fetchBookDetails = async (title, author, language) => {
    const urlApi = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+
    inauthor:${author}&printType=books&langRestrict=en`;

    console.log(urlApi);
    try {
      const response = await axios.get(urlApi);
      const bookDetails = response.data.items[0]?.volumeInfo;
      setbookGoogle(bookDetails);
      return {
        thumbnail: bookDetails?.imageLinks?.thumbnail || "",
        description: bookDetails?.description || "No description available",
        id: bookDetails?.industryIdentifiers[0].identifier || "No id available",
      };
    } catch (error) {
      console.error("Error fetching book details from Google API:", error);
      return {};
    }
  };
  console.log(fileDetails);

  return (
    <>
      <NewNav />
      <div
        className={`library-container ${selectedBook === null ? "m-auto" : ""}`}
      >
        <ContinueReading />

        {fileDetails.length > 0 ? (
          <div className="library-not-empty-to-show-the-fucking-add-book-input default-width">
            <div className="lib-title">My Library</div>
            <div className="input-centered ">
              <Input
                id="picture"
                className="cursor-pointer"
                onChange={handleFileChange}
                placeholder="add more books"
                multiple
                accept=".epub"
                type="file"
              />
            </div>
          </div>
        ) : (
          <div className="lib-title default-width">My Library</div>
        )}
        <div className="main-page-coll-pt line-heightx4 w-full default-width">
          <hr />
          <div className="main-page-coll-pt-inner flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <div className="text-white bg-black  rounded-full flex justify-center items-center w-8 h-8">
                <BsListColumnsReverse />
              </div>
              <div>Collections</div>
            </div>
            <div>
              <Link to="/Collections">
                <MdNavigateNext className="cursor-pointer" />
              </Link>
            </div>
          </div>
          <hr />
        </div>
        <div className="lib-inner-container default-width ">
          <div className="lib-books-container ">
            {fileDetails.length > 0 ? (
              fileDetails.map((book, index) => (
                <div key={index}>
                  <BookDisplay
                    title={book.title}
                    author={book.author}
                    img={book.thumbnail}
                    identifier={book.id || "No identifier available"} // Use the 'id' property you fetched from the Google API
                    description={book.description}
                  />
                </div>
              ))
            ) : (
              <div className="empty-Lib-container ">
                <div className="bold-sub-head">Your Library is Empty!</div>
                <div>
                  add as many books as you want by dropping the epub files or
                  select them from your local storage
                </div>
                <div className="input-centered ">
                  <Input
                    id="picture"
                    className="cursor-pointer"
                    multiple
                    onChange={handleFileChange}
                    accept=".epub"
                    type="file"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 pb-20 "></div>
        </div>
      </div>
      <Footer />
    </>
  );
};
