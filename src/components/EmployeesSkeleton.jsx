import PageHeader from "./PageHeader";

export default function EmployeesSkeleton() {
  const skeletonRows = [1, 2, 3];

  return (
    <div className="animate-pulse">
      <PageHeader>
        <div className="flex flex-1 items-center justify-between w-full">
          <div className="h-5.5 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-8 w-36 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </PageHeader>

      <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs">
                <th className="py-3.5 px-4 w-22">
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </th>
                <th className="py-3.5 px-4">
                  <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </th>
                <th className="py-3.5 px-4">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </th>
                <th className="py-3.5 px-4 text-center">
                  <div className="h-4 w-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded"></div>
                </th>
              </tr>
            </thead>
            <tbody className="w-full divide-y divide-gray-200 dark:divide-gray-800">
              {skeletonRows.map((_, index) => (
                <tr key={index} className="transition-colors">
                  <td className="py-2 px-4">
                    <div className="w-13 h-13 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>

                  {/* F.I.Sh va Tug'ilgan kuni */}
                  <td className="py-2 px-4 space-y-2">
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>

                  <td className="py-2 px-4">
                    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>

                  <td className="py-2 px-4">
                    <div className="flex gap-2 items-center">
                      <div className="w-28.5 h-6 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                      <div className="w-28.5 h-6 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
