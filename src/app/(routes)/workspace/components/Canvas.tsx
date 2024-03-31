"use client"

import { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { updateFileById} from "../action";
import { toast } from "sonner";
import Image from "next/image";
import { File } from "@/lib/types";

type DocumentEditorProps = {
  onTriggerSave: boolean;
  fileData: File;
};


const Canvas = ({ onTriggerSave,fileData }: DocumentEditorProps) => {

   const [whiteBoardData, setWhiteBoardData] = useState<any>();
     useEffect(() => {
       onTriggerSave && saveWhiteboard();
     }, [onTriggerSave]);
     const saveWhiteboard = () => {
       updateFileById(fileData.id, {whiteboard:JSON.stringify(whiteBoardData)}).then(
         (resp) => console.log(resp),
       );
     };
  return (
    <div className=" h-[700px]">
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <WelcomeScreen>
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Logo>
                <Image
                  src="/aries-logo-v1.png"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
              </WelcomeScreen.Center.Logo>
              <WelcomeScreen.Center.Heading>
                Welcome To Aries
              </WelcomeScreen.Center.Heading>
              <WelcomeScreen.Center.Menu>
                <WelcomeScreen.Center.MenuItemLink href="https://github.com/ArjunJunna/aries">
                  Aries GitHub
                </WelcomeScreen.Center.MenuItemLink>
                <WelcomeScreen.Center.MenuItemHelp />
              </WelcomeScreen.Center.Menu>
            </WelcomeScreen.Center>
          </WelcomeScreen>
          <MainMenu>
            <MainMenu.DefaultItems.Socials />
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;
