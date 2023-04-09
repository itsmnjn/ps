import Image from "next/image";
import notes from "../notes.json";
import { useRef, useState } from "react";
import Head from "next/head";

interface Note {
  timestamp: Date;
  content: string;
}

export default function Home() {
  const formattedNotes = notes.map((note) => {
    return {
      ...note,
      timestamp: new Date(note.timestamp),
    };
  });
  const sortedNotes = formattedNotes.sort((a, b) => {
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const noteContentContainerRef = useRef<HTMLDivElement>(null);
  const [currentNote, setCurrentNote] = useState<Note>(sortedNotes[0]);

  const handleRightCaretClick = () => {
    noteContentContainerRef.current?.scrollTo({ top: 0 });
    const currentIndex = sortedNotes.findIndex(
      (note) => note.timestamp.getTime() === currentNote.timestamp.getTime()
    );
    const nextNote = sortedNotes[currentIndex + 1];
    if (nextNote) {
      setCurrentNote(nextNote);
    } else {
      setCurrentNote(sortedNotes[0]);
    }
  };

  const handleLeftCaretClick = () => {
    noteContentContainerRef.current?.scrollTo({ top: 0 });
    const currentIndex = sortedNotes.findIndex(
      (note) => note.timestamp.getTime() === currentNote.timestamp.getTime()
    );
    const previousNote = sortedNotes[currentIndex - 1];
    if (previousNote) {
      setCurrentNote(previousNote);
    } else {
      setCurrentNote(sortedNotes[sortedNotes.length - 1]);
    }
  };

  const paragraphs = currentNote.content
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <>
      <Head>
        <title>letters for u</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main className="flex flex-col justify-center max-w-md min-h-screen p-4 mx-auto">
        <div className="">
          <h1 className="mb-2 text-center text-light-pink">
            {currentNote.timestamp.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at{" "}
            {currentNote.timestamp.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </h1>

          <div className="flex flex-col h-full gap-y-8">
            <div className="relative flex flex-col h-[30rem] sm:h-[36rem] bg-white pink-shadow rounded-xl">
              <div
                className="flex flex-col flex-grow p-4 pb-8 overflow-y-auto gap-y-2 animate-fadeIn"
                ref={noteContentContainerRef}
              >
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="absolute top-0 left-0 w-[97.5%] h-10 rounded-t-xl bg-gradient-to-t from-transparent to-white" />
              <div className="absolute bottom-0 left-0 w-[97.5%] h-11 rounded-b-xl bg-gradient-to-b from-transparent to-white" />
            </div>

            <div className="flex flex-row justify-between mx-auto gap-x-16">
              <div
                className="flex flex-col items-center justify-center bg-white rounded-full cursor-pointer transition active:translate-y-[3px] w-14 h-14 pink-shadow"
                onClick={handleLeftCaretClick}
              >
                <div className="relative w-5 h-5 right-[1px]">
                  <Image
                    src="/caret-right.svg"
                    fill
                    alt="Left caret"
                    className="rotate-180 select-none"
                  />
                </div>
              </div>

              <div
                className="flex flex-col items-center justify-center bg-white rounded-full cursor-pointer transition active:translate-y-[3px] w-14 h-14 pink-shadow"
                onClick={handleRightCaretClick}
              >
                <div className="relative w-5 h-5 left-[1px]">
                  <Image
                    src="/caret-right.svg"
                    fill
                    alt="Right caret"
                    className="select-none "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
