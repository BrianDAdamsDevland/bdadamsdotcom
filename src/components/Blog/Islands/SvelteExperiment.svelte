<script>
  export let data;

  let query = "";

  $: hasQuery = () => {
    return !!query.trim();
  };

  $: filteredData = () => {
    if (!hasQuery()) return data;

    const queryTerms = query.toLowerCase().split(" ");

    return data.filter((d) =>
      queryTerms.every(
        (qt) =>
          d.firstName.toLowerCase().includes(qt) ||
          d.lastName.toLowerCase().includes(qt)
      )
    );
  };
</script>

<div class="demo-card">
  <h4>Test Component (Svelte)</h4>

  <input type="search" placeholder="Filter Table" bind:value={query} />

  <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredData() as d}
        <tr>
          <td>{d.firstName}</td>
          <td>{d.lastName}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
