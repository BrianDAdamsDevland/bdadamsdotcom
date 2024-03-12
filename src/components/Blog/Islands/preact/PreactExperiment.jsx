import { useState, useMemo } from "preact/hooks";

const PreactExperiment = ({ data }) => {
  const [query, setQuery] = useState("");

  const hasQuery = useMemo(() => !!query.trim(), [query]);

  const filteredData = useMemo(() => {
    if (!hasQuery) return data;

    const queryTerms = query.toLowerCase().split(" ");

    return data.filter((d) =>
      queryTerms.every(
        (qt) =>
          d.firstName.toLowerCase().includes(qt) ||
          d.lastName.toLowerCase().includes(qt)
      )
    );
  }, [data, hasQuery, query]);

  return (
    <div className="demo-card">
      <h4>Test Component (Preact)</h4>

      <input
        type="search"
        placeholder="Filter Table"
        value={query}
        onInput={(e) => setQuery(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((d) => (
            <tr key={d.id}>
              <td>{d.firstName}</td>
              <td>{d.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreactExperiment;
