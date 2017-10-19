import React from 'react';

class TableHeader extends React.Component {
    render() {
        const th = this.props.tableHeader.map((res, index) =>
            <th key={index}>
                <p className="fw-medium">
                    {res.name}
                </p>
            </th>
        );

        return(
            <thead>
                {th}
            </thead>
        )
    }
}

export default TableHeader;
