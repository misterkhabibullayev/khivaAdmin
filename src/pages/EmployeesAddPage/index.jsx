import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEmployeesStore } from "../../store/useEmployeesStore";

export default function EmployeesAddPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [activeLang, setActiveLang] = useState("uz");
  const [imgUrl, setImgUrl] = useState("");
  const [imgError, setImgError] = useState("");

  const {
    getEmployeeById,
    createEmployee,
    updateEmployee,
    uploadImage,
    loading: isLoadingData,
    submitting: isSubmitting,
    uploading: isUploading,
  } = useEmployeesStore();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      surName: "",
      fatherName: "",
      birthDate: "",
      position: {
        uz: "",
        ru: "",
        en: "",
      },
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      const loadEmployee = async () => {
        const emp = await getEmployeeById(id);
        if (emp) {
          const [surName = "", name = "", ...fatherParts] = (emp.fullName || "")
            .trim()
            .split(" ");
          reset({
            name,
            surName,
            fatherName: fatherParts.join(" "),
            birthDate: emp.birthDate || "",
            position: {
              uz: emp.position?.uz || "",
              ru: emp.position?.ru || "",
              en: emp.position?.en || "",
            },
          });
          if (emp.images?.[0]?.url) {
            setImgUrl(emp.images[0].url);
          }
        }
      };

      loadEmployee();
    }
  }, [id, isEdit, reset, getEmployeeById]);

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
      setImgError(res.message);
    }
  };

  const onSubmit = async (values) => {
    if (!imgUrl) {
      setImgError("Iltimos, xodim rasmini yuklang!");
      return;
    }

    const fullName =
      `${values.surName} ${values.name} ${values.fatherName}`.trim();
    const payload = {
      fullName,
      birthDate: values.birthDate,
      position: values.position,
      images: [
        {
          url: imgUrl,
          mainImage: true,
          isGallery: false,
        },
      ],
    };

    const res = isEdit
      ? await updateEmployee(id, payload)
      : await createEmployee(payload);

    if (res.ok) {
      navigate("/employees");
    } else {
      alert(res.data?.message || res.data?.error || "Xatolik yuz berdi!");
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="w-8 h-8 animate-spin text-link-hover" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 w-full xl:w-2/3 pb-6">
          <Link to={"/employees"} className="flex items-center justify-center">
            <ArrowLeft />
          </Link>
          <h2 className="font-medium">
            {isEdit ? "Xodim tahrirlash" : "Xodim qo'shish"}
          </h2>
        </div>
        <div className="w-full xl:w-2/3 bg-white p-6 rounded-xl shadow-lg text-sm text-black font-medium">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="flex flex-col col-span-2">
                <label htmlFor="name" className="pb-2">
                  Ism
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Masalan: Ibrohim"
                  {...register("name", { required: true })}
                  className="outline-none border border-gray-300 rounded-lg p-2 bg-gray-50/50 focus:bg-white focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="surName" className="pb-2">
                  Familya
                </label>
                <input
                  id="surName"
                  type="text"
                  placeholder="Masalan: Xabibullayev"
                  {...register("surName", { required: true })}
                  className="outline-none border border-gray-300 rounded-lg p-2 bg-gray-50/50 focus:bg-white focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="fatherName" className="pb-2">
                  Otasining ismi
                </label>
                <input
                  id="fatherName"
                  type="text"
                  placeholder="Masalan: Mahmujon o'g'li"
                  {...register("fatherName", { required: true })}
                  className="outline-none border border-gray-300 rounded-lg p-2 bg-gray-50/50 focus:bg-white focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col col-span-3">
                <label htmlFor="birthDate" className="pb-2">
                  Tug'ilgan kuni
                </label>
                <input
                  id="birthDate"
                  type="date"
                  {...register("birthDate", { required: true })}
                  className="outline-none border border-gray-300 rounded-lg p-2 bg-gray-50/50 focus:bg-white focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col col-span-3">
                <div className="flex items-center gap-2 pb-2">
                  <label htmlFor="position">Lavozimi</label>
                  <div className="flex items-center gap-1">
                    {["uz", "ru", "en"].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setActiveLang(lang)}
                        className={`px-2 py-0.5 text-xs rounded-sm cursor-pointer flex items-center ${
                          activeLang === lang
                            ? "bg-link-hover text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                {["uz", "ru", "en"].map((lang) => (
                  <input
                    key={lang}
                    id={`position-${lang}`}
                    type="text"
                    placeholder={`${lang.toUpperCase()} tilida lavozimni kiriting`}
                    {...register(`position.${lang}`)}
                    className={`outline-none border border-gray-300 rounded-lg py-2 px-3 bg-gray-50/50 focus:bg-white focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300 ${activeLang === lang ? "block" : "hidden"}`}
                  />
                ))}
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium mb-1.5">
                  Rasmi
                </label>
                <label
                  className={`flex flex-col justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors overflow-hidden ${imgError ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50/50 hover:border-link-hover hover:bg-link-hover/10"}`}
                >
                  {isUploading ? (
                    <p className="text-sm text-gray-500 text-center">
                      Yuklanmoqda...
                    </p>
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
                    accept="image/png, image/jpeg, image/jpg, image/webp"
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
        <div className="w-6 h-6"></div>
      </div>
    </div>
  );
}
