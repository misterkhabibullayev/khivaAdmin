import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import TextEditor from "../../components/TextEditor";
import { useTicketsStore } from "../../store/useTicketsStore";

export default function TicketsAddPage() {
  const navigate = useNavigate();
  const { tickID } = useParams();
  const isEdit = Boolean(tickID);

  const { createTicket, updateTicket, getTicketById, submitting } =
    useTicketsStore();
  const [activeLangN, setActiveLangN] = useState("uz");
  const [activeLangD, setActiveLangD] = useState("uz");

  const { register, reset, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: {
        uz: "",
        ru: "",
        en: "",
      },
      price: "",
      category: "ADULT",
      personCount: 1,
      validDays: 1,
      validFrom: "",
      validTo: "",
      visitingHours: "",
      ageRestriction: "",
      includedServices: [{ value: "" }],
      rules: {
        uz: "",
        ru: "",
        en: "",
      },
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "includedServices",
  });

  const ageTemplates = {
    ADULT: "16 yoshdan yuqori",
    CHILD: "16 yoshgacha",
    STUDENT: "Talabalik guvohnomasi bilan",
    PENSIONER: "Pensiya guvohnomasi bilan",
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setValue("category", selected);
    if (ageTemplates[selected]) {
      setValue("ageRestriction", ageTemplates[selected]);
    }
  };

  useEffect(() => {
    if (isEdit && tickID) {
      const loadTicket = async () => {
        const item = await getTicketById(tickID);

        if (item) {
          const data = item.data || item;

          reset({
            title: {
              uz: data.title?.uz || "",
              ru: data.title?.ru || "",
              en: data.title?.en || "",
            },
            price: data.price ?? "",
            category: data.category || "ADULT",
            personCount: data.personCount ?? 1,
            validDays: data.validDays ?? 1,
            validFrom: data.validFrom ? data.validFrom.split("T")[0] : "",
            validTo: data.validTo ? data.validTo.split("T")[0] : "",
            visitingHours: data.visitingHours || "",
            ageRestriction: data.ageRestriction || "",
            includedServices:
              Array.isArray(data.includedServices) &&
              data.includedServices.length > 0
                ? data.includedServices.map((service) => ({ value: service }))
                : [{ value: "" }],
            rules: {
              uz: data.rules?.uz || "",
              ru: data.rules?.ru || "",
              en: data.rules?.en || "",
            },
            isActive:
              data.isActive !== undefined ? Boolean(data.isActive) : true,
          });
        }
      };

      loadTicket();
    }
  }, [tickID, isEdit, reset, getTicketById]);

  const onSubmit = async (data) => {
    const payload = {
      title: {
        uz: data.title.uz || "",
        ru: data.title.ru || "",
        en: data.title.en || "",
      },
      price: Number(data.price),
      category: data.category,
      personCount: Number(data.personCount) || 1,
      validDays: Number(data.validDays) || 1,
      validFrom: data.validFrom,
      validTo: data.validTo,
      visitingHours: data.visitingHours,
      ageRestriction: data.ageRestriction || "",
      includedServices: data.includedServices
        .map((item) => item.value)
        .filter((val) => val && val.trim() !== ""),
      rules: {
        uz: data.rules.uz,
        ru: data.rules.ru,
        en: data.rules.en,
      },
      isActive: Boolean(data.isActive),
    };

    const res = isEdit
      ? await updateTicket(tickID, payload)
      : await createTicket(payload);

    if (res.ok) {
      navigate("/tickets");
    } else {
      alert(
        "Xatolik yuz berdi: " +
          (res.error || res.data?.message || "Qaytadan urinib ko'ring"),
      );
    }
  };
  return (
    <div>
      <PageHeader>
        <h1 className="font-medium text-xl leading-[110%]">Chipta qo'shish</h1>
      </PageHeader>
      <div className="flex items-center justify-center">
        <div className="w-full xl:w-[80%]">
          <div className="mb-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Qaytish
            </button>
          </div>
          <div className="bg-light-main dark:bg-dark-main p-3 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-8 gap-4">
                <div className="flex flex-col col-span-8 lg:col-span-4">
                  <div className="flex items-center gap-2 pb-2">
                    <label htmlFor="title">Chipta Nomi</label>
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
                  {["uz", "ru", "en"].map((lang) => (
                    <input
                      key={lang}
                      id={`title-${lang}`}
                      type="text"
                      placeholder={`${lang.toUpperCase()} tilida nomini kiriting`}
                      {...register(`title.${lang}`, { required: true })}
                      className={`outline-none border border-gray-300 rounded-lg p-2 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300 ${activeLangN === lang ? "block" : "hidden"}`}
                    />
                  ))}
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="price" className="pb-2">
                    Narxi
                  </label>
                  <input
                    id="price"
                    type="number"
                    placeholder="Narx kiriting"
                    {...register("price", { required: true })}
                    className="outline-none border border-gray-300 rounded-lg p-2 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="category" className="pb-2">
                    Kategoriya
                  </label>
                  <div className="relative w-full">
                    <select
                      name="category"
                      id="category"
                      {...register("category", {
                        required: true,
                        onChange: handleCategoryChange,
                      })}
                      className="w-full appearance-none outline-none border border-gray-300 rounded-lg p-2 pl-3.5 pr-10 text-black/50 dark:text-white/50  bg-gray-50/50 dark:bg-dark-second cursor-pointer transition-all duration-300 hover:border-link-hover focus:border-link-hover focus:bg-white dark:focus:bg-dark-main"
                    >
                      <option
                        value="ADULT"
                        className="bg-light-second dark:bg-dark-second"
                      >
                        Voyaga yetgan
                      </option>
                      <option
                        value="CHILD"
                        className="bg-light-second dark:bg-dark-second"
                      >
                        Yosh bola
                      </option>
                      <option
                        value="STUDENT"
                        className="bg-light-second dark:bg-dark-second"
                      >
                        Talaba
                      </option>
                      <option
                        value="PENSIONER"
                        className="bg-light-second dark:bg-dark-second"
                      >
                        Pensioner
                      </option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black/50 dark:text-white/50">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="validFrom" className="pb-2">
                    Kuchga kirishi
                  </label>
                  <div className="relative w-full">
                    <input
                      type="date"
                      id="validFrom"
                      onClick={(e) => e.target.showPicker?.()}
                      {...register("validFrom", { required: true })}
                      className="min-w-full outline-none border border-gray-300 rounded-lg p-2 pr-10 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black/50 dark:text-white/50">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="validTo" className="pb-2">
                    Tugash muddati
                  </label>
                  <div className="relative w-full">
                    <input
                      type="date"
                      id="validTo"
                      onClick={(e) => e.target.showPicker?.()}
                      {...register("validTo", { required: true })}
                      className="min-w-full outline-none border border-gray-300 rounded-lg p-2 pr-10 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black/50 dark:text-white/50">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="visitingHours" className="pb-2">
                    Aylanish vaqti
                  </label>
                  <input
                    type="text"
                    id="visitingHours"
                    placeholder="Tashrif buyurish vaqtlari"
                    {...register("visitingHours", { required: true })}
                    className="outline-none border border-gray-300 rounded-lg p-2 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="ageRestriction" className="pb-2">
                    Yosh cheklanishi
                  </label>
                  <input
                    type="text"
                    id="ageRestriction"
                    placeholder="16 yoshdan yuqori"
                    {...register("ageRestriction")}
                    className="outline-none border border-gray-300 rounded-lg p-2 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col col-span-8">
                  <div className="flex items-center gap-2 pb-2">
                    <label htmlFor="rules">Qoidalar</label>
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
                  {["uz", "ru", "en"].map((lang) => (
                    <div
                      key={lang}
                      className={`border border-gray-300 rounded-lg overflow-hidden ${activeLangD === lang ? "block" : "hidden"}`}
                    >
                      <Controller
                        name={`rules.${lang}`}
                        control={control}
                        render={({ field }) => (
                          <TextEditor
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col col-span-6">
                  <label htmlFor="includedServices" className="pb-2">
                    Chipta ichiga kiritilgan xizmatlar
                  </label>

                  <div className="flex flex-col gap-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-2 relative"
                      >
                        <input
                          type="text"
                          id="includedServices"
                          placeholder={`Masalan: 15 dan ortiq muzeylarga kirish #${index + 1}`}
                          {...register(`includedServices.${index}.value`, {
                            required:
                              index === 0
                                ? "Kamida 1 ta xizmat kiritilishi kerak"
                                : false,
                          })}
                          className="min-w-full outline-none border border-gray-300 rounded-lg p-2 pr-10 bg-gray-50/50 dark:bg-dark-second focus:bg-white dark:focus:bg-dark-main focus:border-link-hover hover:bg-link-hover/10 hover:border-link-hover transition-colors duration-300"
                        />

                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute right-0 p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                            title="O'chirish"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 pt-8">
                  <button
                    type="button"
                    onClick={() => append({ value: "" })}
                    className="w-full flex items-center justify-center min-h-10.25 gap-1.5 px-3 py-2 text-sm font-medium text-white bg-link-hover hover:bg-link-hover/80 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Xizmat qo'shish
                  </button>
                </div>
                <div className="col-span-8 flex items-center justify-end pt-4 gap-4">
                  <label
                    htmlFor="isActive"
                    className="flex items-center gap-3 cursor-pointer select-none w-fit"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="isActive"
                        {...register("isActive")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 transition-colors"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      Chiptani sotuv uchun faollashtirish
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="font-medium text-white bg-link-hover hover:bg-link-hover/80 transition-colors duration-300 px-4 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Saqlash
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
