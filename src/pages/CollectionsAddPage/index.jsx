import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import TextEditor from "../../components/TextEditor";
import { useCollectionsStore } from "../../store/useCollectionsStore";
import { useNotificationStore } from "../../store/useNotificationStore";

export default function CollectionsAdd() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const isEdit = Boolean(cid);

  const [activeLangN, setActiveLangN] = useState("uz");
  const [activeLangD, setActiveLangD] = useState("uz");
  const [activeLangC, setActiveLangC] = useState("uz");

  const [imgUrl, setImgUrl] = useState("");
  const [initialImgUrl, setInitialImgUrl] = useState("");
  const [imgError, setImgError] = useState("");

  const { showNotification } = useNotificationStore();

  const {
    getCollectionById,
    createCollection,
    updateCollection,
    uploadImage,
    submitting: isSubmitting,
    uploading: isUploading,
  } = useCollectionsStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      title: {
        en: "",
        ru: "",
        uz: "",
      },
      description: {
        en: "",
        ru: "",
        uz: "",
      },
      content: {
        en: "",
        ru: "",
        uz: "",
      },
    },
  });

  useEffect(() => {
    if (isEdit && cid) {
      const loadCollection = async () => {
        const item = await getCollectionById(cid);
        if (item) {
          reset({
            title: {
              en: item.title?.en || "",
              ru: item.title?.ru || "",
              uz: item.title?.uz || "",
            },
            description: {
              en: item.description?.en || "",
              ru: item.description?.ru || "",
              uz: item.description?.uz || "",
            },
            content: {
              en: item.content?.en || "",
              ru: item.content?.ru || "",
              uz: item.content?.uz || "",
            },
          });

          const currentImg = item.images?.[0]?.url || "";
          setImgUrl(currentImg);
          setInitialImgUrl(currentImg);
        }
      };

      loadCollection();
    }
  }, [cid, isEdit, reset, getCollectionById]);

  const isImageDirty = isEdit ? imgUrl !== initialImgUrl : Boolean(imgUrl);
  const hasChanges = isEdit ? isDirty || isImageDirty : true;

  const handleImageUp = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImgError("");
    const imgType = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!imgType.includes(file.type)) {
      setImgError(
        "Faqat PNG, JPG yoki WEBP formatdagi rasmlarni yuklash mumkin!",
      );
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImgError("Rasm hajmi 5MB dan oshmasligi kerak");
      e.target.value = "";
      return;
    }

    const res = await uploadImage(file);
    if (res.ok) {
      setImgUrl(res.url);
    } else {
      setImgError(res.message || "Rasm yuklashda xatolik");
    }

    e.target.value = "";
  };

  const onSubmit = async (values) => {
    if (!imgUrl) {
      setImgError("Iltimos, kolleksiya rasmini yuklang!");
      return;
    }

    const payload = {
      title: values.title,
      description: values.description,
      content: values.content,
      images: [
        {
          url: imgUrl,
          mainImage: true,
          isGallery: false,
        },
      ],
    };

    const res = isEdit
      ? await updateCollection(cid, payload)
      : await createCollection(payload);

    if (res.ok) {
      navigate("/collections");
      showNotification(
        "success",
        isEdit
          ? "Kolleksiya muvaffaqiyatli tahrirlandi"
          : "Kolleksiya yaratildi",
      );
    } else {
      showNotification(
        "error",
        res.data?.message || res.data?.error || "Xatolik yuz berdi!",
      );
    }
  };

  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">
          {isEdit ? "Kolleksiyani tahrirlash" : "Kolleksiya qo'shish"}
        </h1>
      </PageHeader>

      <div className="flex items-center justify-center">
        <div className="w-full xl:w-[80%]">
          <div className="mb-3">
            <button
              onClick={() => navigate("/collections")}
              className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Qaytish
            </button>
          </div>
          <div className="bg-light-main dark:bg-dark-main p-4 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col col-span-6 lg:col-span-3">
                  <div className="flex items-center gap-2 pb-2">
                    <label htmlFor="title" className="font-medium">
                      Kolleksiya nomi
                    </label>
                    <div className="flex items-center gap-1">
                      {["uz", "ru", "en"].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setActiveLangN(lang)}
                          className={`px-2 py-0.5 text-xs rounded-sm cursor-pointer flex items-center ${
                            activeLangN === lang
                              ? "bg-link-hover text-white"
                              : "bg-gray-100 dark:bg-link-hover/40 text-gray-600 dark:text-white"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    id={`title-${activeLangN}`}
                    type="text"
                    placeholder={`${activeLangN.toUpperCase()} tilida nomini kiriting`}
                    {...register(`title.${activeLangN}`)}
                    className="outline-none border border-gray-300 dark:border-zinc-700 rounded-lg p-2 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:border-link-hover transition-colors"
                  />
                </div>

                <div className="flex flex-col col-span-6 lg:col-span-3">
                  <div className="flex items-center gap-2 pb-2">
                    <label htmlFor="description" className="font-medium">
                      Tavsif
                    </label>
                    <div className="flex items-center gap-1">
                      {["uz", "ru", "en"].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setActiveLangD(lang)}
                          className={`px-2 py-0.5 text-xs rounded-sm cursor-pointer flex items-center ${
                            activeLangD === lang
                              ? "bg-link-hover text-white"
                              : "bg-gray-100 dark:bg-link-hover/40 text-gray-600 dark:text-white"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    id={`description-${activeLangD}`}
                    type="text"
                    placeholder={`${activeLangD.toUpperCase()} tilida tavsifni kiriting`}
                    {...register(`description.${activeLangD}`)}
                    className="outline-none border border-gray-300 dark:border-zinc-700 rounded-lg p-2 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:border-link-hover transition-colors"
                  />
                </div>

                <div className="flex flex-col col-span-6">
                  <div className="flex items-center gap-2 pb-2">
                    <label className="font-medium">Content</label>
                    <div className="flex items-center gap-1">
                      {["uz", "ru", "en"].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setActiveLangC(lang)}
                          className={`px-2 py-0.5 text-xs rounded-sm cursor-pointer flex items-center ${
                            activeLangC === lang
                              ? "bg-link-hover text-white"
                              : "bg-gray-100 dark:bg-link-hover/40 text-gray-600 dark:text-white"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden">
                    <Controller
                      name={`content.${activeLangC}`}
                      control={control}
                      render={({ field }) => (
                        <TextEditor
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium mb-1.5">
                    Rasmi
                  </label>
                  <label
                    className={`flex flex-col justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors overflow-hidden ${
                      imgError
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 dark:border-zinc-700 bg-gray-50/50 dark:bg-dark-second hover:border-link-hover"
                    }`}
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-link-hover" />
                        <p className="text-sm text-gray-500">Yuklanmoqda...</p>
                      </div>
                    ) : imgUrl ? (
                      <div className="w-auto flex items-center gap-3 px-3">
                        <img
                          src={imgUrl}
                          alt="Preview"
                          className="h-24 w-24 object-cover object-top rounded-lg border border-gray-400"
                        />
                        <span className="text-sm text-green-600 font-medium">
                          Rasm yuklandi! (Almashtirish uchun bosing)
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium text-link-hover">
                            Rasm tanlang
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, WEBP, JPG (maks. 5MB)
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      disabled={isUploading}
                      onChange={handleImageUp}
                      className="hidden"
                    />
                  </label>
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
                  disabled={!hasChanges || isSubmitting || isUploading}
                  className="font-medium text-white bg-link-hover hover:bg-link-hover/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 px-5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
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
