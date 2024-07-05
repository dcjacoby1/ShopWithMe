function CategoryFilter({setSelectedCategory}){
    function handleCategoryChange(event) {
        const category = event.target.value;
        setSelectedCategory(category)
      }
    return(
        <div className="Filter">
          <select name="filter" onChange={handleCategoryChange}>
            <option value="All">Filter by category</option>
            <option value="board">Board Game</option>
            <option value="active">Active Game</option>
            <option value="accessories">Game Accessories</option>
            <option value="outdoors">Outdoor Game</option>
            <option value="video_digital">Online Game</option>
            <option value="video_physical">Video Game</option>
          </select>
        </div>
    )
}
export default CategoryFilter