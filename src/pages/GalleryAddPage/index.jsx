import { ArrowLeft, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useGalleryStore } from "../../store/useGalleryStore";

export default function NewsAdd() {
  const navigate = useNavigate();

  const [imagesList, setImagesList] = useState([]);
  const [imgError, setImgError] = useState("");

  const {
    createGallery,
    uploadImages,
    submitting: isSubmitting,
    uploading: isUploading,
  } = useGalleryStore();

  const handleMultipleImageUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    setImgError("");

    if (imagesList.length + selectedFiles.length > 10) {
      setImgError("Maksimal 10 tagacha rasm yuklash mumkin!");
      e.target.value = "";
      return;
    }

    const imgType = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const validFiles = selectedFiles.filter((file) => {
      if (!imgType.includes(file.type)) {
        setImgError("Faqat PNG, JPG yoki WEBP formatdagi rasmlar mumkin!");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImgError("Har bir rasm hajmi 5MB dan oshmasligi kerak");
        return false;
      }
      return true;
    });

    if (!validFiles.length) {
      e.target.value = "";
      return;
    }

    const res = await uploadImages(validFiles);

    if (res.ok && res.urls) {
      const newItems = res.urls.map((url) => ({ url }));
      setImagesList((prev) => [...prev, ...newItems]);
    } else {
      setImgError(res.message || "Yuklashda xatolik yuz berdi");
    }

    e.target.value = "";
  };

  const removeImage = (idxToRemove) => {
    setImagesList((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (imagesList.length === 0) {
      setImgError("Iltimos, kamida bitta rasm yuklang!");
      return;
    }

    const payload = {
      images: imagesList.map((img) => ({ url: img.url })),
    };

    const res = await createGallery(payload);

    if (res.ok) {
      navigate("/gallery");
    } else {
      alert(res.data?.message || res.data?.error || "Xatolik yuz berdi!");
    }
  };
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Rasm qo'shish</h1>
      </PageHeader>

      <div className="flex items-center justify-center">
        <div className="w-full xl:w-[80%]">
          <div className="mb-3">
            <button
              onClick={() => navigate("/gallery")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Qaytish
            </button>
          </div>
          <div className="bg-light-main dark:bg-dark-main p-3 rounded-lg">
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <label className="block text-sm font-medium">
                      Rasmlar {imagesList.length} ta
                    </label>
                  </div>
                  {imagesList.length === 0 ? (
                    <label
                      className={`flex flex-col justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors overflow-hidden ${imgError ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50/50 dark:bg-dark-second hover:border-link-hover hover:bg-link-hover/10"}`}
                    >
                      {isUploading ? (
                        <p className="text-sm text-gray-500 text-center">
                          Yuklanmoqda...
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-6 h-6 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-link-hover">
                              Rasm tanlang
                            </span>
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, WEBp, JPG (maks. 5MB)
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleMultipleImageUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 pt-3">
                      {imagesList.map((img, index) => {
                        return (
                          <div
                            key={index}
                            className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-zinc-900 p-1.5 flex flex-col justify-between`}
                          >
                            <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden bg-zinc-950 group">
                              <img
                                src={img.url}
                                alt={`gallery-${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-0 left-0 bg-black/50 w-full h-full hidden group-hover:flex transition-all duration-300 items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-rose-500 transition-colors cursor-pointer"
                                  title="O'chirish"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div>
                        <label className="h-full relative border-2 border-dashed border-zinc-700 hover:border-link-hover hover:bg-zinc-900 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group">
                          {isUploading ? (
                            <Loader2 className="w-6 h-6 text-link-hover animate-spin" />
                          ) : (
                            <>
                              <div className="w-9 h-9 rounded-full bg-zinc-800 group-hover:bg-link-hover flex items-center justify-center transition-colors">
                                <Plus className="w-5 h-5 text-zinc-300 group-hover:text-black transition-colors" />
                              </div>
                              <span className="text-[11px] text-zinc-400 group-hover:text-zinc-200 mt-1.5 font-medium">
                                Rasm qo'shish
                              </span>
                            </>
                          )}
                          <input
                            type="file"
                            multiple
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            disabled={isUploading}
                            onChange={handleMultipleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                  {imgError && (
                    <p className="text-xs text-red-500 mt-1.5 text-center">
                      {imgError}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="font-medium text-white bg-link-hover hover:bg-link-hover/80 transition-colors duration-300 px-4 py-1.5 rounded-lg flex items-center gap-1"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
