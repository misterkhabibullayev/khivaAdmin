import {
  ArrowLeft,
  Camera,
  Eye,
  EyeClosed,
  KeyRound,
  Loader2,
  Mail,
  RefreshCw,
  Save,
  Trash,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import { useProfileStore } from "../../store/useProfileStore";
import { formatDate } from "../../utils/formDate";

export default function ProfilePage() {
  const {
    profile,
    loading,
    error,
    submitting,
    getProfile,
    updateProfileName,
    updateAvatar,
    deleteAvatar,
    updatePassword,
    requestEmailChange,
    confirmEmailChange,
  } = useProfileStore();

  const [onEmail, setOnEmail] = useState(false);
  const [emailStep, setEmailStep] = useState(1);
  const [targetEmail, setTargetEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    reset: resetName,
  } = useForm({
    values: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    reset: resetEmail,
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
  } = useForm();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (profile) {
      resetName({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
      });
    }
  }, [profile, resetName]);

  const onUpdateName = async (data) => {
    const res = await updateProfileName(data);
    alert(res.message);
    if (res.success) {
      await getProfile();
    }
  };

  const onEmailSubmit = async (data) => {
    if (emailStep === 1) {
      const res = await requestEmailChange(data.email);
      if (res.error) {
        setOnEmail(false);
        showNotification(
          "error",
          "Urinishlar soni tugadi 10 daqiqadan keyin qayta urinib ko'ring",
        );
      }
      if (res.success) {
        setTargetEmail(data.email);
        setEmailStep(2);
      } else {
        showNotification("error", res.message);
      }
    } else {
      const res = await confirmEmailChange({
        otp: data.otp,
      });
      if (res.success) {
        closeModal();
        await getProfile();
        showNotification("success", "Emailingiz muvaffaqiyatli yangilandi!");
      } else {
        showNotification("error", res.message || "Kod noto'g'ri kiritildi");
      }
    }
  };

  const closeModal = () => {
    setOnEmail(false);
    setEmailStep(1);
    setTargetEmail("");
    resetEmail();
  };

  const onPasswordSubmit = async (data) => {
    const res = await updatePassword(data);
    alert(res.message);
    if (res.success) {
      resetPassword();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await updateAvatar(file);
      alert(res.message);
    }
  };

  const handleAvatarDelete = async () => {
    if (window.confirm("Avatarni o'chirishni xohlaysizmi?")) {
      const res = await deleteAvatar();
      alert(res.message);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!profile) return <div className="p-4">Profile topilmadi</div>;

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div
          className={`fixed top-6 right-6 z-60 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border transition-all duration-300 ${
            statusMessage.type === "error"
              ? "bg-red-950/90 border-red-500 text-white"
              : "bg-green-950/90 border-green-500 text-white"
          }`}
        >
          <span className="text-sm font-medium">{statusMessage.text}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Profilim</h1>
      </PageHeader>

      <div className="flex flex-col lg:flex-row gap-6 h-[85vh]">
        <div className="w-full lg:w-[320px] shrink-0 bg-light-main dark:bg-dark-main p-6 rounded-2xl border border-link-hover flex flex-col items-center text-center">
          <div className="relative group w-20 h-20 rounded-full overflow-hidden bg-link-hover flex items-center justify-center font-bold text-3xl text-white">
            {profile?.images?.length ? (
              <img
                src={profile.images[0].url}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>
                {profile.firstName?.[0]}
                {profile.lastName?.[0]}
              </span>
            )}

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <label className="cursor-pointer p-2 rounded-full text-white transition">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
              {profile?.images?.length > 0 && (
                <button
                  type="button"
                  onClick={handleAvatarDelete}
                  className="p-2 rounded-full text-white transition"
                >
                  <Trash className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <h2 className="mt-4 font-semibold text-lg">
            {profile.firstName} {profile.lastName}
          </h2>
          <span className="mt-1 px-3 py-0.5 text-xs font-semibold rounded-full bg-link-hover text-white uppercase">
            {profile.role}
          </span>

          <div className="w-full mt-6 pt-6 border-t border-link-hover space-y-3 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="truncate max-w-42.5" title={profile.email}>
                {profile.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ro'yxatdan o'tgan:</span>
              <span>{formatDate(profile.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-rows-3 gap-y-6">
          <form
            onSubmit={handleSubmitName(onUpdateName)}
            className="row-span-1 bg-light-main dark:bg-dark-main rounded-2xl p-4 border border-link-hover"
          >
            <h3 className="font-medium text-base mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-link-hover" /> Ma'lumotlar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-black dark:text-white block pb-1.5">
                  Ism
                </label>
                <input
                  type="text"
                  {...registerName("firstName", { required: true })}
                  className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-lg px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-black dark:text-white block pb-1.5">
                  Familiya
                </label>
                <input
                  type="text"
                  {...registerName("lastName", { required: true })}
                  className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-lg px-3.5 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-link-hover hover:opacity-90 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
              >
                <Save className="w-4 h-4" /> Saqlash
              </button>
            </div>
          </form>

          <form
            onSubmit={handleSubmitEmail(onEmailSubmit)}
            className="bg-light-main dark:bg-dark-main rounded-2xl p-5 border border-link-hover"
          >
            <h3 className="font-medium text-base mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-link-hover" /> Email
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-black dark:text-white block pb-1.5">
                  Hozirgi email
                </label>
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full outline-none bg-gray-800/40 border border-gray-600/50 text-white rounded-lg px-3.5 py-2 text-sm cursor-not-allowed"
                />
              </div>
              <div className="w-full flex items-center justify-end">
                <button
                  onClick={() => setOnEmail(true)}
                  className="bg-link-hover hover:opacity-90 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
                >
                  <RefreshCw className="w-4 h-4" /> Emailni o'zgartirish
                </button>
              </div>
            </div>
          </form>

          <form
            onSubmit={handleSubmitPassword(onPasswordSubmit)}
            className="row-span-1 bg-light-main dark:bg-dark-main rounded-2xl p-4 border border-link-hover"
          >
            <h3 className="font-medium text-base mb-4 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-link-hover" /> Parolni yangilash
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-black dark:text-white block pb-1.5">
                  Eski parol
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...registerPassword("oldPassword", { required: true })}
                  className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-xl px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-black dark:text-white block pb-1.5">
                  Yangi parol
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...registerPassword("newPassword", { required: true })}
                    className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-xl px-3.5 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPassword((prev) => !prev);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeClosed className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="border border-link-hover text-link-hover hover:bg-link-hover hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Parolni o'zgartirish
              </button>
            </div>
          </form>
        </div>
      </div>
      {onEmail && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-light-main dark:bg-dark-main rounded-2xl shadow-2xl relative">
            <div
              className={`px-4 pt-2 flex items-center ${emailStep === 2 ? "justify-between" : "justify-end"}`}
            >
              {emailStep === 2 && (
                <button
                  type="button"
                  onClick={() => setEmailStep(1)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={closeModal}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-dark-second transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center pb-2">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                {emailStep === 1 ? "Emailni o'zgartirish" : "Kodni tasdiqlash"}
              </h2>
            </div>

            <form
              onSubmit={handleSubmitEmail(onEmailSubmit)}
              className="pt-2 space-y-4 px-4 pb-4"
            >
              {emailStep === 1 ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-400 pb-3 max-w-65 text-center">
                    Yangi elektron pochtangizni kiriting. Ushbu manzilga
                    tasdiqlash kodi yuboriladi.
                  </p>
                  <input
                    type="email"
                    placeholder="yangi@pochta.uz"
                    {...registerEmail("email", { required: emailStep === 1 })}
                    className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-lg px-3.5 py-2 text-sm text-white"
                  />
                  <div className="w-full flex items-center justify-center gap-2 pt-5">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-link-hover hover:opacity-90 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        ""
                      )}
                      Kodni yuborish
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400 pb-3 max-w-65 text-center">
                    <span className="text-link-hover font-medium">
                      {targetEmail}
                    </span>{" "}
                    pochtasiga yuborilgan tasdiqlash kodini kiriting.
                  </p>
                  <label className="text-sm text-black dark:text-white block pb-1.5 text-center">
                    Tasdiqlash kodi
                  </label>
                  <input
                    type="text"
                    placeholder="6 xonali kod"
                    maxLength={6}
                    {...registerEmail("otp", { required: emailStep === 2 })}
                    className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-lg px-3.5 py-2 text-sm text-white tracking-widest text-center"
                  />
                  <div className="w-full flex items-center justify-center pt-5">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                    >
                      Tasdiqlash
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
