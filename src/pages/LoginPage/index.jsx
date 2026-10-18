import { useState } from "react";
import { Icons } from "../../icons/Icons";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div className='w-full h-screen overflow-hidden flex items-center justify-center bg-light-second dark:bg-dark-second'>
        <div className="flex flex-col gap-4 items-center bg-light-main dark:bg-dark-main p-5 rounded-lg">
          <div className="flex items-center mb-7">
            <img
              src="/Images/logo.png"
              alt="KhivaMuseum Logo"
              className="h-17.5"
            />
            <h2 className="font-bold text-2xl leading-[110%] text-link-hover pt-2">
              Khiva
              <br />
              Museum
            </h2>
          </div>
          <div>
            <h1 className="font-semibold text-2xl leading-[110%] text-link-hover">Kirish</h1>
          </div>
          {error && (
            <p className="text-red-500 text-sm max-w-xs text-center">{error}</p>
          )}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="outline-none border border-black dark:border-gray-300 rounded-lg px-4 py-2 focus:border-link-hover hover:border-link-hover text-black dark:text-white dark:placeholder:text-gray-300"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="outline-none border border-black dark:border-gray-300 rounded-lg px-4 py-2 focus:border-link-hover hover:border-link-hover text-black dark:text-white dark:placeholder:text-gray-300"
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
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full py-2 text-base text-center bg-link-hover rounded-lg text-white"
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
