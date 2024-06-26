"use client";

import { useRef, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import ClickableImage from "./components/ClickableImage";
import XShareButton from "./components/XShareButton";
import CameraLiveView from "./components/CameraLiveView";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState("");
  const [isShooting, setIsShooting] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasRefUrl, setCanvasRefUrl] = useState<string>("");

  const handleShooting = () => {
    setIsShooting(false);
    if (canvasRef == null || canvasRef.current == null) return false;
    setCanvasRefUrl(canvasRef.current.toDataURL("image/png"));
    console.log(canvasRefUrl);
  };

  const handleDownload = () => {
    if (canvasRef == null || canvasRef.current == null) return false;
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvasRefUrl;
    link.click();
  };

  return (
    <main>
      <Flex flexDir={"column"} alignItems="center">
        <CameraLiveView
          backgroundImagePath={selectedImage}
          isCapturing={isShooting}
          canvasRef={canvasRef}
        />
        {isShooting ? (
          <>
            <Button onClick={handleShooting} mt={2}>
              撮影する
            </Button>
            <Flex gap={1} mt={2}>
              <ClickableImage
                src="images/1812.jpg"
                alt="背景画像"
                onClick={setSelectedImage}
                isSelected={selectedImage === "images/1812.jpg"}
              />
              <ClickableImage
                src="images/9790.jpg"
                alt="背景画像"
                onClick={setSelectedImage}
                isSelected={selectedImage === "images/9790.jpg"}
              />
              <ClickableImage
                src="images/9792.jpg"
                alt="背景画像"
                onClick={setSelectedImage}
                isSelected={selectedImage === "images/9792.jpg"}
              />
            </Flex>
          </>
        ) : (
          <Flex gap={1} mt={2}>
            <Button onClick={() => setIsShooting(true)}>再撮影する</Button>
            <Button onClick={handleDownload}>ダウンロード</Button>
            <XShareButton />
          </Flex>
        )}
      </Flex>
    </main>
  );
}
