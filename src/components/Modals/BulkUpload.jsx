import React, { useState } from "react";
import "../style/Modals.css";
import { BiXCircle } from "react-icons/bi";

import { Input } from "../../components/ui/input";
import ePub from "epubjs";

export const BulkUpload = ({ isOpen, handleCloseModal }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const handleUpload = () => {
    if (!files.length) {
      console.log("No files selected");
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append(`file${i + 1}`, files[i]);
    }

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    const bookDetailsPromises = files.map(async (file, index) => {
      const bookInfo = await parseEpub(file);
      return { ...bookInfo, index };
    });

    Promise.all(bookDetailsPromises)
      .then((bookDetails) => {
        // Handle the fetched book details here
        console.log("Fetched book details:", bookDetails);
        setMsg("Upload successful");
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
        setMsg("Error fetching book details");
      });
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
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className=" z-40 fixed h-full flex w-full top-0 opacity-background modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="height70 modal bg-white m-auto w-2/5 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="flex justify-between p-y-1-x-2">
                <div></div>
                <h2 className="text-2xl">Upload Books :)</h2>
                <div className="modal-close" onClick={handleCloseModal}>
                  <BiXCircle className="cursor-pointer text-2xl" />
                </div>
              </div>
              <div>
                <div className="drop-zone">
                  <Input
                    id="picture"
                    className="cursor-pointer"
                    multiple
                    onChange={(e) => {
                      setFiles([...e.target.files]);
                    }}
                    placeholder="add more books"
                    accept=".epub"
                    type="file"
                  />
                  <button onClick={handleUpload}>Upload</button>

                  {msg && <span>{msg} </span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
