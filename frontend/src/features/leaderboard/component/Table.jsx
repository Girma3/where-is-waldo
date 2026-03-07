import useFetchLeaderboard from "../hooks/useLeaderBoard";
const tableStyle = `w-full  border border-gray-200 rounded-md shadow-sm`;
const headerStyle = `whitespace-nowrap px-4 py-2 text-left text-sm font-semibold text-gray-700`;
const rowStyle = `border-t hover:bg-gray-50 transition-colors`;
const cellStyle = `p-3 text-sm text-gray-800 break-words`;
function Table({ level }) {
  const { data: tableData, error, isLoading } = useFetchLeaderboard(level);
  if (!tableData?.length) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No leaderboard data available for this level.
      </p>
    );
  }

  return (
    <div>
      <table className={tableStyle}>
        <thead className="bg-gray-100">
          <tr>
            <th className={headerStyle}>Rank</th>
            <th className={headerStyle}>Name</th>
            <th className={headerStyle}>Time Taken</th>
            <th className={headerStyle}>Achieved At</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className={rowStyle}>
              <td className={cellStyle}>{index + 1}</td>
              <td className={cellStyle}>{item.userName}</td>
              <td className={cellStyle}>{item.timeTaken}s</td>
              <td className={cellStyle}>
                {new Date(item.achievedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
