import { Trash2Icon, UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { categories } from "../utils/data";
import Spinner from "./Spinner";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];

    if (
      ["image/png", "image/webp", "image/svg", "image/jpeg", "image/gif", "image/tiff"].includes(selectedFile.type)
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Upload failed:", error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 animate-fade-in">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill all the fields.
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full rounded-lg shadow-lg">
        {/* Image Upload Section */}
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full rounded-lg">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420 rounded-lg hover:border-gray-500 transition-all duration-300 ease-in-out">
            {loading && <Spinner />}
            {wrongImageType && <p className="text-red-500">Invalid file type.</p>}
            {!imageAsset ? (
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-3xl text-gray-600">
                      <UploadCloudIcon />
                    </p>
                    <p className="text-lg text-gray-600">Click to upload</p>
                  </div>
                  <p className="mt-5 text-gray-400 text-sm">
                    Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF under 20MB
                  </p>
                </div>
                <input
                  type="file"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <Trash2Icon />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 focus:border-red-500 transition duration-300"
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-red-500 transition duration-300"
          />
          <div className="flex flex-col">
            <p className="mb-2 font-semibold text-lg sm:text-xl">
              Choose Pin Category
            </p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer focus:border-red-500 transition duration-300"
            >
              <option value="others" className="sm:text-bg bg-white">
                Select Category
              </option>
              {categories.map((category) => (
                <option
                  key={category.name}
                  className="text-base border-0 outline-none capitalize bg-white text-black"
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
