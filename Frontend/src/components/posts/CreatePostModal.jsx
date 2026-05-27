import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../features/posts/postActions";
import { FiX, FiImage } from "react-icons/fi";
import Button from "../common/Button";

const CreatePostModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      setError("You can only upload up to 5 images");
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError("Each file must be less than 5MB");
        return false;
      }
      return true;
    });

    setSelectedFiles(validFiles);

    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    if (validFiles.length > 0) {
      setStep(2);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one image");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    if (caption) {
      formData.append("caption", caption);
    }

    try {
      await dispatch(createPost(formData)).unwrap();
      onClose();
    } catch (err) {
      setError(err || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-instagram-border">
          <h2 className="font-semibold text-lg">Create new post</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 120px)" }}>
          {step === 1 ? (
            <div className="flex flex-col items-center justify-center p-12">
              <FiImage size={96} className="text-gray-300 mb-4" />
              <h3 className="text-xl mb-2">Select photos to share</h3>
              <p className="text-instagram-gray text-sm mb-6">
                You can select up to 5 photos
              </p>
              <label className="btn-primary cursor-pointer">
                Select from computer
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>
          ) : (
            <div className="p-4">
              {/* Image Previews */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Caption */}
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3 border border-instagram-border rounded-lg resize-none"
                rows={4}
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 2 && (
          <div className="p-4 border-t border-instagram-border flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setStep(1);
                setSelectedFiles([]);
                setPreviews([]);
                setCaption("");
                setError("");
              }}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Sharing..." : "Share"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostModal;
