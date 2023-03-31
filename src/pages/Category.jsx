const Category = ({ category }) => {
  console.log(category.title);
  return (
    <div>
      <h2>{category.title}</h2>
    </div>
  );
};

export default Category;
