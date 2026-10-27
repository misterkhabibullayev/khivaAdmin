import { ArrowLeft, Eye, EyeClosed, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useAdminsStore } from "../../store/useAdminsStore";
import { useNotificationStore } from "../../store/useNotificationStore";

export default function AdminAddPage() {
  const navigate = useNavigate();
  const { createAdmin, submitting } = useAdminsStore();
  const [showPassword, setShowPassword] = useState(false);
  const { showNotification } = useNotificationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await createAdmin(data);

    if (res.ok) {
      showNotification("success", "Admin muvaffaqiyatli qo'shildi");
      navigate("/admins");
    }
  };
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Admin qo'shish</h1>
      </PageHeader>
      <div className="flex flex-col items-center">
        <div className="">
          <div className="w-full mb-6">
            <button
              onClick={() => navigate("/admins")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Qaytish
            </button>
          </div>
          <div className="bg-light-main dark:bg-dark-main flex flex-col items-center p-3 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg text-link-hover mb-4">
              Admin qo'shish
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="font-medium text-sm">
                  Ism
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  {...register("firstName", {
                    required: "Ism kiritilishi shart",
                  })}
                  className="outline-none border border-gray-600 px-3 py-1.5 rounded-lg focus:border-link-hover"
                />
                {errors.firstName && (
                  <span className="text-xs text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="font-medium text-sm">
                  Familiya
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Johnson"
                  {...register("lastName", {
                    required: "Familiya kiritilishi shart",
                  })}
                  className="outline-none border border-gray-600 px-3 py-1.5 rounded-lg focus:border-link-hover"
                />
                {errors.lastName && (
                  <span className="text-xs text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@gmail.com"
                  {...register("email", {
                    required: "Email kiritilishi shart",
                  })}
                  className="outline-none border border-gray-600 px-3 py-1.5 rounded-lg focus:border-link-hover"
                />
                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium text-sm">
                  Parol
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Parol kiritilishi shart",
                    })}
                    className="outline-none border border-gray-600 px-3 py-1.5 rounded-lg focus:border-link-hover"
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
                {errors.password && (
                  <span className="text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1 font-medium text-base px-3 py-1.5 bg-link-hover rounded-lg text-white"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}{" "}
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
