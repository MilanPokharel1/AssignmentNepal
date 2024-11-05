import React, { useState, useEffect, useRef } from "react";
import { Download, Loader, Loader2 } from "lucide-react";
import { FolderIcon } from "@heroicons/react/solid";
import profileIcon from "../ClientComponents/profileIcon.jpg";
import profilePictureClient from "../ClientComponents/profile-picture.jpeg";
import { useParams } from "react-router-dom";

const AssignmentView = () => {
  const [comment, setComment] = useState("");

  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est sequi magnam rerum dolorum provident, quo optio voluptatum voluptates molestiae tempora at inventore ea omnis non aliquam sapiente, hic, modi quis et sint sunt ducimus quas eveniet placeat. Placeat quas, facilis quidem dolorem dolores eveniet dolore enim itaque corrupti impedit doloremque optio ex, delectus modi dolor incidunt hic cum omnis soluta blanditiis commodi culpa nesciunt amet. Reiciendis doloremque quaerat officia praesentium beatae hic necessitatibus, nobis nulla a iure quidem ipsa dignissimos sapiente ad veritatis blanditiis amet cum quibusdam mollitia vero, cumque itaque. Reprehenderit facilis omnis voluptas quia distinctio commodi repellendus obcaecati ab, corrupti aperiam nobis libero id. Sequi unde nulla, eveniet odio dignissimos ipsum iusto minus corporis quos eius cupiditate perferendis ad corrupti tempora nostrum qui alias ipsa repudiandae! In earum alias iusto vel. Earum, tenetur consequuntur. Quis unde eum dolorum, officia dolores laboriosam, quos impedit porro perferendis amet tenetur doloremque aperiam commodi eius voluptatum ipsum. Sed fugit voluptatibus illo commodi veritatis perspiciatis architecto eaque eveniet quidem, dolores placeat et modi magnam ullam quia, consequatur, tempora itaque excepturi at. Perferendis, quae corrupti porro vero facere adipisci debitis quas ut corporis culpa laborum. Laborum fuga dolore odit aperiam, ipsa temporibus alias voluptates earum, porro vel reprehenderit aliquid? Quasi iusto vero pariatur eius praesentium molestias expedita! Unde, ratione excepturi consequatur tempora quia, labore in fugit inventore quae minima, sapiente obcaecati magnam delectus laborum laudantium aperiam. Dolorum debitis voluptatum doloribus nemo dolor ipsam quos id, animi deserunt ab quia magnam modi nostrum tempore amet. Laudantium pariatur soluta voluptatibus eligendi, provident distinctio veritatis eos veniam obcaecati consequuntur laborum omnis non aliquam rem similique. Accusamus quibusdam facilis dolor et nemo dolore, aspernatur ex quam consectetur nam id quae nostrum facere beatae similique eum, veniam exercitationem quis perspiciatis! Odit, quibusdam quam, quasi neque ducimus maxime similique, voluptates tempore dolore velit ipsa veniam nobis nihil vero sit repellat a quae expedita obcaecati itaque corporis mollitia doloribus placeat. Sed, nobis nesciunt. Nihil ullam omnis nesciunt vero dignissimos molestiae cum quam, assumenda, accusamus, officiis nam adipisci id nemo enim possimus reprehenderit voluptate quidem aspernatur in? Repudiandae aliquid ducimus facilis architecto saepe sunt nobis consequuntur ratione provident, odit vel deserunt totam voluptatem neque maxime eum vero dolorem eligendi. Dicta distinctio cum sint in vitae exercitationem? Laborum hic tempore, ratione blanditiis facilis ea nobis deleniti placeat suscipit quam error deserunt voluptatibus odit, numquam maiores fugiat nihil harum! Ad qui recusandae odio accusamus sequi eius porro ducimus deserunt itaque in? Aliquid id, iste voluptate a libero hic, minima rerum cumque iure quaerat repellat deserunt accusantium necessitatibus maxime error tenetur nulla saepe. Accusantium cupiditate enim esse voluptate autem facilis tenetur minus, dicta adipisci consectetur rerum distinctio nihil hic dolor, rem pariatur. Ipsa aperiam officiis et ea culpa tempore amet eos quod cumque veritatis tenetur, eius neque nesciunt error dignissimos ad ipsum soluta modi laboriosam quos. Illo voluptatibus consequatur dicta hic adipisci deserunt explicabo temporibus odio minus pariatur, sed omnis ducimus inventore! Praesentium vitae laboriosam reprehenderit provident deleniti voluptas numquam perspiciatis, earum natus deserunt a?"
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setisDownloading] = useState(false);
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const getDisplayText = () => {
    const maxLength = 700;
    if (isExpanded || description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };

  const uploadedFiles = [
    { name: "theprojekts-design-tokens.zip", size: "5.3MB", url: "exampleURL" },
    { name: "project-requirements.pdf", size: "2.1MB", url: "exampleURL" },
    { name: "research-data.xlsx", size: "1.8MB", url: "" },
  ];

  // Sample data for downloadable files
  const downloadableFiles = [
    { name: "finalaccounting.zip", size: "5.3MB", status: "pending" },
    { name: "completed-analysis.pdf", size: "3.2MB", status: "approved " },
    { name: "final-report.docx", size: "1.5MB", status: "pending" },
  ];

  // Sample comment history with role-based images
  const comments = [
    {
      id: 1,
      name: "Milan",
      role: "writer",
      date: "6 Jan 2012",
      message: "Hello cute dhanan.I am your writer",
      image: profileIcon, // profileIcon for writer
    },
    {
      id: 2,
      name: "Dhanan",
      role: "client",
      date: "6 Jan 2012",
      message: "Hello milan bhaiya.how are you?",
      image: profilePictureClient, // profilePictureClient for client
    },
  ];

  const handleCommentChange = (e) => {
    const input = e.target.value;
    const contactRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\d{10}\b/;

    if (contactRegex.test(input)) {
      alert("Entering contact numbers is against the rules.");
    } else {
      setComment(input);
    }
  };

  const handleSend = () => {
    if (comment.trim()) {
      // Handle sending comment
      setComment("");
    }
  };

  const truncateText = (text, length = 150) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };

  return (
    <div className="w-full mx-auto p-6 bg-[#fafbfc] rounded-lg ">
      <h2 className="text-2xl font-bold mb-6">Assignment</h2>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
        {/* Left section - 2 columns wide */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Title:
            </label>
            <input
              type="text"
              value="This the my second assignment i su..."
              className="w-full p-2 bg-white border border-gray-200 rounded"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descriptions:
            </label>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={getDisplayText()}
                className="w-full p-3 bg-white border border-gray-200 rounded resize-none overflow-hidden"
                readOnly
              />
            </div>
            <button
              onClick={toggleExpand}
              className="text-blue-500 mt-2 text-sm focus:outline-none"
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          </div>
          <div className=" border-[0.2px] border-gray-200 p-8 rounded-xl bg-white">
            <h3 className="text-md font-semibold tracking-wider mb-1">
              Comments:
            </h3>
            <div className="space-y-3 max-h-[80vh] overflow-y-auto mb-2 p-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-center">
                  <img
                    src={comment.image}
                    alt={comment.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium ">
                        {comment.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Comment as Dhananjaya Raut..."
                className="flex-1 p-2 border border-gray-200 rounded"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-[#5d5fef] text-white  hover:bg-blue-700 transition-colors rounded-2xl"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 col-span-2 mr-9">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Uploaded Files
            </h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <div
                    className={`flex items-center justify-between p-2 rounded border ${
                      file.url
                        ? "bg-white border-gray-200"
                        : "bg-gray-100 border-gray-300 "
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <FolderIcon className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    {file.url ? (
                      <Download className="w-4 h-4 text-gray-500" />
                    ) : null}
                  </div>

                  {/* Overlay for blur and loader */}
                  {!file.url && (
                    <div className="absolute inset-0 bg-white/5 opacity-85 backdrop-blur flex items-center justify-center rounded">
                      <Loader className="w-5 h-5 text-gray-500  animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Downloads Available
            </h3>
            <div className="space-y-2">
              {downloadableFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white rounded border border-gray-200"
                >
                  <div className="flex items-center space-x-2">
                    <FolderIcon className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  {file.status === "pending" ? (
                    <button disabled className="focus:outline-none">
                      <Download className="w-4 h-4 text-gray-300" />
                    </button>
                  ) : (
                    <button
                      className="focus:outline-none"
                      onClick={() => {
                        setisDownloading(true);
                      }}
                    >
                      {!isDownloading ? (
                        <Download className="w-4 h-4 text-gray-300" />
                      ) : (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentView;
