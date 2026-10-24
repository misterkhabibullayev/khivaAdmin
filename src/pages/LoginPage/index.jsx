import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../icons/Icons";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Email yoki parol noto'g'ri!");
      }

      localStorage.setItem("admin_token", data.token);

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Server bilan xatolik yuzaga keldi");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full bg-[url('/Images/khivmuseumlogin.png')] bg-no-repeat bg-center h-screen">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"></div>
      <div className="w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center bg-white/10 backdrop-blur-md p-5 rounded-lg shadow-lg border border-white/20">
          <div className="flex items-center mb-5">
            <img
              src="/Images/logo.png"
              alt="KhivaMuseum Logo"
              className="h-17.5"
            />
            <h2 className="font-bold text-2xl leading-[110%] text-white pt-2 ">
              Khiva
              <br />
              Museum
            </h2>
          </div>
          <div className="max-w-72 text-center">
            <h1 className="font-semibold text-2xl leading-[110%] text-white pb-3">
              Kirish
            </h1>
            <p className="font-medium text-xs text-white">
              Admin panelga kirish uchun ma'lumotlaringizni kiriting
            </p>
          </div>
          {error && (
            <p className="text-red-500 text-sm max-w-xs text-center">{error}</p>
          )}
          <div className="min-w-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-medium text-base leading-[130%]"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 p-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Emailingizni kiriting"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="min-w-full outline-none border border-black dark:border-gray-300 rounded-lg px-4 pl-10 py-2 focus:border-link-hover hover:border-link-hover text-black dark:text-white dark:placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Parol</label>
                <div className="relative">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 p-1">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Parolni kiriting"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="min-w-full outline-none border border-black dark:border-gray-300 rounded-lg px-10 py-2 focus:border-link-hover hover:border-link-hover text-black dark:text-white dark:placeholder:text-gray-300"
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
                      <Icons.eyeOpenIcon />
                    ) : (
                      <Icons.eyeCloseIcon />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full py-2 text-base text-center bg-white/20 backdrop-blur-md rounded-lg text-white"
              >
                {loading ? <Icons.smallLoadingIcon /> : "Kirish"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
