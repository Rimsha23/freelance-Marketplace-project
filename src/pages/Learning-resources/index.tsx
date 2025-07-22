import React, { useEffect, useState } from 'react'
import ButtonComp from '../../common-components/button'
import PaginationComponent from '../../common-components/Pagination'
import { CardCommonComponent } from '../../common-components/card'
import { getLearningData } from '../../store/learningResources'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/root-store'
import { Link } from 'react-router-dom'
const LearningResources: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 10;
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };
    const dispatch: AppDispatch = useDispatch()
    const data = useSelector((state: RootState) => state.learningData.user)
    console.log("Api data", data)
    useEffect(() => {
        dispatch(getLearningData());
    }, [dispatch]);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const filteredData = data.slice(startIndex, endIndex);


    return (
        <>
            <div className='mt-[39px] ml-auto mr-auto space-y-10'>
                <div className='flex space-x-4'>
                    <Link to={'/educationalcenter'}>
                        <ButtonComp shape='circle' text='<' variant='violet' className='h-[40px] w-[40px]' />
                    </Link>
                    <h1 className="libre-caslon-text text-[22px] text-[#CACACA] font-bold pt-1">
                        Educational Center
                    </h1>
                </div>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                    {filteredData.map((item) => (
                        <CardCommonComponent size='small' imageUrl={item.image} imgSize='roundedLg' description={item.learning_description} />
                    ))

                    }
                </section>
                <div className='flex justify-center'>
                    <PaginationComponent totalPages={Math.ceil(data.length / ITEMS_PER_PAGE)} currentPage={currentPage} onPageChange={handlePageChange} />
                </div>
            </div>

        </>
    )
}
export default LearningResources;
