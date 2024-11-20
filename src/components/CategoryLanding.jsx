import '../assets/CategoryLanding/styles.css';
import CategoryHeader from './CategoryHeader';
import CategoryContent from './CategoryContent';

const CategoryLanding = ({ route }) => {
  return (
    <>
      <CategoryHeader></CategoryHeader>
      <CategoryContent route={route}></CategoryContent>
    </>
  );
};

export default CategoryLanding;
