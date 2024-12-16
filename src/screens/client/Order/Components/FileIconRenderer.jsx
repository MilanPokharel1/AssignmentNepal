import React from "react";
import { FiFileText, FiImage, FiVideo, FiMusic, FiFile } from "react-icons/fi";
import { BsFileEarmarkZip } from "react-icons/bs";

const FILE_ICON_MAP = {
  doc: FiFileText,
  docx: FiFileText,
  pdf: FiFileText,

  jpg: FiImage,
  jpeg: FiImage,
  png: FiImage,
  gif: FiImage,

  mp4: FiVideo,
  avi: FiVideo,
  mov: FiVideo,

  mp3: FiMusic,
  wav: FiMusic,

  xls: FiFileText,
  xlsx: FiFileText,

  zip: BsFileEarmarkZip,
  rar: BsFileEarmarkZip,
};

const FileIconRenderer = ({
  fileName,
  size = "24px",
  className = "",
  color = "#6c63ff",
}) => {
  // Extract file extension safely
  const extractFileExtension = (filename) => {
    if (!filename || typeof filename !== "string") return "";
    const parts = filename.split(".");
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
  };

  const fileExtension = extractFileExtension(fileName);
  const IconComponent = FILE_ICON_MAP[fileExtension] || FiFile;

  return <IconComponent size={size} className={className} color={color} />;
};

export default FileIconRenderer;
