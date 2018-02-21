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
    }

    updatePagination = () => {
        const {
            total,
            limit
        } = this.props;
    
        const pages = Math.ceil(total / limit);

        this.setState({
            ...this.state,
            pages: pages
        });
    }
    
    render() {
        const {
            pages 
        } = this.state;
        
        const {
            activePage,
            total
        } = this.props;
        
        const renderPaginationItems = () => {
            let page = 1;
            while(page <= pages) {
                return (
                    <PaginationItem>
                        <PaginationLink>{page}</PaginationLink>
                    </PaginationItem>
                )
            }
            
            
            // return (
            //     <PaginationItem>
            //         <PaginationLink active>1</PaginationLink>
            //     </PaginationItem>
            //     <PaginationItem>
            //         <PaginationLink>2</PaginationLink>
            //     </PaginationItem>
            //     <PaginationItem>
            //         <PaginationLink>3</PaginationLink>
            //     </PaginationItem>
            //     <PaginationItem>
            //         <PaginationLink disabled>...</PaginationLink>
            //     </PaginationItem>
            //     <PaginationItem>
            //         <PaginationLink>50</PaginationLink>
            //     </PaginationItem>
            // )
        }
        
        return (
            <Pagination>
                <PaginationList>
                    <PaginationItem>
                        <PaginationLink previous disabled={activePage == 1} />
                    </PaginationItem>
                    { renderPaginationItems() }
                    <PaginationItem>
                        <PaginationLink next disabled={activePage == pages} />
                    </PaginationItem>
                </PaginationList>
            </Pagination>
        )
    }
}

export default PaginationSet;