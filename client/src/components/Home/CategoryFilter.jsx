function CategoryFilter({setSelectedCategory}){
    function handleCategoryChange(event) {
        const category = event.target.value;
        setSelectedCategory(category)
      }
    return(
        <div className="category-filter">
          <select name="filters"  onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
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