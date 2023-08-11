import ReactPaginate from 'react-paginate';
import "./Pagination.scss";

const Pagination = (props) => {
    let { totalPage, setCurrentPage, currentPage } = props;

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    }

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            previousLabel="< previous"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={totalPage}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            activeLinkClassName="active"
            pageLinkClassName="page-element"
            previousLinkClassName="page-element"
            nextLinkClassName="page-element"
        />
    )
}

export default Pagination;