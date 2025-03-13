import './AllProduct.scss';
import FilterSetion from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import ShowProduct from '../../../components/ShowProduct';


function AllProduct() {

  return (
    <>
      <div className='products-container'>
        <CategoriesHeader />

        <FilterSetion />

        <ShowProduct />

        <div className='product-container'>
        </div>
      </div>
    </>
  )
}

export default AllProduct;