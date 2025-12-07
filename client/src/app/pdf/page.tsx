"use client";
import Background from '@/components/details_page/Background'
import { SocketContext } from "@/contexts/SocketContext";
import { composeMessage } from "@/socket";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";

const page = () => {
  const [file, setFile] = useState<null | File>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState("");

  const socket = useContext(SocketContext);

  const handleFile: ChangeEventHandler<HTMLInputElement> = (ev) => {
    //@ts-ignore
    setFile(ev.target.files[0]);
  };

  const handleAnalyze: MouseEventHandler<HTMLButtonElement> = (ev) => {};

  useEffect(() => {
    async function setup() {
      return new Promise<void>((resolve) => {
        let fileContnets;
        const formData = new FormData();
        formData.set("file", new Blob([file as File]));
        // Build proper upload URL with protocol
        const uploadUrl = `http://${window.location.hostname}:8080/upload`;
        console.log('Upload URL:', uploadUrl);
        fetch(uploadUrl, {
          method: "POST",
          body: formData,
        }).then((res) => {
          res.json().then((json) => (fileContnets = json.data));
        });

        socket.emit(
          "query",
          composeMessage("load", fileContnets, undefined, true)
        );

        socket.on("response", () => {
          resolve();
        });
      });
    }

    if (file) {
      setup();
      socket.emit("query", composeMessage("title"));
      socket.emit("query", composeMessage("summarize"));
      socket.emit("query", composeMessage("rate"));

      socket.on("response", (ev) => {
        switch (ev.task) {
          case "title":
            setTitle(ev.response.content);
            break;
          case "summarize":
            setTitle(ev.response.content);
            break;
          case "rate":
            setTitle(ev.response.content);
            break;
        }
      });
    }
  }, [file]);

  return (
    <div>
      <div className={"flex justify-top items-center flex-col h-screen"}>
        <h1 className={"mb-3 text-2 font-bold"}>Wgraj plik PDF</h1>

        <input
          type="file"
          onChange={handleFile}
          accept="application/pdf"
          className={"border p-2 rounded"}
        />
      </div>
      <div>
        <div className="flex justify-center items-center">
          <h1 className="ml-5 text-2xl font-bold leading-snug">{title}</h1>
        </div>

        <Background>
          <div className="leading-relaxed text-sm space-y-4">{summary}</div>
        </Background>
        <div className="flex justify-center m-2">
          <button
            className={
              " m-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            }
            type="button"
            onClick={handleAnalyze}
          >
            Poproś naszego asystena o anilizę tej ustawy
          </button>
        </div>
        {rating && (
          <Background>
            <div className="leading-relaxed text-sm space-y-4">{rating}</div>
          </Background>
        )}
      </div>
      ;
    </div>
  );
};

export default page;