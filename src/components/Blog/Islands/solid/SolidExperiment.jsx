import { createSignal, createEffect, createMemo } from "solid-js";

const SolidExperiment = ({ data }) => {
  const [query, setQuery] = createSignal("");

  const hasQuery = createMemo(() => !!query().trim(), [query]);

  const filteredData = createMemo(() => {
    if (!hasQuery()) return data;

    const queryTerms = query().toLowerCase().split(" ");

    return data.filter((d) =>
      queryTerms.every(
        (qt) =>
          d.firstName.toLowerCase().includes(qt) ||
          d.lastName.toLowerCase().includes(qt)
      )
    );
  });

  return (
    <div class="demo-card">
      <h4>Test Component (Solid)</h4>

      <input
        type="search"
        placeholder="Filter Table"
        value={query()}
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
          {filteredData().map((d) => (
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

export default SolidExperiment;
