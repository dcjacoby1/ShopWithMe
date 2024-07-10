function CategoryFilter({setSelectedCategory, setCurrentPage}){
    
  function handleCategoryChange(event) {
        const category = event.target.value
        setSelectedCategory(category)
        setCurrentPage(1)
      }
      
    return(
        <div className="category-filter">
          <select name="filters"  onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            <option value="board">Board Games</option>
            <option value="active">Active Games</option>
            <option value="outdoors">Outdoor Games</option>
            <option value="video_physical">Video Games</option>
            <option value="accessories">Game Balls</option>
          </select>
        </div>
    )
}
export default CategoryFilter