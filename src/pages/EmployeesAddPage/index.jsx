import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmployeesAddPage() {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [activeLang, setActiveLang] = useState("uz");
  const [position, setPosition] = useState({
    uz: "",
    ru: "",
    en: "",
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgError, setImgError] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleImageUp = async (e) => {
    const file = e.target.files[0];
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

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setImgError("Rasm hajmi 5MB dan oshmasligi kerak");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);

      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.files?.[0]?.url) {
        setImgUrl(data.files[0].url);
      } else {
        setImgError(data.message || "Rasmni yuklashda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Rasm yuklashda xatolik:", error);
      setImgError("Server bilan xatolik!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${surName} ${name} ${fatherName}`.trim();

    const payload = {
      fullName: fullName,
      birthDate: birthDate,
      position: position,
      images: [
        {
          url: imgUrl,
          mainImage: true,
          isGallery: false,
        },
      ],
    };

    console.log("Backenta ketayotgan data:", payload);

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("admin_token");

      const res = await fetch(`${BASE_URL}/employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Qo'shilgan xodim:", data);

      if (res.ok) {
        navigate("/employees");
      } else {
        alert(data.message || "Xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Xodim qo'shishda xatolik:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 w-full xl:w-2/3 pb-6">
          <Link to={"/employees"} className="flex items-center justify-center">
            <ArrowLeft />
          </Link>
          <h2 className="font-medium">Xodim qo'shish</h2>
        </div>
        <div className="w-full xl:w-2/3 bg-white p-6 rounded-xl shadow-lg text-sm text-black font-medium">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
              <div className="flex flex-col col-span-2">
                <label htmlFor="name" className="pb-2">
                  Ism
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  placeholder="Masalan: Ibrohim"
                  required
                  onChange={(e) => setName(e.target.value)}
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
                  value={surName}
                  placeholder="Masalan: Xabibullayev"
                  required
                  onChange={(e) => setSurName(e.target.value)}
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
                  value={fatherName}
                  placeholder="Masalan: Mahmujon o'g'li"
                  required
                  onChange={(e) => setFatherName(e.target.value)}
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
                  value={birthDate}
                  required
                  onChange={(e) => setBirthDate(e.target.value)}
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
                <input
                  id="postition"
                  type="text"
                  placeholder={`${activeLang.toUpperCase()} tilida lavozimni kiriting`}
                  value={position[activeLang]}
                  required
                  onChange={(e) =>
                    setPosition({ ...position, [activeLang]: e.target.value })
                  }
                  className="outline-none border border-gray-300 rounded-lg py-2 px-3 bg-gray-50/50 focus:bg-white focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                />
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
                        className="h-24 w-24 object-cover rounded-lg border border-gray-400"
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
                    required
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
                  <Loader2 className="w-4 h-4" />
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
