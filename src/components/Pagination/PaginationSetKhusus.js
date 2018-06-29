import React, { Component } from 'react';
import { Pagination, PaginationList, PaginationItem, PaginationLink } from '../Pagination';

class PaginationSet extends Component {
    constructor() {
        super();
        this.updatePagination = this.updatePagination.bind(this);
        this.state = {
            pages: 0
        }
    }

    componentDidUpdate = (prevProps) => {

        if(prevProps.total !== this.props.total) {
            this.updatePagination();
        }
    };

    updatePagination = () => {        
        const { total, limit } = this.props;
    
        const pages = Math.ceil(total / limit);

        this.setState({
            ...this.state,
            pages: pages
        });
    };

    render() {
        const {
            pages 
        } = this.state;
        
        const {
            activePage,
            total,
            onPageChange,
            currentActive,
            search
        } = this.props;

        
        const renderPagers = () => {
            let page = 1;
            let pagers = [];
            
            console.log(currentActive);
            console.log(activePage);

            if(search.searchText.length > 0){

                while(page <= pages) {
                    let pager = page;
                            
                    pagers.push(
                        <PaginationItem>
                            <PaginationLink 
                                onClick={() => onPageChange(pager)} 
                                active={pager === currentActive}>
                                {pager}
                            </PaginationLink>
                        </PaginationItem>
                    )

                    page++;
                }
            } else {

                while(page <= pages) {
                    let pager = page;
                    
                    pagers.push(
                        <PaginationItem>
                            <PaginationLink 
                                onClick={() => onPageChange(pager)} 
                                active={pager === activePage}>
                                {pager}
                            </PaginationLink>
                        </PaginationItem>
                    )
    
                    page++;
                }
            }


            return pagers;
        }

        const renderPreviousPager = () => {
            return (
                <PaginationItem>
                    <PaginationLink previous disabled={activePage === 1} onClick={() => onPageChange(activePage - 1)} />
                </PaginationItem>
            )
        }

        const renderNextPager = () => {
            return (
                <PaginationItem>
                    <PaginationLink next disabled={activePage === pages} onClick={() => onPageChange(activePage + 1)} />
                </PaginationItem>
            )
        }
        
        return (
            <Pagination>
                <PaginationList>
                    {renderPreviousPager()}
                    {renderPagers()}
                    {renderNextPager()}
                </PaginationList>
            </Pagination>
        )
    }
}

export default PaginationSet;