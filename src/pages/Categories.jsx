export const Category = ({ category }) => {
  return (
    <div>
      <h2>{category.title}</h2>
      <p>{category.description}</p>
    </div>
  );
};
