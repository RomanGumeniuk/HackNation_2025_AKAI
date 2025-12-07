"use client";
import Background from '@/components/details_page/Background'
import { SocketContext } from "@/contexts/SocketContext";
import { composeMessage } from "@/socket";
import { Upload, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";

const page = () => {
  const [file, setFile] = useState<null | File>(null);
  const [aiReady, setAiReady] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const socket = useContext(SocketContext);

  const handleFile: ChangeEventHandler<HTMLInputElement> = (ev) => {
    //@ts-ignore
    const selectedFile = ev.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragOver(false);
    const droppedFile = ev.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragOver(false);
  };

  useEffect(() => {
    async function setup() {
      if (aiReady) return;
      setIsUploading(true);
      const formData = new FormData();
      formData.set("file", new Blob([file as File]));
      const upload = await fetch("http://127.0.0.1:3000/upload", {
        method: "POST",
        body: formData,
      });

      const fileContnets = (await upload.json()).data;

      socket.emit(
        "query",
        composeMessage("load", fileContnets, undefined, true)
      );

      socket.on("response", () => {
        setAiReady(true);
      });
    }

    setup();

    if (file && aiReady) {
      socket.emit("query", composeMessage("title"));
      socket.emit("query", composeMessage("summarize"));
      socket.emit("query", composeMessage("rate"));

      socket.on("response", (ev) => {
        switch (ev.task) {
          case "title":
            setTitle(ev.response.content);
            break;
          case "summarize":
            setSummary(ev.response.content);
            break;
          case "rate":
            setRating(ev.response.content);
            break;
        }
        setIsUploading(false);
      });
    }
  }, [file, aiReady]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="min-h-screen bg-[#EDEFEE]">
      {!file && (
        <div className="flex flex-col items-center px-4 pt-24 pb-12">
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Analiza dokumentów legislacyjnych
              </h1>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative bg-white rounded-lg border-2 border-dashed transition-all duration-300 ${
                isDragOver
                  ? "border-gray-400 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="p-10">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-lg flex items-center justify-center transition-colors ${
                        isDragOver ? "bg-gray-100" : "bg-gray-50"
                      }`}
                    >
                      <FileText
                        className={`w-8 h-8 transition-colors ${
                          isDragOver ? "text-gray-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-base font-medium text-gray-700">
                      {isDragOver
                        ? "Upuść dokument tutaj"
                        : "Przeciągnij i upuść dokument PDF"}
                    </p>
                    <p className="text-sm text-gray-500">lub</p>
                  </div>

                  <div className="flex flex-col items-center gap-3 w-full">
                    <label className="w-full max-w-xs cursor-pointer">
                      <span className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                        <Upload className="w-4 h-4" />
                        Wybierz plik
                      </span>
                      <input
                        type="file"
                        onChange={handleFile}
                        accept="application/pdf"
                        className="hidden"
                      />
                    </label>

                    <p className="text-xs text-gray-500">
                      Maksymalny rozmiar: 10 MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isUploading && file && (
        <div className="flex flex-col min-h-screen justify-center items-center px-4 py-12 bg-[#EDEFEE]">
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-lg shadow-sm p-10 border border-gray-200">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-[#394788]/10 rounded-lg">
                <div className="w-10 h-10 border-4 border-[#394788] border-t-transparent rounded-full animate-spin"></div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Przetwarzanie dokumentu
              </h2>
              <p className="text-gray-600 text-center mb-8">
                System analizuje przesłany plik PDF
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Status:
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#394788] rounded-full animate-pulse"></div>
                      <span className="text-base font-semibold text-[#394788]">
                        Wczytywanie dokumentu...
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden mt-3">
                    <div
                      className="bg-[#394788] h-1.5 rounded-full transition-all duration-500"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Rozmiar pliku
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Format
                    </p>
                    <p className="text-lg font-bold text-gray-900">PDF</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2 text-center">
                  Nazwa dokumentu
                </p>
                <p className="text-sm font-medium text-gray-900 text-center break-all px-4">
                  {file.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isUploading && file && (
        <div className="min-h-screen bg-[#EDEFEE] py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center items-center">
              <h1 className="m-5 text-[2rem] font-bold leading-snug text-gray-900">
                {title}
              </h1>
            </div>

            {summary && <Background>
              <div className="leading-relaxed text-sm space-y-4 prose prose-sm max-w-none">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </Background>}
        
            {rating && (
              <>
                <div className="flex justify-center items-center m-5">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Analiza wpływu ustawy przez naszego Asystenta Ai
                  </h1>
                </div>

                <Background>
                  <div className="leading-relaxed text-sm space-y-4 prose prose-sm max-w-none">
                    <ReactMarkdown>{rating}</ReactMarkdown>
                  </div>
                </Background>

                <div className="flex justify-center m-6">
                  <button
                    className="px-8 py-3 bg-[#394788] text-white font-semibold text-lg rounded-lg hover:bg-[#394788]/90 transition-all shadow-lg hover:shadow-xl"
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setTitle("");
                      setSummary("");
                      setRating("");
                      aiReady(false);
                    }}
                  >
                    Wgraj następny plik
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;