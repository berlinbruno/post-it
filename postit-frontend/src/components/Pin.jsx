import { DownloadIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();

  const { postedBy, image, _id } = pin;
  const userInfo = fetchUser();

  const alreadySaved = pin?.save?.some(
    (item) => item?.postedBy?._id === userInfo?.sub
  );

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  const savePin = (id) => {
    if (!alreadySaved && !savingPost) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  return (
    <div className="m-2 cursor-pointer bg-white hover:z-50 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative w-auto rounded-lg overflow-hidden"
      >
        <img
          src={urlFor(image).width(300).url()}
          alt={`Post by ${postedBy?.userName}`}
          className="rounded-lg w-full"
        />
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-4 bg-black bg-opacity-20 z-50 ease-in-out transition-opacity duration-200">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-800 text-xl opacity-90 hover:opacity-100 transition-opacity duration-200"
                  aria-label="Download Image"
                >
                  <DownloadIcon className="transition-transform duration-200 transform hover:scale-110" />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full shadow-md transition-shadow duration-200"
                  aria-disabled="true"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded-full shadow-md transition-shadow duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  aria-label="Save Pin"
                  disabled={savingPost}
                >
                  {savingPost ? (
                    <span className="animate-spin">🌀</span>
                  ) : (
                    "Save"
                  )}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {postedBy?._id === userInfo?.sub && (
                <button
                  type="button"
                  className="bg-white p-2 text-gray-800 font-semibold rounded-full shadow-md transition-shadow duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  aria-label="Delete Pin"
                >
                  <Trash2Icon className="transition-transform duration-200 transform hover:scale-110" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center p-2"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt={`Profile of ${postedBy?.userName}`}
        />
        <p className="font-extralight text-gray-600 text-md capitalize">{postedBy?.userName}</p>

      </Link>
    </div>
  );
};

export default Pin;
