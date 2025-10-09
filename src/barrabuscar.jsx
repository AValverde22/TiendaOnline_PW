function SearchBar() {
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.busqueda.value;
    alert(`Buscando: ${query}`);
  };

  return (
    <form onSubmit={handleSearch} >
      <input
        type="text"
        name="busqueda"
        placeholder="Buscar productos..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
export default SearchBar